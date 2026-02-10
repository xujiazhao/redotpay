import { useState } from 'react'
import { PiClipboardText, PiCamera, PiCurrencyDollarSimple, PiCurrencyBtc, PiCurrencyEth } from 'react-icons/pi'
import './Pay.css'

function Pay() {
  const [amount, setAmount] = useState('')
  const [activeTab, setActiveTab] = useState('send')

  const cryptoList = [
    { symbol: 'USDT', name: 'Tether', balance: '5,230.00', icon: <PiCurrencyDollarSimple /> },
    { symbol: 'USDC', name: 'USD Coin', balance: '3,180.42', icon: <PiCurrencyDollarSimple /> },
    { symbol: 'ETH', name: 'Ethereum', balance: '1.8524', icon: <PiCurrencyEth /> },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.1245', icon: <PiCurrencyBtc /> },
  ]

  const handleNumPad = (val) => {
    if (val === 'del') {
      setAmount(prev => prev.slice(0, -1))
    } else if (val === '.' && amount.includes('.')) {
      return
    } else {
      setAmount(prev => prev + val)
    }
  }

  return (
    <div className="pay-page">
      {/* Pay Header */}
      <div className="pay-header">
        <h2 className="pay-title">Pay</h2>
      </div>

      {/* Tab Switch */}
      <div className="pay-tabs">
        <button
          className={`pay-tab ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => setActiveTab('send')}
        >
          Send
        </button>
        <button
          className={`pay-tab ${activeTab === 'receive' ? 'active' : ''}`}
          onClick={() => setActiveTab('receive')}
        >
          Receive
        </button>
        <button
          className={`pay-tab ${activeTab === 'scan' ? 'active' : ''}`}
          onClick={() => setActiveTab('scan')}
        >
          Scan
        </button>
      </div>

      {activeTab === 'send' && (
        <>
          {/* Amount Input */}
          <div className="amount-section">
            <div className="amount-display">
              <span className="currency-symbol">$</span>
              <span className="amount-value">{amount || '0'}</span>
            </div>
            <div className="amount-hint">Available: $12,580.42</div>
          </div>

          {/* Recipient */}
          <div className="card recipient-card">
            <div className="recipient-label">Recipient</div>
            <div className="recipient-input">
              <span className="recipient-icon"><PiClipboardText /></span>
              <input type="text" placeholder="Enter wallet address or search contacts" className="recipient-field" />
              <button className="scan-btn"><PiCamera /></button>
            </div>
          </div>

          {/* Crypto Selection */}
          <div className="section-title">Select Token</div>
          <div className="crypto-list">
            {cryptoList.map((crypto) => (
              <div key={crypto.symbol} className="crypto-item card">
                <div className="crypto-icon-wrap">{crypto.icon}</div>
                <div className="crypto-info">
                  <div className="crypto-symbol">{crypto.symbol}</div>
                  <div className="crypto-name">{crypto.name}</div>
                </div>
                <div className="crypto-balance">{crypto.balance}</div>
              </div>
            ))}
          </div>

          {/* Numpad */}
          <div className="numpad">
            {['1','2','3','4','5','6','7','8','9','.','0','del'].map((key) => (
              <button key={key} className="numpad-key" onClick={() => handleNumPad(key)}>
                {key === 'del' ? '⌫' : key}
              </button>
            ))}
          </div>

          <div style={{ padding: '0 16px 20px' }}>
            <button className="btn-primary" disabled={!amount}>Confirm Payment</button>
          </div>
        </>
      )}

      {activeTab === 'receive' && (
        <div className="receive-section">
          <div className="qr-placeholder">
            <div className="qr-box">
              <div className="qr-pattern">
                {'▪▫▪▫▪▪▫▪\n▫▪▫▪▫▫▪▫\n▪▫▪▪▫▪▪▫\n▫▪▫▫▪▫▫▪\n▪▪▫▪▪▫▪▫\n▫▫▪▫▫▪▫▪\n▪▫▪▫▪▪▫▪\n▫▪▫▪▫▫▪▫'.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
            <p className="qr-hint">Scan QR code to pay me</p>
          </div>
          <div className="card" style={{ margin: '0 16px' }}>
            <div className="recipient-label">My Wallet Address</div>
            <div className="wallet-address">0x7a3f...e8b2</div>
            <button className="btn-outline" style={{ marginTop: 12 }}>Copy Address</button>
          </div>
        </div>
      )}

      {activeTab === 'scan' && (
        <div className="scan-section">
          <div className="scan-viewport">
            <div className="scan-frame">
              <div className="corner tl"></div>
              <div className="corner tr"></div>
              <div className="corner bl"></div>
              <div className="corner br"></div>
              <div className="scan-line"></div>
            </div>
            <p className="scan-hint">Place QR code inside the frame</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pay
