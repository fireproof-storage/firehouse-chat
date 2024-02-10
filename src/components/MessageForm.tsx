import React from 'react'
import { styles, type MessageDoc } from './Channel'

export const MessageForm: React.FC<MessageFormProps> = ({ doc, setDoc, handleAddMessage, handleSetUsername, username }) => {
  return (
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
  )
}
interface MessageFormProps {
  doc: MessageDoc
  setDoc: (doc: Partial<MessageDoc>, options?: { replace: boolean }) => void
  handleAddMessage: (e: React.FormEvent<HTMLFormElement>) => void
  handleSetUsername: (name: string) => void
  username: string | null
}
