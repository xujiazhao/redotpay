import { useRef } from 'react'
import { PiArrowLeft, PiShieldCheck, PiCreditCard, PiUsers, PiShareNetwork, PiInfo, PiCaretRight } from 'react-icons/pi'
import StatusBar from './StatusBar'
import '../styles/UserInfo.css'

function UserInfo({ onClose }) {
  const pageRef = useRef(null)

  const handleBack = () => {
    pageRef.current?.classList.add('slide-out')
    setTimeout(() => onClose(), 280)
  }

  const menuItems = [
    { icon: <PiShieldCheck />, label: 'Security' },
    { icon: <PiCreditCard />, label: 'Payment Setting' },
    { icon: <PiUsers />, label: 'Community' },
    { icon: <PiShareNetwork />, label: 'Share RedotPay' },
    { icon: <PiInfo />, label: 'About Us' },
  ]

  return (
    <div className="userinfo-page" ref={pageRef}>
      <StatusBar />
      <div className="userinfo-header">
        <button className="userinfo-back" onClick={handleBack}>
          <PiArrowLeft />
        </button>
        <span className="userinfo-title">Profile</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="userinfo-card">
        <div className="userinfo-avatar">J</div>
        <div className="userinfo-name">Jiazhao Xu</div>
        <div className="userinfo-email">hi@xux.com</div>
        <div className="userinfo-uid">UID: 82910374</div>
      </div>

      <div className="userinfo-menu">
        {menuItems.map((item, i) => (
          <div key={i} className="userinfo-menu-item">
            <div className="userinfo-menu-icon">{item.icon}</div>
            <span className="userinfo-menu-label">{item.label}</span>
            <PiCaretRight className="userinfo-menu-arrow" />
          </div>
        ))}
      </div>

      <div className="userinfo-logout-wrap">
        <button className="btn-outline" onClick={handleBack}>Log Out</button>
      </div>
    </div>
  )
}

export default UserInfo
