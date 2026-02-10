import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Splash from './components/Splash'
import Home from './pages/Home'
import Card from './pages/Card'
import Pay from './pages/Pay'
import History from './pages/History'
import Profile from './pages/Profile'
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
        <Route path="/pay" element={<Pay />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  )
}

export default App
