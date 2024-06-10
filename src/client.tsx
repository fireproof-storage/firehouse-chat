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

const styles = {
  layoutWrap: {
    display: 'flex',
    flexGrow: '1',
    overflow: 'hidden'
  },
  layoutSidebar: {
    width: '285px',
    overflowY: 'scroll',
    backgroundColor: '#1C1D1E',
    borderRight: '1px solid black',
  },
  layoutMain: {
    flexGrow: '1'
  }
}

function Layout({ children, email, onSetEmail }: { children: React.ReactNode, email: string }) {

return (
  <>
    <Header email={email} onSetEmail={onSetEmail}/>
    {email ? (
      <div style={styles.layoutWrap}>
        <div style={styles.layoutSidebar}>
          <Sidebar />
        </div>
        <div style={styles.layoutMain}>{children}</div>
      </div>
    ) : (
      <Home />
    )}
  </>
)}

function App() {
  const routes = [
    { path: '/channel/:id/thread/:tid', component: <Thread /> },
    { path: '/channel/:id', component: <Channel /> },
    { path: '/channel', component: <NewChannel /> },
    { path: '/', component: <Home /> }
  ]

  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'))

  return (
    <Router>
      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={(
            <Layout email={email} onSetEmail={setEmail}>{component}</Layout>
            )}/>
        ))}
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('app')!).render(<App />)
