import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'
import { Message } from './Message'
import { MessageForm } from './MessageForm'
import { EmailForm } from './EmailForm'

export const styles = {
  messageForm: {
    padding: '1rem',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed' as const,
    bottom: 0,
    width: '80%'
  },
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
  _id?: string
}

export interface ReactionDoc {
  type: 'reaction'
  parent: { max: number; created: number }
  reaction: string
}

type AnyDoc = MessageDoc | ReactionDoc

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return <InnerChannel key={id} id={id || ''} />
}
const InnerChannel: React.FC<{ id: string }> = ({ id }) => {
  const { database, useDocument, useLiveQuery } = useFireproof(id)

  // @ts-expect-error does not exist
  connect.partykit(database)

  const [doc, setDoc, saveDoc] = useDocument<MessageDoc>(() => ({
    type: 'message',
    max: 0,
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

  const handleAddMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (doc.message.trim() !== '') {
      const max = messages.sort((a, b) => b.created - a.created)[0]?.created || 0
      doc.max = Math.max(max, doc.created)
      saveDoc(doc)
      setDoc(
        {
          type: 'message',
          max: 0,
          created: Date.now(),
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

  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'))

  const handleSetEmail = (email: string) => {
    localStorage.setItem('email', email)
    setEmail(email)
  }

  return (
    <div ref={scrollableDivRef} style={styles.channelOuter}>
      <div>
        <ul style={styles.messages}>
          {messages.map(doc => (
            <Message key={doc._id} doc={doc} />
          ))}
        </ul>
      </div>
      {email ? (
        <MessageForm doc={doc} setDoc={setDoc} handleAddMessage={handleAddMessage} />
      ) : (
        <EmailForm handleSetEmail={handleSetEmail} />
      )}
    </div>
  )
}

export { Channel }
