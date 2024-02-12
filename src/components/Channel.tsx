import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import gravatar from 'gravatar'

import { useFireproof, type IndexRow } from 'use-fireproof'
import { connect } from '@fireproof/partykit'
import { Message } from './Message'
import { MessageForm } from './MessageForm'
import { EmailForm } from './EmailForm'

interface AggregatedData {
  key: string | string[]
  data: { [type: string]: AnyDoc[] }
}

const buildAggregatedData = (rows: IndexRow[], groupingElementsCount: number): AggregatedData[] => {
  return rows.reduce((acc: AggregatedData[], row: IndexRow) => {
    const groupKeyParts = (row.key as string[]).slice(0, groupingElementsCount)
    const dataType = row.key[groupingElementsCount]
    const key = groupKeyParts.join('-')
    const groupIndex = acc.findIndex(group => group.key === key)
    if (groupIndex === -1) {
      acc.push({ key, data: { [dataType]: [row.doc as AnyDoc] } })
    } else {
      if (!acc[groupIndex].data[dataType]) {
        acc[groupIndex].data[dataType] = []
      }
      acc[groupIndex].data[dataType].unshift(row.doc as AnyDoc)
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

const Thread: React.FC = () => {
  const { id, tid } = useParams<{ id: string; tid: string }>()
  const { useDocument } = useFireproof(id)
  const [doc] = useDocument<MessageDoc>(() => ({ _id: tid! } as MessageDoc))
  return <InnerChannel key={tid} id={tid || ''} thread={doc} />
}

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return <InnerChannel key={id} id={id || ''} />
}

const InnerChannel: React.FC<{ id: string; thread?: MessageDoc }> = ({ id, thread }) => {
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

  // // @ts-expect-error does not exist
  // const channel = useLiveQuery(({ max, created, type, parent }) => {
  //     if (parent) {
  //       return [parent.max, parent.created, type]
  //     } else {
  //       return [max, created, type]
  //     }
  //   },
  //   {
  //     descending: true,
  //     // range: [[0, 0, 'message'], [1707680483365, 1707680263265]],
  //     limit: 50
  //   }
  // )

  // @ts-expect-error does not exist
  const messages = useLiveQuery(({ created, type }) => (type === 'message' ? created : undefined), {
    descending: true,
    // limit: 50
  })

  const reactions = useLiveQuery(
    // @ts-expect-error does not exist
    ({ parent, type }) => (type === 'reaction' ? parent.id : undefined),
    { keys: messages.docs.map(({ _id }) => _id!) }
  )

  // console.log('messages', messages)
  // console.log('reactions', reactions)

  const groupedReactions = reactions.rows.reduce((acc: Record<string, ReactionDoc[]>, row) => {
    const key = row.key as string;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(row.doc as ReactionDoc);
    return acc;
  }, {} as Record<string, ReactionDoc[]>);


  

  // const aggregatedData = buildAggregatedData(reactions.rows, 2).filter(
  //   (row: AggregatedData) => row.data.message
  // )

  // const messages = useMemo(
  //   () => (channel.docs as AnyDoc[]).filter(doc => doc.type === 'message') as MessageDoc[],
  //   [channel]
  // )

  const handleAddMessage = (message: string) => {
    if (message.trim() !== '') {
      doc.message = message
      doc.created = Date.now()
      doc.profileImg = gravatarUrl
      doc.max =
        1 + Math.max((messages.docs as MessageDoc[]).sort((a, b) => b.created - a.created)[0]?.created || 0, doc.created)
      saveDoc(doc)
      setDoc(undefined, { replace: true })
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

  useEffect(scrollTo, [messages.docs.length])

  const channelName = thread ? thread.message : id

  // console.log('aggregatedData', channel.rows[40]?.key)

  return (
    <div ref={scrollableDivRef} style={styles.channelOuter}>
      <h1>{channelName}</h1>
      <div>
        <ul style={styles.messages}>
          {messages.docs.map((doc) => {
            const reactions = groupedReactions[doc._id!]
            return (
              <Message
                key={doc._id}
                doc={doc as MessageDoc}
                gravatar={gravatarUrl}
                database={database}
                reactions={reactions as ReactionDoc[]}
                thread={false && !thread}
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

export { Channel, Thread }
