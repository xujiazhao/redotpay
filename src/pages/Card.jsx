import { PiLock, PiChartBar, PiListDashes, PiSnowflake, PiWifiHigh } from 'react-icons/pi'
import './Card.css'

function Card() {
  return (
    <div className="card-page">
      {/* Card Header */}
      <div className="card-header">
        <div className="card-header-content">
          <h2 className="card-page-title">My Cards</h2>
          <p className="card-page-subtitle">Manage your virtual & physical cards</p>
        </div>
      </div>

      {/* Virtual Card */}
      <div className="virtual-card-wrapper">
        <div className="virtual-card">
          <div className="vc-top">
            <div className="vc-logo">RedotPay</div>
            <div className="vc-type">VISA</div>
          </div>
          <div className="vc-chip">
            <div className="chip-icon">▣</div>
            <div className="contactless"><PiWifiHigh /></div>
          </div>
          <div className="vc-number">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>8492</span>
          </div>
          <div className="vc-bottom">
            <div className="vc-holder">
              <div className="vc-label">CARDHOLDER</div>
              <div className="vc-value">JOHN DOE</div>
            </div>
            <div className="vc-expiry">
              <div className="vc-label">EXPIRES</div>
              <div className="vc-value">12/28</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="card-actions-grid">
        <button className="card-action-btn">
          <span className="ca-icon"><PiSnowflake /></span>
          <span className="ca-text">Freeze</span>
        </button>
        <button className="card-action-btn">
          <span className="ca-icon"><PiLock /></span>
          <span className="ca-text">PIN</span>
        </button>
        <button className="card-action-btn">
          <span className="ca-icon"><PiChartBar /></span>
          <span className="ca-text">Limits</span>
        </button>
        <button className="card-action-btn">
          <span className="ca-icon"><PiListDashes /></span>
          <span className="ca-text">Details</span>
        </button>
      </div>

      {/* Card Info */}
      <div className="section-title">Card Info</div>
      <div className="card-info card">
        <div className="info-row">
          <span className="info-label">Card Type</span>
          <span className="info-value">Visa Virtual</span>
        </div>
        <div className="info-row">
          <span className="info-label">Status</span>
          <span className="info-value status-active">Active</span>
        </div>
        <div className="info-row">
          <span className="info-label">Balance</span>
          <span className="info-value">$12,580.42</span>
        </div>
        <div className="info-row">
          <span className="info-label">Monthly Limit</span>
          <span className="info-value">$50,000.00</span>
        </div>
      </div>

      {/* Apply Physical Card */}
      <div style={{ padding: '0 16px 20px' }}>
        <button className="btn-primary">Apply for Physical Card</button>
      </div>
    </div>
  )
}

export default Card
