import React from 'react'
import { Link } from 'react-router-dom'
import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'

const Sidebar: React.FC = () => {
  const { database, useDocument, useLiveQuery } = useFireproof('_channels')

  // @ts-expect-error does not exist
  connect.partykitS3(database, PARTYKIT_HOST as string)

  const channels = useLiveQuery('name').docs as { name: string; _id: string; description: string }[]

  return (
    <div
      style={{
        padding: '1rem'
      }}
    >
      <Link to='/channel'>+ new channel</Link>

      <h3>Channels</h3>
      <ul>
        {channels.map(channel => (
          <li key={channel._id}>
            <Link to={`/channel/${channel.name}`}>{channel.name}</Link>
            <p>{channel.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Sidebar }
