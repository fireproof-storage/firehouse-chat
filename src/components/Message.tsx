import React from 'react'
import type { Database } from 'use-fireproof'
import type { MessageDoc, AnyDoc, ReactionDoc } from './Channel'

interface MessageProps {
  doc: MessageDoc
  gravatar: string
  database: Database
}

const styles = {
  listItem: {
    listStyleType: 'none',
    margin: '0',
    padding: '10px'
  },
  message: {
    fontSize: '16px',
    color: '#333'
  },
  date: {
    fontSize: '12px',
    color: '#999'
  },
  gravatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginTop: '-15px',
    top: '25px',
    position: 'relative' as const,
    marginRight: '0.5rem',
    float: 'left' as const
  }
}

const Message: React.FC<MessageProps> = ({ doc, gravatar, database }) => {
  const { message, max, created, profileImg, _id: mId } = doc
  const date = new Date(created)

  function onEmojiSelect(emoji: string) {
    const reaction: ReactionDoc = {
      type: 'reaction',
      parent: { max, created, id: mId! },
      reaction: emoji,
      profileImg: gravatar
    }
    database.put(reaction)
  }

  return (
    <li className="message" style={styles.listItem}>
      <img src={profileImg} alt="gravatar" style={styles.gravatar} />
      <p style={styles.message}>{message}</p>
      <small style={styles.date}>{date.toLocaleString()}</small>
      <EmojiPicker onEmojiSelect={onEmojiSelect} />
    </li>
  )
}

export { Message }

import { useState } from 'react'

const EmojiPicker: React.FC<{ onEmojiSelect: (emoji: string) => void }> = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const topReactions = [
    '👍',
    '😂',
    '😍',
    '😭',
    '🔥',
    '🙌',
    '👏',
    '🤔',
    '😢',
    '🎉',
    '💕',
    '🤣',
    '🥺',
    '✨',
    '😒',
    '👀',
    '🙄',
    '🤦‍♂️',
    '🤷‍♀️',
    '👌'
  ]

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? '➖' : '➕'}</button>
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
