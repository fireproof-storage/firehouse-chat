import React, { useState } from 'react'

export const styles = {
  messageForm: {
    padding: '1rem',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)',
    position: 'fixed' as const,
    bottom: 0,
    width: '80%'
  }
}

export const MessageForm: React.FC<{ gravatar: string, handleAddMessage: (message: string) => void }> = ({
  handleAddMessage,
  gravatar
}) => {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleAddMessage(message)
    setMessage('')
  }

  return (
    <form style={styles.messageForm} onSubmit={handleSubmit} autoComplete="off">
      <img src={gravatar} alt="gravatar" style={{ width: '40px', height: '40px', borderRadius: '50%',
      marginTop: '-15px',
      top: '15px',
      position: 'relative',
       marginRight: '1rem' }} />
      <input
        title="write a message message"
        name="message"
        type="text"
        value={message}
        autoComplete="off"
        style={{ width: '60%', marginRight: '1rem' }}
        onChange={e => setMessage(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  )
}
