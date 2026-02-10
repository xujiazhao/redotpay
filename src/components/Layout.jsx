import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PiHouse, PiHouseFill, PiCreditCard, PiCreditCardFill, PiArrowUpRight, PiReceipt, PiReceiptFill, PiWallet, PiWalletFill } from 'react-icons/pi'
import StatusBar from './StatusBar'
import './Layout.css'

const tabs = [
  { path: '/', label: 'Home', icon: <PiHouse />, activeIcon: <PiHouseFill /> },
  { path: '/card', label: 'Card', icon: <PiCreditCard />, activeIcon: <PiCreditCardFill /> },
  { path: '/pay', label: '', icon: <PiArrowUpRight />, isPay: true },
  { path: '/history', label: 'Activity', icon: <PiReceipt />, activeIcon: <PiReceiptFill /> },
  { path: '/profile', label: 'Asset', icon: <PiWallet />, activeIcon: <PiWalletFill /> },
]

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    setFadeIn(false)
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setFadeIn(true))
    })
    return () => cancelAnimationFrame(t)
  }, [location.pathname])

  const isLightStatusBar = location.pathname === '/card'

  return (
    <div className="app-shell">
      <StatusBar light={isLightStatusBar} />
      <div className={`page-content ${fadeIn ? 'page-visible' : 'page-hidden'}`}>
        {children}
      </div>
      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            className={`tab-item ${tab.isPay ? 'pay-btn' : ''} ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            <span className="tab-icon">{location.pathname === tab.path && tab.activeIcon ? tab.activeIcon : tab.icon}</span>
            {tab.label && <span className="tab-label">{tab.label}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Layout
