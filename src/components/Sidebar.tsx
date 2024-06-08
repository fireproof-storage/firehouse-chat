import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'

import styles from './Sidebar.module.css'

const Sidebar: React.FC = () => {
  const { database, useDocument, useLiveQuery } = useFireproof('_channels')
  const [isNewChannelOpen, setIsNewChannelOpen] = useState(false)

  // @ts-expect-error does not exist
  connect.partykitS3(database, PARTYKIT_HOST as string)

  const channels = useLiveQuery('name').docs as { name: string; _id: string; description: string }[]

  const handleClick = (e) => {
    if (isNewChannelOpen) {
      e.preventDefault()
      history.go(-1)
      setIsNewChannelOpen(false)
    } else {
      setIsNewChannelOpen(true)
    }
  }

  return (
    <div style={{ padding: '16px' }}>
      <Link to='/channel' onClick={handleClick} className={styles.newChannelBtn}>+ new channel</Link>
      <h2 className={styles.channelsHeading}>channels</h2>
      <ul>
        {channels.map(channel => (
          <li key={channel._id}>
            <NavLink
              to={`/channel/${channel.name}`}
              className={({ isActive }) => isActive ? `${styles.channel} ${styles.active}` : styles.channel}
            >
              <h3 className={styles.channelTitle}>{channel.name}</h3>
              <p className={styles.channelDescr}>{channel.description}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Sidebar }
