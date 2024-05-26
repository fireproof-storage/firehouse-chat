import './styles.css'
import './client.css'
// import usePartySocket from 'partysocket/react'

import React from 'react'

import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Home } from './components/Home'
import { Channel, Thread } from './components/Channel'
import { NewChannel } from './components/NewChannel'
import { Sidebar } from './components/Sidebar'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-wrap">
      <div className="layout-sidebar">
        <Sidebar />
      </div>
      <div className="layout-main">{children}</div>
    </div>
  )
}

function App() {
  const routes = [
    { path: '/channel/:id/thread/:tid', component: <Thread /> },
    { path: '/channel/:id', component: <Channel /> },
    { path: '/channel', component: <NewChannel /> },
    { path: '/', component: <Home /> }
  ]

  return (
    <Router>
      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={<Layout>{component}</Layout>} />
        ))}
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('app')!).render(<App />)
