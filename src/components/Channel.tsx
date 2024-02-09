import React, { useState } from 'react'
import { useFireproof } from 'use-fireproof'

const Channel: React.FC = () => {
  const channelId = 'test'
  const { useDocument, useLiveQuery } = useFireproof(channelId)

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
    <div>
      <ul>
        {messages.map((doc) => (
          <li key={doc._id}>{doc.message}</li>
        ))}
      </ul>
      <input
        title="write a message message"
        type="text"
        value={doc.message}
        onChange={e => setDoc({ message: e.target.value })}
      />
      <button type="submit" onClick={handleAddMessage}>Add Message</button>
    </div>
  )
}

export { Channel }
