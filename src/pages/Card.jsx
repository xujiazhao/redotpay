import { useState } from 'react'
import { createPortal } from 'react-dom'
import { PiEye, PiGear, PiShoppingCart, PiCurrencyDollarSimple, PiArrowUpRight, PiFilmSlate, PiContactlessPayment, PiCopy, PiCheck, PiCaretRight } from 'react-icons/pi'
import '../styles/Card.css'

function Card() {
  const [showDetail, setShowDetail] = useState(false)
  const [showManage, setShowManage] = useState(false)
  const [sheetClosing, setSheetClosing] = useState(false)
  const [frozen, setFrozen] = useState(false)
  const [copiedField, setCopiedField] = useState(null)

  const closeSheet = (setter) => {
    setSheetClosing(true)
    setTimeout(() => {
      setter(false)
      setSheetClosing(false)
    }, 250)
  }

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 1500)
  }

  const cardDetails = [
    { label: 'Card Number', value: '4392 8510 7764 8492', field: 'number' },
    { label: 'Cardholder', value: 'JIAZHAO XU', field: 'holder' },
    { label: 'Expiry Date', value: '12/28', field: 'expiry' },
    { label: 'CVV', value: '••• ', field: 'cvv' },
    { label: 'Billing Address', value: '1 Infinite Loop, CA 95014', field: 'address' },
  ]
  const activities = [
    { id: 1, name: 'Amazon Purchase', amount: '-$128.50', time: 'Today 14:32', icon: <PiShoppingCart /> },
    { id: 2, name: 'USDT Top Up', amount: '+$500.00', time: 'Today 10:15', icon: <PiCurrencyDollarSimple />, positive: true },
    { id: 3, name: 'Netflix Subscription', amount: '-$15.99', time: 'Yesterday 20:00', icon: <PiFilmSlate /> },
    { id: 4, name: 'Transfer Out', amount: '-$200.00', time: 'Yesterday 16:45', icon: <PiArrowUpRight /> },
  ]

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
            <img src={`${import.meta.env.BASE_URL}chip.png`} alt="chip" className="chip-icon" />
            <div className="contactless"><PiContactlessPayment /></div>
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
              <div className="vc-value">JIAZHAO XU</div>
            </div>
            <div className="vc-expiry">
              <div className="vc-label">EXPIRES</div>
              <div className="vc-value">12/28</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="card-btn-row">
        <button className="card-btn" onClick={() => setShowDetail(true)}>
          <PiEye className="card-btn-icon" />
          <span>View Card Detail</span>
        </button>
        <button className="card-btn" onClick={() => setShowManage(true)}>
          <PiGear className="card-btn-icon" />
          <span>Manage Card</span>
        </button>
      </div>

      {/* View Card Detail Sheet */}
      {showDetail && createPortal(
        <div className={`sheet-overlay${sheetClosing ? ' sheet-closing' : ''}`} onClick={() => closeSheet(setShowDetail)}>
          <div className={`sheet-container${sheetClosing ? ' sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">Card Details</div>
            <div className="detail-list">
              {cardDetails.map(item => (
                <div key={item.field} className="detail-row">
                  <div className="detail-left">
                    <div className="detail-label">{item.label}</div>
                    <div className="detail-value">{item.value}</div>
                  </div>
                  <button className="detail-copy" onClick={() => copyToClipboard(item.value, item.field)}>
                    {copiedField === item.field ? <PiCheck className="copy-icon copied" /> : <PiCopy className="copy-icon" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )}

      {/* Manage Card Sheet */}
      {showManage && createPortal(
        <div className={`sheet-overlay${sheetClosing ? ' sheet-closing' : ''}`} onClick={() => closeSheet(setShowManage)}>
          <div className={`sheet-container${sheetClosing ? ' sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">Manage Card</div>
            <div className="manage-list">
              <div className="manage-row">
                <span className="manage-label">Freeze Card</span>
                <div className={`toggle-switch${frozen ? ' toggle-on' : ''}`} onClick={() => setFrozen(!frozen)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="manage-row">
                <span className="manage-label">Set Spending Limit</span>
                <PiCaretRight className="manage-arrow" />
              </div>
              <div className="manage-row">
                <span className="manage-label">Change PIN</span>
                <PiCaretRight className="manage-arrow" />
              </div>
              <div className="manage-row">
                <span className="manage-label">Transaction Notifications</span>
                <PiCaretRight className="manage-arrow" />
              </div>
              <div className="manage-row manage-row-danger">
                <span className="manage-label">Cancel Card</span>
                <PiCaretRight className="manage-arrow" />
              </div>
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )}

      {/* Activity */}
      <div className="section-title">Activity</div>
      <div className="card-activity-list">
        {activities.map(tx => (
          <div key={tx.id} className="transaction-item card">
            <div className="tx-icon">{tx.icon}</div>
            <div className="tx-info">
              <div className="tx-name">{tx.name}</div>
              <div className="tx-time">{tx.time}</div>
            </div>
            <div className={`tx-amount${tx.positive ? ' positive' : ''}`}>{tx.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Card
