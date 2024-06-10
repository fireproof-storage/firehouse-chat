import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

import { EmailForm } from './EmailForm'

const Header: React.FC<{ email: string }> = ({ email, onSetEmail }) => {
  const [inEmailOpen, setIsEmailOpen] = useState(false)

  function handleSetEmail(email: string) {
    localStorage.setItem('email', email)
    onSetEmail(email)
    setIsEmailOpen(false)
  }

  function handleLogout() {
    localStorage.removeItem('email', email)
    onSetEmail('')
  }

  return (
    <header className={styles.header}>
      <Link to='/'>
        <h1 className={styles.h1}>
          Fire
          <span className={styles.accent}>house</span>
        </h1>
      </Link>
      { email ? (
        <button onClick={handleLogout} className={styles.loginBtn}>Logout</button>
      ) : (
        <>
          <button onClick={() => setIsEmailOpen(true)} className={styles.loginBtn}>Login</button>
          { inEmailOpen && <EmailForm handleSetEmail={handleSetEmail} onSetIsEmailOpen={setIsEmailOpen}/> }
        </>
      )}
    </header>
  )
}

export { Header }
