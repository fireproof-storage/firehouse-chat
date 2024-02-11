import React from 'react'

interface MessageProps {
  doc: { message: string; created: number }
}

const styles = {
  listItem: {
    listStyleType: 'none',
    margin: '10px 0'
  },
  message: {
    fontSize: '16px',
    color: '#333'
  },
  date: {
    fontSize: '12px',
    color: '#999'
  }
}

const Message: React.FC<MessageProps> = ({ doc }) => {
  const { message, created } = doc
  const date = new Date(created)
  return (
    <li style={styles.listItem}>
      <p style={styles.message}>{message}</p>
      <small style={styles.date}>{date.toLocaleString()}</small>
      <EmojiPicker onEmojiSelect={emoji => console.log(emoji)} />
    </li>
  )
}

export { Message }

import { useState } from 'react'

const EmojiPicker: React.FC<{ onEmojiSelect: (emoji: string) => void }> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const topReactions = [
    '👍', '😂', '😍', '😭', '🔥', 
    '🙌', '👏', '🤔', '😢', '🎉', 
    '💕', '🤣', '🥺', '✨', '😒', 
    '👀', '🙄', '🤦‍♂️', '🤷‍♀️', '👌'
  ];

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>➕</button>
      {isOpen && (
        <div>
          {topReactions.map(emoji => (
            <button key={emoji} onClick={() => onEmojiSelect(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Usage example (you can place this inside the Message component or wherever it's needed):
// <EmojiPicker onEmojiSelect={(emoji) => console.log(emoji)} />
