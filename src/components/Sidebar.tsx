import React from 'react'
import { Link } from 'react-router-dom'
import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'

const styles = {
  channelBtn: {
    display: 'block',
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#363638',
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.15)',
    border: '1px solid #454546'
  },
  channelsHeading: {
    fontSize: '10px',
    textAlign: 'right',
    marginTop: '38px',
    marginBottom: '8px',
    textTransform: 'uppercase',
    opacity: '0.5'
  },
  channel: {
    display: 'block',
    backgroundColor: '#363638',
    borderRadius: '8px',
    marginBottom: '8px',
    padding: '12px'
  },
  channelTitle: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '16px'
  },
  channelDescr: {
    fontSize: '12px',
    fontWeight: '400',
    opacity: '0.7'
  }
}

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
      <Link to='/channel' style={styles.channelBtn}>+ new channel</Link>

      <h2 style={styles.channelsHeading}>channels</h2>
      <ul>
        {channels.map(channel => (
          <li key={channel._id}>
            <Link to={`/channel/${channel.name}`} style={styles.channel}>
              <h3 style={styles.channelTitle}>{channel.name}</h3>
              <p style={styles.channelDescr}>{channel.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Sidebar }
