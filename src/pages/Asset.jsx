import { PiCurrencyDollarSimple, PiCurrencyBtc, PiCurrencyEth, PiPlus, PiTrendUp, PiGearSix, PiArrowDown, PiArrowUp, PiArrowsLeftRight, PiShoppingCart, PiFilmSlate } from 'react-icons/pi'
import '../styles/Asset.css'

const assets = [
  { symbol: 'USD', name: 'US Dollar', balance: '12,580.42', icon: <PiCurrencyDollarSimple />, color: '#16A34A' },
  { symbol: 'USDT', name: 'Tether', balance: '5,230.00', icon: <PiCurrencyDollarSimple />, color: '#26A17B' },
  { symbol: 'USDC', name: 'USD Coin', balance: '3,180.42', icon: <PiCurrencyDollarSimple />, color: '#2775CA' },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.8524', icon: <PiCurrencyEth />, color: '#627EEA' },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.1245', icon: <PiCurrencyBtc />, color: '#F7931A' },
]

// Simulated daily portfolio values for the last 30 days (in USD)
// 4 turns: rise(8) → dip(4) → long rise(12) → slight dip(6) → end
const chartData = [
  32100, 32500, 33100, 33800, 34600, 35200, 35900, 36400,
  36100, 35500, 35000, 34600,
  34800, 35100, 35500, 35700, 36100, 36400, 36900, 37200, 37500, 37900, 38300, 38700,
  38500, 38200, 37900, 37800, 37900, 37949.65
]

const totalValue = '37,949.65'
const changeValue = '+$5,849.65'
const changePercent = '+18.2%'

function buildSmoothPath(data, width, height, padding = 0) {
  const min = Math.min(...data) * 0.99
  const max = Math.max(...data) * 1.01
  const xStep = width / (data.length - 1)
  const pts = data.map((v, i) => ({
    x: i * xStep,
    y: height - ((v - min) / (max - min)) * (height - padding * 2) - padding
  }))
  // Catmull-Rom to cubic bezier
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(i + 2, pts.length - 1)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  return { d, lastX: last.x, lastY: last.y }
}

function Asset() {
  const chartW = 358, chartH = 120, drawW = chartW - 16
  const { d: linePath, lastX, lastY } = buildSmoothPath(chartData, drawW, chartH, 8)
  // Area: same path + close to bottom-right then bottom-left
  const areaPath = `${linePath} L${drawW},${chartH} L0,${chartH} Z`

  return (
    <div className="asset-page">
      <div className="asset-header">
        <h2 className="asset-title">Asset</h2>
        <PiGearSix className="asset-header-settings" />
      </div>

      {/* Portfolio Chart */}
      <div className="asset-portfolio">
        <div className="asset-portfolio-label">Est. Total Value</div>
        <div className="asset-portfolio-value">${totalValue}</div>
        <div className="asset-portfolio-change">
          <span>{changeValue}</span>
          <span className="asset-change-pct">({changePercent})</span>
          <span className="asset-change-period">30D Change</span>
        </div>
        <div className="asset-chart">
          <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" height={chartH} preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16A34A" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#chartGrad)" />
            <path d={linePath} fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lastX} cy={lastY} r="4" fill="#16A34A" />
            <circle cx={lastX} cy={lastY} r="7" fill="#16A34A" opacity="0.2" />
          </svg>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="asset-actions">
        <button className="asset-action-btn"><PiArrowDown /> Deposit</button>
        <button className="asset-action-btn"><PiArrowUp /> Withdraw</button>
        <button className="asset-action-btn"><PiArrowsLeftRight /> Swap</button>
      </div>

      <div className="asset-grid">
        {assets.map(asset => (
          <div key={asset.symbol} className="asset-card">
            <div className="asset-card-icon">
              {asset.icon}
            </div>
            <div className="asset-card-symbol">{asset.symbol}</div>
            <div className="asset-card-name">{asset.name}</div>
            <div className="asset-card-balance">{asset.balance}</div>
          </div>
        ))}
        <div className="asset-card asset-card-add">
          <PiPlus />
        </div>
      </div>

      {/* Portfolio Composition */}
      <div className="asset-composition">
        <div className="section-title">Portfolio Composition</div>
        <div className="asset-bubbles">
          <svg viewBox="0 0 320 210" width="100%" height="210">
            {/* Crypto - largest, top-left */}
            <circle cx="90" cy="78" r="68" fill="#1A1A1A" />
            <text x="90" y="66" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Crypto</text>
            <text x="90" y="84" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="500">$16,959</text>
            <text x="90" y="98" textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">44.7%</text>
            {/* Stablecoins - medium, top-right */}
            <circle cx="230" cy="68" r="55" fill="#333" />
            <text x="230" y="58" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Stablecoin</text>
            <text x="230" y="74" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="500">$8,410</text>
            <text x="230" y="88" textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">22.2%</text>
            {/* Cash - smaller, bottom-center */}
            <circle cx="175" cy="165" r="40" fill="#555" />
            <text x="175" y="157" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">Cash</text>
            <text x="175" y="173" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="500">$12,580</text>
            <text x="175" y="186" textAnchor="middle" fill="#fff" fontSize="10" opacity="0.6">33.1%</text>
          </svg>
        </div>
      </div>

      {/* Recent Changes */}
      <div className="asset-recent">
        <div className="section-title">Recent Changes</div>
        <div className="asset-recent-list">
          <div className="transaction-item card">
            <div className="tx-icon"><PiArrowDown /></div>
            <div className="tx-info">
              <div className="tx-name">USDT Deposit</div>
              <div className="tx-time">Today 10:15</div>
            </div>
            <div className="tx-amount positive">+500.00 USDT</div>
          </div>
          <div className="transaction-item card">
            <div className="tx-icon"><PiArrowsLeftRight /></div>
            <div className="tx-info">
              <div className="tx-name">ETH → USDC Swap</div>
              <div className="tx-time">Yesterday 16:45</div>
            </div>
            <div className="tx-amount">0.12 ETH</div>
          </div>
          <div className="transaction-item card">
            <div className="tx-icon"><PiArrowUp /></div>
            <div className="tx-info">
              <div className="tx-name">BTC Withdrawal</div>
              <div className="tx-time">Feb 8, 09:30</div>
            </div>
            <div className="tx-amount">-0.025 BTC</div>
          </div>
          <div className="transaction-item card">
            <div className="tx-icon"><PiArrowDown /></div>
            <div className="tx-info">
              <div className="tx-name">USD Deposit</div>
              <div className="tx-time">Feb 7, 14:20</div>
            </div>
            <div className="tx-amount positive">+2,000.00 USD</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Asset
