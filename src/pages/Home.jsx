import { useState } from 'react'
import { createPortal } from 'react-dom'
import { PiPlusLight, PiCurrencyCircleDollarLight, PiDiamondLight, PiDotsThreeLight, PiBellSimple, PiShoppingCart, PiCurrencyDollarSimple, PiFilmSlate, PiArrowsLeftRight, PiArrowsClockwiseBold } from 'react-icons/pi'
import RollingNumber from '../components/RollingNumber'
import UserInfo from './UserInfo'
import './Home.css'

const currencies = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'JPY', symbol: '¥', rate: 149.50 },
  { code: 'HKD', symbol: 'HK$', rate: 7.82 },
]

const baseAmount = 12580.42

function Home() {
  const [currency, setCurrency] = useState(currencies[0])
  const [showCurrencySheet, setShowCurrencySheet] = useState(false)
  const [sheetClosing, setSheetClosing] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)

  const closeCurrencySheet = () => {
    setSheetClosing(true)
    setTimeout(() => {
      setShowCurrencySheet(false)
      setSheetClosing(false)
    }, 250)
  }

  const quickActions = [
    { icon: <PiPlusLight />, label: 'Deposit' },
    { icon: <PiCurrencyCircleDollarLight />, label: 'Earn' },
    { icon: <PiDiamondLight />, label: 'Credit' },
    { icon: <PiDotsThreeLight />, label: 'More' },
  ]

  const transactions = [
    { id: 1, name: 'Amazon Purchase', type: 'payment', amount: '-$128.50', time: 'Today 14:32', icon: <PiShoppingCart /> },
    { id: 2, name: 'USDT Top Up', type: 'deposit', amount: '+$500.00', time: 'Today 10:15', icon: <PiCurrencyDollarSimple /> },
    { id: 3, name: 'Netflix Subscription', type: 'payment', amount: '-$15.99', time: 'Yesterday 20:00', icon: <PiFilmSlate /> },
    { id: 4, name: 'ETH Transfer', type: 'transfer', amount: '-$200.00', time: 'Yesterday 16:45', icon: <PiArrowsLeftRight /> },
  ]

  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-header">
        <div className="header-top">
          <div className="logo-area" onClick={() => setShowUserInfo(true)} style={{ cursor: 'pointer' }}>
            <div className="logo-circle">R</div>
            <span className="logo-text">Rick Chen</span>
          </div>
          <div className="header-actions">
            <button className="icon-btn"><PiBellSimple /></button>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="balance-section">
        <div className="balance-label">Est. Total Value</div>
        <div className="balance-row">
          <div className="balance-amount"><RollingNumber value={(baseAmount * currency.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} /></div>
          <div className="balance-currency" onClick={() => setShowCurrencySheet(true)}>
            <span className="currency-code">{currency.code}</span>
            <PiArrowsClockwiseBold className="currency-swap-icon" />
          </div>
        </div>
      </div>

      {/* Currency Swap Sheet */}
      {showCurrencySheet && createPortal(
        <div className={`sheet-overlay${sheetClosing ? ' sheet-closing' : ''}`} onClick={closeCurrencySheet}>
          <div className={`sheet-container${sheetClosing ? ' sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">Select Currency</div>
            <div className="sheet-list">
              {currencies.map(c => (
                <div
                  key={c.code}
                  className={`sheet-item${c.code === currency.code ? ' sheet-item-active' : ''}`}
                  onClick={() => { setCurrency(c); closeCurrencySheet() }}
                >
                  <span className="sheet-item-code">{c.code}</span>
                  <span className="sheet-item-symbol">{c.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action, i) => (
          <button key={i} className="action-item">
            <div className="action-icon">
              {action.icon}
            </div>
            <span className="action-label">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Transactions */}
      <div className="section-title">Transactions</div>
      <div className="transaction-list">
        {transactions.map((tx) => (
          <div key={tx.id} className="transaction-item card">
            <div className="tx-icon">{tx.icon}</div>
            <div className="tx-info">
              <div className="tx-name">{tx.name}</div>
              <div className="tx-time">{tx.time}</div>
            </div>
            <div className={`tx-amount ${tx.type === 'deposit' ? 'positive' : ''}`}>
              {tx.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Learn */}
      <div className="section-title">Learn</div>
      <div className="learn-scroll">
        <div className="learn-card">
          <img src={`${import.meta.env.BASE_URL}learn-identity.svg`} alt="" className="learn-card-img" />
          <div className="learn-card-text">How to complete account identity authentication</div>
        </div>
        <div className="learn-card">
          <img src={`${import.meta.env.BASE_URL}learn-payout.svg`} alt="" className="learn-card-img" />
          <div className="learn-card-text">Global payout with RedotPay</div>
        </div>
      </div>

      {/* Explore */}
      <div className="section-title">Explore</div>
      <div className="explore-scroll">
        <div className="explore-card">
          <img src={`${import.meta.env.BASE_URL}explore-solana.svg`} alt="" className="explore-card-img" />
          <div className="explore-card-body">
            <div className="explore-card-title">Solana Card</div>
            <div className="explore-card-subtitle">Earn up to 3% cashback</div>
          </div>
        </div>
        <div className="explore-card">
          <img src={`${import.meta.env.BASE_URL}explore-invite.svg`} alt="" className="explore-card-img" />
          <div className="explore-card-body">
            <div className="explore-card-title">Invite Friends</div>
            <div className="explore-card-subtitle">Earn up to 40% commission!</div>
          </div>
        </div>
        <div className="explore-card">
          <img src={`${import.meta.env.BASE_URL}explore-defi.svg`} alt="" className="explore-card-img" />
          <div className="explore-card-body">
            <div className="explore-card-title">DeFi Staking</div>
            <div className="explore-card-subtitle">Earn up to 12% APY on your assets</div>
          </div>
        </div>
        <div className="explore-card">
          <img src={`${import.meta.env.BASE_URL}explore-swap.svg`} alt="" className="explore-card-img" />
          <div className="explore-card-body">
            <div className="explore-card-title">Cross-Chain Swap</div>
            <div className="explore-card-subtitle">Swap tokens across networks instantly</div>
          </div>
        </div>
      </div>

      {/* UserInfo Overlay */}
      {showUserInfo && createPortal(
        <UserInfo onClose={() => setShowUserInfo(false)} />,
        document.getElementById('root')
      )}
    </div>
  )
}

export default Home
