import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import gravatar from 'gravatar'

import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'
import { Message } from './Message'
import { MessageForm } from './MessageForm'
import { EmailForm } from './EmailForm'

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
  const channel = useLiveQuery(({ max, created, type }) => [max, created, type], {
    descending: true
  }).docs as AnyDoc[]

  const messages = useMemo(
    () => channel.filter(doc => doc.type === 'message') as MessageDoc[],
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

  useEffect(scrollTo, [messages])

  return (
    <div ref={scrollableDivRef} style={styles.channelOuter}>
      <div>
        <ul style={styles.messages}>
          {messages.map(doc => (
            <Message key={doc._id} doc={doc} gravatar={gravatarUrl} database={database} />
          ))}
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
