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
    backgroundColor: '#363638',
    width: '110px',
    padding: '8px',
    borderRadius: '5px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
    border: '1px solid #454546'
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
