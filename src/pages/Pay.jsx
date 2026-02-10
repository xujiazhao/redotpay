import { useState } from 'react'
import { createPortal } from 'react-dom'
import { PiCurrencyDollarSimple, PiCurrencyBtc, PiCurrencyEth, PiCaretDown, PiCaretRight, PiPaperPlaneTilt, PiQrCode, PiHandCoins, PiCheckCircleFill, PiCircle } from 'react-icons/pi'
import '../styles/Pay.css'

const tokens = [
  { symbol: 'USDT', name: 'Tether', balance: '5,230.00', icon: <PiCurrencyDollarSimple />, selected: true },
  { symbol: 'USDC', name: 'USD Coin', balance: '3,180.42', icon: <PiCurrencyDollarSimple /> },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.8524', icon: <PiCurrencyEth /> },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.1245', icon: <PiCurrencyBtc /> },
]

function Pay({ onClose, qrTargetRef, hideQrLogo, ringsVisible }) {
  const [selectedToken, setSelectedToken] = useState(tokens[0])
  const [showTokenList, setShowTokenList] = useState(false)
  const [sheetClosing, setSheetClosing] = useState(false)

  const closeTokenSheet = () => {
    setSheetClosing(true)
    setTimeout(() => {
      setShowTokenList(false)
      setSheetClosing(false)
    }, 250)
  }

  return (
    <div className="pay-sheet">
      {/* Header */}
      <div className="pay-sheet-header">
        <h2 className="pay-sheet-title">Pay with Redot</h2>
      </div>

      {/* QR Code Area */}
      <div className="pay-qr-area">
        <div className="pay-qr-card">
          <div className="pay-qr-code">
            <svg viewBox="0 0 220 220" width="220" height="220">
              {/* Ring code – concentric arc-dash rings */}
              {/* Background */}
              <circle cx="110" cy="110" r="110" fill="white"/>

              {/* Ring data: [radius, totalSlots, segmentAngle, gapAngle, fills] */}
              {/* fills: 0=empty, 1=black, 2=gray */}
              {(() => {
                const cx = 110, cy = 110
                // Each slot: 0=empty, or a span multiplier (0.3~2.8) for varying arc lengths
                const rings = [
                  { r: 101, slots: 50, baseSpan: 4.2, sw: 6,
                    arcs: [2.5,0,0,0,0.4,0,0,2.2,0,0,0.6,0,0,2.8,0,0,0.3,0,0,1.8,0,0,0,0.5,0,2.4,0,0,0,0.7,0,0,2.0,0,0,0.4,0,0,2.6,0,0,0,0.3,0,1.6,0,0,0,2.2,0] },
                  { r: 89, slots: 42, baseSpan: 5.2, sw: 6,
                    arcs: [0,0.5,0,0,2.4,0,0,0.3,0,2.0,0,0,0,2.8,0,0.6,0,0,1.6,0,0,0,0.4,0,2.2,0,0,0.7,0,0,2.6,0,0,0,0.3,0,1.8,0,0,0,2.4,0] },
                  { r: 77, slots: 36, baseSpan: 6.0, sw: 6,
                    arcs: [0,2.6,0,0,0.4,0,0,1.8,0,0,0,2.2,0,0.5,0,0,2.8,0,0,0,0.3,0,2.0,0,0,0.7,0,0,2.4,0,0,0,0.6,0,1.6,0] },
                  { r: 65, slots: 28, baseSpan: 7.5, sw: 6,
                    arcs: [0.4,0,0,2.6,0,0,0.3,0,2.2,0,0,0,2.8,0,0.5,0,0,1.8,0,0,0.7,0,0,2.4,0,0,0,1.6] },
                  { r: 53, slots: 22, baseSpan: 9.5, sw: 6,
                    arcs: [0,2.4,0,0,0.4,0,2.8,0,0,0.6,0,0,2.0,0,0.3,0,0,1.8,0,0,2.6,0] },
                  { r: 42, slots: 16, baseSpan: 12, sw: 6,
                    arcs: [2.2,0,0,0.4,0,2.8,0,0,0.6,0,0,2.4,0,0,1.6,0] },
                ]
                const toRad = d => d * Math.PI / 180
                return rings.map((ring, ri) => {
                  // Inner rings animate first: reverse index for delay
                  const delayIndex = rings.length - 1 - ri
                  const delay = delayIndex * 0.06
                  return (
                    <g
                      key={`ring-${ri}`}
                      className={ringsVisible ? 'ring-burst' : 'ring-hidden'}
                      style={{
                        transformOrigin: `${cx}px ${cy}px`,
                        animationDelay: ringsVisible ? `${delay}s` : '0s',
                        opacity: ringsVisible ? undefined : 0,
                        transform: ringsVisible ? undefined : 'scale(0)',
                      }}
                    >
                      {Array.from({ length: ring.slots }, (_, i) => {
                        const arcMul = ring.arcs[i]
                        if (!arcMul) return null
                        const span = ring.baseSpan * arcMul
                        const centerAngle = i * (360 / ring.slots)
                        const a1 = toRad(centerAngle - span / 2)
                        const a2 = toRad(centerAngle + span / 2)
                        const x1 = cx + ring.r * Math.cos(a1)
                        const y1 = cy + ring.r * Math.sin(a1)
                        const x2 = cx + ring.r * Math.cos(a2)
                        const y2 = cy + ring.r * Math.sin(a2)
                        return (
                          <path
                            key={`r${ri}-${i}`}
                            d={`M${x1},${y1} A${ring.r},${ring.r} 0 0,1 ${x2},${y2}`}
                            fill="none"
                            stroke="#1A1A2E"
                            strokeWidth={ring.sw}
                            strokeLinecap="round"
                          />
                        )
                      })}
                    </g>
                  )
                })
              })()}

              {/* Redot logo center */}
              <circle cx="110" cy="110" r="25.5" fill="#EB0028" style={{ opacity: hideQrLogo ? 0 : 1, transition: 'opacity 0.15s' }}/>
              <g transform="translate(100, 100) scale(0.667)" style={{ opacity: hideQrLogo ? 0 : 1, transition: 'opacity 0.15s' }}>
                <path d="M14.9946 11.5645C13.1015 11.5645 11.5664 13.0996 11.5664 14.9927V18.4209H14.9946C16.8878 18.4209 18.4229 16.8858 18.4229 14.9927C18.4229 13.0996 16.8878 11.5645 14.9946 11.5645Z" fill="white"/>
                <path d="M14.993 0C6.71426 0 0 6.71426 0 14.993V29.9861H6.85647V14.993C6.85647 10.5005 10.5005 6.85649 14.993 6.85649C19.4856 6.85649 23.1296 10.5005 23.1296 14.993C23.1296 19.4856 19.4856 23.1296 14.993 23.1296H11.5648V29.9861H14.993C23.2718 29.9861 29.9861 23.2718 29.9861 14.993C29.9861 6.71426 23.2718 0 14.993 0Z" fill="white"/>
              </g>
            </svg>
            {/* Ref target for flying animation */}
            <div ref={qrTargetRef} className="pay-qr-center-target" />
          </div>
          <p className="pay-qr-hint">Show the Dot code to merchant to pay</p>
          {/* Token selector - divider separated */}
          <div className="pay-token-divider" />
          <div className="pay-token-row" onClick={() => setShowTokenList(true)}>
            <div className="pay-token-icon">{selectedToken.icon}</div>
            <span className="pay-token-label">{selectedToken.symbol}</span>
            <span className="pay-token-balance">{selectedToken.balance}</span>
            <PiCaretRight className="pay-token-caret" />
          </div>
        </div>
      </div>

      {/* Token selection bottom sheet */}
      {showTokenList && createPortal(
        <div className={`sheet-overlay${sheetClosing ? ' sheet-closing' : ''}`} onClick={closeTokenSheet}>
          <div className={`sheet-container${sheetClosing ? ' sheet-closing' : ''}`} onClick={e => e.stopPropagation()}>
            <div className="sheet-handle" />
            <div className="sheet-title">Select Token</div>
            <div className="sheet-list">
              {tokens.map((token) => {
                const isActive = selectedToken.symbol === token.symbol
                return (
                <div
                  key={token.symbol}
                  className={`pay-token-sheet-item ${isActive ? 'pay-token-sheet-active' : ''}`}
                  onClick={() => { setSelectedToken(token); closeTokenSheet() }}
                >
                  <span className={`pay-token-sheet-icon ${isActive ? 'pay-token-sheet-icon-active' : ''}`}>{token.icon}</span>
                  <div className="pay-token-info">
                    <span className="pay-token-name">{token.symbol}</span>
                    <span className="pay-token-subname">{token.name}</span>
                  </div>
                  <span className="pay-token-bal">{token.balance}</span>
                  {isActive
                    ? <PiCheckCircleFill className="pay-token-check" />
                    : <PiCircle className="pay-token-check-empty" />
                  }
                </div>
              )})}
            </div>
          </div>
        </div>,
        document.getElementById('root')
      )}

      {/* Actions card */}
      <div className="pay-actions-card">
        <div className="pay-action-item">
          <div className="pay-action-icon"><PiPaperPlaneTilt /></div>
          <span className="pay-action-label">Transfer</span>
          <PiCaretRight className="pay-action-caret" />
        </div>
        <div className="pay-action-item">
          <div className="pay-action-icon"><PiQrCode /></div>
          <span className="pay-action-label">Receive</span>
          <PiCaretRight className="pay-action-caret" />
        </div>
        <div className="pay-action-item">
          <div className="pay-action-icon"><PiHandCoins /></div>
          <span className="pay-action-label">Request</span>
          <PiCaretRight className="pay-action-caret" />
        </div>
      </div>
    </div>
  )
}

export default Pay
