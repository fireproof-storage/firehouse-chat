import './styles.css'
// import usePartySocket from 'partysocket/react'

import React, { useState } from 'react'

import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Home } from './components/Home'
import { Channel, Thread } from './components/Channel'
import { NewChannel } from './components/NewChannel'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

import styles from './client.module.css'

function Layout({
  children,
  email,
  onSetEmail,
  isMobChannelsOpen,
  onSetIsMobChannelsOpen,
  isNewChannelOpen,
  onSetIsNewChannelOpen
}: {
  children: React.ReactNode,
  email: string, 
  onSetEmail: () => void,
  isMobChannelsOpen: boolean,
  onSetIsMobChannelsOpen: () => void,
  isNewChannelOpen: boolean,
  onSetIsNewChannelOpen: () => void })
{

return (
  <>
    <Header email={email} onSetEmail={onSetEmail} />
    {email ? (
      <div className={styles.layoutWrap}>
        <div className={styles.layoutSidebar} className={`${styles.layoutSidebar} ${isMobChannelsOpen ? styles.open : ''}`}>
          <Sidebar
            isMobChannelsOpen={isMobChannelsOpen}
            onSetIsMobChannelsOpen={onSetIsMobChannelsOpen}
            isNewChannelOpen={isNewChannelOpen}
            onSetIsNewChannelOpen={onSetIsNewChannelOpen}
          />
        </div>
        <div className={styles.layoutMain}>{children}</div>
      </div>
    ) : (
      <Home />
    )}
  </>
)}

function App() {
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'))
  const [isMobChannelsOpen, setIsMobChannelsOpen] = useState(false)
  const [isNewChannelOpen, setIsNewChannelOpen] = useState(false)

  const routes = [
    { path: '/channel/:id/thread/:tid', component: <Thread /> },
    { path: '/channel/:id', component: <Channel /> },
    { path: '/channel', component: <NewChannel onSetIsNewChannelOpen={setIsNewChannelOpen} /> },
    { path: '/', component: <Home /> }
  ]

  return (
    <Router>
      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={(
            <Layout
              email={email}
              onSetEmail={setEmail}
              isMobChannelsOpen={isMobChannelsOpen}
              onSetIsMobChannelsOpen={setIsMobChannelsOpen}
              isNewChannelOpen={isNewChannelOpen}
              onSetIsNewChannelOpen={setIsNewChannelOpen}
            >{component}</Layout>
            )}/>
        ))}
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('app')!).render(<App />)
