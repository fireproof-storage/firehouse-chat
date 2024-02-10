import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'
import { Message } from './Message'

const styles = {
  messageForm: {
    padding: '1rem',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed' as const,
    bottom: 0,
    width: '100%'
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

const Channel: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  return <InnerChannel key={id} id={id || ''} />
}
const InnerChannel: React.FC<{ id: string }> = ({ id }) => {
  const { database, useDocument, useLiveQuery } = useFireproof(id)

  // @ts-expect-error does not exist
  connect.partykit(database)

  const [doc, setDoc, saveDoc] = useDocument(() => ({ max: 0, created: Date.now(), message: '' }))
  // @ts-expect-error does not exist
  const messages = useLiveQuery(({ max, created }) => [max, created], { descending: true })
    .docs as (typeof doc)[]

  console.log('messages', database.name, messages)

  const handleAddMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (doc.message.trim() !== '') {
      const max = messages.sort((a, b) => b.created - a.created)[0]?.created || 0
      doc.max = Math.max(max, doc.created)
      saveDoc(doc)
      setDoc(
        {
          max: 0,
          created: Date.now(),
          message: ''
        },
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
            <Message key={doc._id} message={doc.message} created={doc.created} />
          ))}
        </ul>
      </div>
      <form style={styles.messageForm} onSubmit={handleAddMessage} autoComplete="off">
        <input
          title="write a message message"
          name="message"
          type="text"
          value={doc.message}
          autoComplete="off"
          style={{ width: '80%', marginRight: '1rem' }}
          onChange={e => setDoc({ message: e.target.value })}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export { Channel }
