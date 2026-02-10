import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Splash from './pages/Splash'
import Home from './pages/Home'
import Card from './pages/Card'
import History from './pages/History'
import Asset from './pages/Asset'
import './styles/global.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const handleSplashFinish = useCallback(() => setShowSplash(false), [])

  return (
    <Layout>
      {showSplash && <Splash onFinish={handleSplashFinish} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
        <Route path="/activity" element={<History />} />
        <Route path="/asset" element={<Asset />} />
      </Routes>
    </Layout>
  )
}

export default App
