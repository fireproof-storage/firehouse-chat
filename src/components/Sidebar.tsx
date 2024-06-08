import React from 'react'
import { NavLink } from 'react-router-dom';
import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'

import styles from './Sidebar.module.css'

const Sidebar: React.FC = () => {
  const { database, useDocument, useLiveQuery } = useFireproof('_channels')

  // @ts-expect-error does not exist
  connect.partykitS3(database, PARTYKIT_HOST as string)

  const channels = useLiveQuery('name').docs as { name: string; _id: string; description: string }[]

  return (
    <div
      style={{
        padding: '16px'
      }}
    >
      <NavLink to='/channel' className={styles.newChannelBtn}>+ new channel</NavLink>

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
