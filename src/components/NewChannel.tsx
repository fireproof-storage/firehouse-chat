import React from 'react'

import { useFireproof } from 'use-fireproof'

import styles from './NewChannel.module.css'

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
      <div className={styles.formItem}>
        <label
          htmlFor="channelName"
          className={styles.label}
          >Channel Name:<
        /label>
        <input
          type="text"
          id="channelName"
          value={name}
          onChange={e => setDoc({ name: e.target.value })}
          placeholder="Enter channel name"
          className={styles.input}
        />
      </div>
      <div className={styles.formItem}>
        <label
          htmlFor="channelDescription"
          className={styles.label}
          >Description:<
        /label>
        <input
          type="text"
          id="channelDescription"
          value={description}
          onChange={e => setDoc({ description: e.target.value })}
          placeholder="Enter channel description"
          className={styles.input}
        />
      </div>
      <button type="submit" className={styles.channelBtn}>
        Create Channel
      </button>
    </form>
  )
}

export { NewChannel }
