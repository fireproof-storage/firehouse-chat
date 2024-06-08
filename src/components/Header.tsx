import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link to='/'>
        <h1 className={styles.h1}>
          Fire
          <span className={styles.accent}>house</span>
        </h1>
      </Link>
      <button className={styles.loginBtn}>Login</button>
    </header>
  )
}

export { Header }
