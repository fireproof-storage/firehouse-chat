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
  connect.partykit(database)

  const channels = useLiveQuery('name').docs as { name: string; _id: string, description: string }[]

  const links: LinkItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Channel', path: '/channel' }
    // Add more links as needed
  ]
  console.log(channels)
  return (
    <div>
      <h2>Firehouse</h2>
      {links.map((link, index) => (
        <Link key={index} to={link.path}>
          {link.name}
        </Link>
      ))}

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
