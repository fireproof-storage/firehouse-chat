import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import gravatar from 'gravatar'

import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'
import { Message } from './Message'
import { MessageForm } from './MessageForm'
import { EmailForm } from './EmailForm'

interface Row {
  key: string[]
  doc: AnyDoc
}

interface AggregatedData {
  key: string
  data: { [type: string]: AnyDoc[] }
}

const buildAggregatedData = (rows: Row[], groupingElementsCount: number): AggregatedData[] => {
  return rows.reduce((acc: AggregatedData[], row: Row) => {
    const groupKeyParts = row.key.slice(0, groupingElementsCount)
    const dataType = row.key[groupingElementsCount]
    const key = groupKeyParts.join('-')
    const groupIndex = acc.findIndex(group => group.key === key)
    if (groupIndex === -1) {
      acc.push({ key, data: { [dataType]: [row.doc] } })
    } else {
      if (!acc[groupIndex].data[dataType]) {
        acc[groupIndex].data[dataType] = []
      }
      acc[groupIndex].data[dataType].push(row.doc)
    }
    return acc
  }, [])
}

export const styles = {
  messages: {
    display: 'flex',
    flexDirection: 'column-reverse' as const,
    marginBottom: '4em',
    padding: '1rem'
  },
  channelOuter: {
    overflowY: 'auto' as const,
    scrollBehavior: 'smooth' as const,
    height: '100vh'
  }
}

export interface MessageDoc {
  type: 'message'
  max: number
  created: number
  message: string
  profileImg: string
  _id?: string
}

export interface ReactionDoc {
  type: 'reaction'
  parent: { max: number; created: number; id: string }
  reaction: string
  profileImg: string
  _id?: string
}

export type AnyDoc = MessageDoc | ReactionDoc

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return <InnerChannel key={id} id={id || ''} />
}
const InnerChannel: React.FC<{ id: string }> = ({ id }) => {
  const { database, useDocument, useLiveQuery } = useFireproof(id)

  // @ts-expect-error does not exist
  connect.partykit(database)

  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'))

  const handleSetEmail = (email: string) => {
    localStorage.setItem('email', email)
    setEmail(email)
  }
  const gravatarUrl = email ? gravatar.url(email) : ''

  const [doc, setDoc, saveDoc] = useDocument<MessageDoc>(() => ({
    type: 'message',
    max: 0,
    profileImg: gravatarUrl,
    created: Date.now(),
    message: ''
  }))
  // @ts-expect-error does not exist
  const channel = useLiveQuery(({ max, created, type, parent }) => {
      if (parent) {
        return [parent.max, parent.created, type]
      } else {
        return [max, created, type]
      }
    },
    {
      descending: true
    }
  )

  const aggregatedData = buildAggregatedData(channel.rows, 2)

  const messages = useMemo(
    () => (channel.docs as AnyDoc[]).filter(doc => doc.type === 'message') as MessageDoc[],
    [channel]
  )

  const handleAddMessage = (message: string) => {
    if (message.trim() !== '') {
      doc.message = message
      doc.created = Date.now()
      doc.profileImg = gravatarUrl
      doc.max =
        1 + Math.max(messages.sort((a, b) => b.created - a.created)[0]?.created || 0, doc.created)
      saveDoc(doc)
      setDoc(
        {
          type: 'message',
          max: 0,
          created: Date.now(),
          profileImg: gravatarUrl,
          message: ''
        } as MessageDoc,
        { replace: true }
      )
    }
  }

  const scrollableDivRef = useRef<
    HTMLDivElement & { scrollTo: (options: { top: number; behavior: 'smooth' }) => void }
  >(null)
  function scrollTo() {
    scrollableDivRef.current?.scrollTo({
      top: scrollableDivRef.current.scrollHeight
      // behavior: 'smooth'
    })
  }

  useEffect(scrollTo, [channel])

  return (
    <div ref={scrollableDivRef} style={styles.channelOuter}>
      <div>
        <ul style={styles.messages}>
          {aggregatedData.map(({ data }) => {
            return (
              <Message
                key={data.message[0]._id}
                doc={data.message[0] as MessageDoc}
                gravatar={gravatarUrl}
                database={database}
                reactions={data.reaction as ReactionDoc[]}
              />
            )
          })}
        </ul>
      </div>
      {email ? (
        <MessageForm handleAddMessage={handleAddMessage} gravatar={gravatarUrl} />
      ) : (
        <EmailForm handleSetEmail={handleSetEmail} />
      )}
    </div>
  )
}

export { Channel }
