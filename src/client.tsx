import './styles.css'
import usePartySocket from 'partysocket/react'
import { createRoot } from 'react-dom/client'

import { Channel } from './components/Channel'

function App() {
  usePartySocket({
    room: 'example-room',
    onMessage(evt) {
      console.log('Received message:', evt.data)
    }
  })
  return <div>
    <Channel />
  </div>
  
}

createRoot(document.getElementById('app')!).render(<App />)
