import { PiCurrencyDollarSimple, PiCurrencyBtc, PiCurrencyEth, PiPlus, PiTrendUp } from 'react-icons/pi'
import '../styles/Asset.css'

const assets = [
  { symbol: 'USD', name: 'US Dollar', balance: '12,580.42', icon: <PiCurrencyDollarSimple />, color: '#16A34A' },
  { symbol: 'USDT', name: 'Tether', balance: '5,230.00', icon: <PiCurrencyDollarSimple />, color: '#26A17B' },
  { symbol: 'USDC', name: 'USD Coin', balance: '3,180.42', icon: <PiCurrencyDollarSimple />, color: '#2775CA' },
  { symbol: 'ETH', name: 'Ethereum', balance: '1.8524', icon: <PiCurrencyEth />, color: '#627EEA' },
  { symbol: 'BTC', name: 'Bitcoin', balance: '0.1245', icon: <PiCurrencyBtc />, color: '#F7931A' },
]

// Simulated daily portfolio values for the last 30 days (in USD)
const chartData = [
  32100, 33200, 32400, 31500, 32800, 34100, 33200, 32600, 34500, 35800,
  34200, 33100, 34800, 36200, 35400, 34100, 35900, 37100, 35800, 34600,
  36300, 37800, 36400, 35200, 37100, 38500, 37200, 36800, 38400, 37949.65
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
  return d
}

function Asset() {
  const chartW = 358, chartH = 120
  const linePath = buildSmoothPath(chartData, chartW, chartH, 8)
  // Area: same path + close to bottom-right then bottom-left
  const areaPath = `${linePath} L${chartW},${chartH} L0,${chartH} Z`

  return (
    <div className="asset-page">
      <div className="asset-header">
        <h2 className="asset-title">Asset</h2>
      </div>

      {/* Portfolio Chart */}
      <div className="asset-portfolio">
        <div className="asset-portfolio-label">Est. Total Value</div>
        <div className="asset-portfolio-value">${totalValue}</div>
        <div className="asset-portfolio-change">
          <PiTrendUp className="asset-change-icon" />
          <span>{changeValue}</span>
          <span className="asset-change-pct">({changePercent})</span>
          <span className="asset-change-period">30d</span>
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
          </svg>
        </div>
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
          <div className="asset-card-icon">
            <PiPlus />
          </div>
          <div className="asset-card-symbol">Add Asset</div>
        </div>
      </div>
    </div>
  )
}

export default Asset
