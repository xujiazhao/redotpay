import { PiShieldCheck, PiGlobe, PiSealCheck, PiGift, PiHeadset, PiInfo, PiCaretRight } from 'react-icons/pi'
import './Profile.css'

function Profile() {
  const menuItems = [
    { icon: <PiShieldCheck />, label: 'Security', desc: 'Password, biometrics', arrow: true },
    { icon: <PiGlobe />, label: 'Networks', desc: 'ERC-20, BSC, Solana', arrow: true },
    { icon: <PiSealCheck />, label: 'Verification', desc: 'Verified (KYC Level 2)', arrow: true, badge: 'Verified' },
    { icon: <PiGift />, label: 'Referral', desc: 'Invite friends, both earn $10', arrow: true },
    { icon: <PiHeadset />, label: 'Support', desc: 'Live chat / FAQ', arrow: true },
    { icon: <PiInfo />, label: 'About', desc: 'Version 2.1.0', arrow: true },
  ]

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2 className="profile-title">Profile</h2>
      </div>

      {/* User Info */}
      <div className="user-card card">
        <div className="user-avatar">
          <span>J</span>
        </div>
        <div className="user-info">
          <div className="user-name">John Doe</div>
          <div className="user-id">UID: 28491037</div>
        </div>
        <button className="edit-btn">Edit</button>
      </div>

      {/* Assets Overview */}
      <div className="assets-overview card">
        <div className="asset-item">
          <div className="asset-value">$12,580</div>
          <div className="asset-label">Total Assets</div>
        </div>
        <div className="asset-divider"></div>
        <div className="asset-item">
          <div className="asset-value">5</div>
          <div className="asset-label">Tokens</div>
        </div>
        <div className="asset-divider"></div>
        <div className="asset-item">
          <div className="asset-value">128</div>
          <div className="asset-label">Transactions</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="menu-list">
        {menuItems.map((item, i) => (
          <div key={i} className="menu-item card">
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-content">
              <div className="menu-label">{item.label}</div>
              <div className="menu-desc">{item.desc}</div>
            </div>
            {item.badge && <span className="menu-badge">{item.badge}</span>}
            {item.arrow && <span className="menu-arrow"><PiCaretRight /></span>}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{ padding: '8px 16px 20px' }}>
        <button className="btn-outline">Log Out</button>
      </div>
    </div>
  )
}

export default Profile
