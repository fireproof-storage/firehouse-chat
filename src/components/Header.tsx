import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  headerLink: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  h1: {
    fontSize: '24px',
  },
  accent: {
    color: '#F98B4D'
  },
  loginBtn: {
    fontSize: '14px',
    color: '#333',
    width: '110px',
    padding: '8px'
  }
}

const Header: React.FC = () => {

  return (
    <Link to='/' style={styles.headerLink}>
      <h1 style={styles.h1}>
        Fire<span style={styles.accent}>house</span>
      </h1>
      <button style={styles.loginBtn}>Login</button>
    </Link>
  )
}

export { Header }
