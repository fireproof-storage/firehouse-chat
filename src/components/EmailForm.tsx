import React from 'react'
import { styles } from './MessageForm'

export const EmailForm: React.FC<{ handleSetEmail: (email: string) => void }> = ({
  handleSetEmail
}) => {
  const [email, setEmail] = React.useState('')

  return (
    <form
      style={styles.messageForm}
      onSubmit={e => {
        e.preventDefault()
        handleSetEmail(email)
      }}
    >
      <input
        title="Set your email"
        name="email"
        type="email"
        value={email}
        autoComplete="off"
        style={{ width: '80%', marginRight: '1rem' }}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email for Gravatar image"
      />
      <button type="submit">Login</button>
    </form>
  )
}
