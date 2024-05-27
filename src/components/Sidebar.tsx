import React from 'react'
import { Link } from 'react-router-dom'
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
      <Link to='/channel' className={styles.newChannelBtn}>+ new channel</Link>

      <h2 className={styles.channelsHeading}>channels</h2>
      <ul>
        {channels.map(channel => (
          <li key={channel._id}>
            <Link to={`/channel/${channel.name}`} className={styles.channel}>
              <h3 className={styles.channelTitle}>{channel.name}</h3>
              <p className={styles.channelDescr}>{channel.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Sidebar }
