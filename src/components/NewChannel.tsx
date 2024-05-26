import React from 'react'

import { useFireproof } from 'use-fireproof'

const styles = {
  formItem: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '12px'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#1C1D1E',
    border: '1px solid #000'
  },
  channelBtn: {
    display: 'block',
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#363638',
    padding: '10px 36px',
    borderRadius: '5px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
    border: '1px solid #454546'
  }
}

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
    <form onSubmit={handleSubmit} style={{ padding: '22px' }}>
      <div style={styles.formItem}>
        <label
          htmlFor="channelName"
          style={styles.label}
          >Channel Name:<
        /label>
        <input
          type="text"
          id="channelName"
          value={name}
          onChange={e => setDoc({ name: e.target.value })}
          placeholder="Enter channel name"
          style={styles.input}
        />
      </div>
      <div style={styles.formItem}>
        <label
          htmlFor="channelDescription"
          style={styles.label}
          >Description:<
        /label>
        <input
          type="text"
          id="channelDescription"
          value={description}
          onChange={e => setDoc({ description: e.target.value })}
          placeholder="Enter channel description"
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.channelBtn}>
        Create Channel
      </button>
    </form>
  )
}

export { NewChannel }
