import React, { useState } from 'react'

const Channel: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [newMessage, setNewMessage] = useState('')

  const handleAddMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage])
      setNewMessage('')
    }
  }

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        title="your message"
        type="text"
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
      />
      <button onClick={handleAddMessage}>Add Message</button>
    </div>
  )
}

export { Channel }
