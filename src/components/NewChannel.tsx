import React from 'react'

import { useFireproof } from 'use-fireproof'

const NewChannel: React.FC = () => {
  const { database, useDocument, useLiveQuery } = useFireproof('_channels')

  const [doc, setDoc, saveDoc] = useDocument(() => ({
    created: Date.now(),
    name: '',
    description: ''
  }))
  const { name, description } = doc

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (name.trim() !== '' && description.trim() !== '') {
      doc._id = 'channel:' + name
      saveDoc(doc)
      setDoc()
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', backgroundColor: '#f4f4f4' }}>
      <div>
        <label htmlFor="channelName">Channel Name:</label>
        <br />
        <input
          type="text"
          id="channelName"
          value={name}
          onChange={e => setDoc({ name: e.target.value })}
          placeholder="Enter channel name"
          style={{ marginLeft: '1rem' }}
        />
      </div>
      <div>
        <label htmlFor="channelDescription">Description:</label>
        <br />
        <input
          type="text"
          id="channelDescription"
          value={description}
          onChange={e => setDoc({ description: e.target.value })}
          placeholder="Enter channel description"
          style={{ marginLeft: '1rem' }}
        />
      </div>
      <button type="submit" style={{ margin: '1rem' }}>
        Create Channel
      </button>
    </form>
  )
}

export { NewChannel }
