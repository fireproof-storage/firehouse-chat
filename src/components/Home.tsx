import React from 'react'

import styles from './Home.module.css'

const Home: React.FC = () => {
  return (
    <div className={styles.homeWrap}>
      <h1 className={styles.h1}>Firehouse</h1>
      <p className={styles.paragraph}>
        This is a simple chat app that uses
        <a className={styles.link} href="https://fireproof.storage/" target="_blank" rel="noopener nofollow"> Fireproof </a> 
        to sync data between clients.</p>
    </div>
  )
}

export { Home }
