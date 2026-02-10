import { useState } from 'react'
import { PiShoppingCart, PiCurrencyDollarSimple, PiFilmSlate, PiArrowsLeftRight, PiArrowUpRight, PiMusicNote, PiMagnifyingGlass, PiCurrencyBtc, PiAppleLogo } from 'react-icons/pi'
import './History.css'

function History() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'payment', label: 'Payment' },
    { key: 'deposit', label: 'Deposit' },
    { key: 'transfer', label: 'Transfer' },
    { key: 'exchange', label: 'Swap' },
  ]

  const transactions = [
    { id: 1, name: 'Amazon Purchase', type: 'payment', amount: '-$128.50', time: '2026-02-10 14:32', icon: <PiShoppingCart />, status: 'Done' },
    { id: 2, name: 'USDT Top Up', type: 'deposit', amount: '+$500.00', time: '2026-02-10 10:15', icon: <PiCurrencyDollarSimple />, status: 'Done' },
    { id: 3, name: 'Netflix Subscription', type: 'payment', amount: '-$15.99', time: '2026-02-09 20:00', icon: <PiFilmSlate />, status: 'Done' },
    { id: 4, name: 'ETH → USDT', type: 'exchange', amount: '$1,200.00', time: '2026-02-09 16:45', icon: <PiArrowsLeftRight />, status: 'Done' },
    { id: 5, name: 'Transfer to Alice', type: 'transfer', amount: '-$200.00', time: '2026-02-08 12:30', icon: <PiArrowUpRight />, status: 'Done' },
    { id: 6, name: 'Spotify Premium', type: 'payment', amount: '-$9.99', time: '2026-02-08 08:00', icon: <PiMusicNote />, status: 'Done' },
    { id: 7, name: 'BTC Top Up', type: 'deposit', amount: '+$3,500.00', time: '2026-02-07 15:20', icon: <PiCurrencyBtc />, status: 'Done' },
    { id: 8, name: 'Apple Store', type: 'payment', amount: '-$299.00', time: '2026-02-07 11:10', icon: <PiAppleLogo />, status: 'Pending' },
    { id: 9, name: 'Transfer to Bob', type: 'transfer', amount: '-$50.00', time: '2026-02-06 18:55', icon: <PiArrowUpRight />, status: 'Done' },
    { id: 10, name: 'USDC → USDT', type: 'exchange', amount: '$800.00', time: '2026-02-06 09:30', icon: <PiArrowsLeftRight />, status: 'Done' },
  ]

  const filtered = activeFilter === 'all'
    ? transactions
    : transactions.filter(tx => tx.type === activeFilter)

  return (
    <div className="history-page">
      <div className="history-header">
        <h2 className="history-title">Transactions</h2>
        <button className="icon-btn-small"><PiMagnifyingGlass /></button>
      </div>

      {/* Summary Cards */}
      <div className="summary-row">
        <div className="summary-card income">
          <div className="summary-label">Income This Month</div>
          <div className="summary-amount">+$4,000.00</div>
        </div>
        <div className="summary-card expense">
          <div className="summary-label">Spent This Month</div>
          <div className="summary-amount">-$703.48</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        {filters.map(f => (
          <button
            key={f.key}
            className={`filter-chip ${activeFilter === f.key ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="history-list">
        {filtered.map(tx => (
          <div key={tx.id} className="history-item">
            <div className="hi-icon">{tx.icon}</div>
            <div className="hi-info">
              <div className="hi-name">{tx.name}</div>
              <div className="hi-time">{tx.time}</div>
            </div>
            <div className="hi-right">
              <div className={`hi-amount ${tx.amount.startsWith('+') ? 'positive' : ''}`}>
                {tx.amount}
              </div>
              <div className={`hi-status ${tx.status === 'Pending' ? 'pending' : ''}`}>
                {tx.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History
