import './styles.css'
// import usePartySocket from 'partysocket/react'

import React from 'react'

import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { Home } from './components/Home'
import { Channel, Thread } from './components/Channel'
import { NewChannel } from './components/NewChannel'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

const styles = {
  header: {
    padding: '12px 22px 12px 16px',
    borderBottom: '1px solid black',
    backgroundColor: '#1C1D1E'
  },
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

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <header style={styles.header}>
      <Header />
    </header>
    <div style={styles.layoutWrap}>
      <div style={styles.layoutSidebar}>
        <Sidebar />
      </div>
      <div style={styles.layoutMain}>{children}</div>
    </div>
    </>
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
