import React from 'react'

import styles from './EmailForm.module.css'

export const EmailForm: React.FC<{ handleSetEmail: (email: string) => void }> = ({
  handleSetEmail
}) => {
  const [email, setEmail] = React.useState('')

  return (
    <div className={styles.emailFormWrap}>
      <form className={styles.form}
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
          className={styles.input}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email for Gravatar image"
        />
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  )
}
