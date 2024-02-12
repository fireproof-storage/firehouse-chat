import React from 'react'
import { Link } from 'react-router-dom'
import { useFireproof } from 'use-fireproof'
import { connect } from '@fireproof/partykit'

interface LinkItem {
  name: string
  path: string
}

const Sidebar: React.FC = () => {
  const { database, useDocument, useLiveQuery } = useFireproof('_channels')
  // @ts-expect-error does not exist
  connect.partykitS3(database, process.env.PARTYKIT_HOST as string)

  const channels = useLiveQuery('name').docs as { name: string; _id: string; description: string }[]

  const links: LinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'New Channel', path: '/channel' }
    // Add more links as needed
  ]

  return (
    <div
      style={{
        padding: '1rem'
      }}
    >
      <h2>Firehouse</h2>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>

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
