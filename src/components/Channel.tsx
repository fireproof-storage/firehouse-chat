import React, { useState } from 'react'
import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'

const Channel: React.FC = () => {
  const channelId = 'foo2'
  const { database, useDocument, useLiveQuery } = useFireproof(channelId)

  connect.partykit(database)

  const [doc, setDoc, saveDoc] = useDocument(() => ({ created: Date.now(), message: '' }))

  const messages = useLiveQuery('created', { descending: true }).docs

  const handleAddMessage = () => {
    if (doc.message.trim() !== '') {
      delete doc._id
      saveDoc()
      setDoc({ created: Date.now(), message: '' }, { replace: true })
    }
  }

  return (
    <div className='channel-outer'>
      <div className="channel">
        <ul className="messages">
          {messages.map(doc => (
            <li key={doc._id}>{doc.message}</li>
          ))}
        </ul>
      </div>
      <form className="message-form" onSubmit={handleAddMessage}>
        <input
          title="write a message message"
          type="text"
          value={doc.message}
          onChange={e => setDoc({ message: e.target.value })}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export { Channel }
