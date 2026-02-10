import { useState, useEffect } from 'react'
import './Splash.css'

function Splash({ onFinish }) {
  const [phase, setPhase] = useState('show')  // show → fadelogo → expand → reveal

  useEffect(() => {
    // Phase 1 (0ms): logo + text visible on white bg
    // Phase 2 (700ms): logo & text fade out
    const t1 = setTimeout(() => setPhase('fadelogo'), 700)
    // Phase 3 (1000ms): red dot expands from center
    const t2 = setTimeout(() => setPhase('expand'), 1000)
    // Phase 4 (1450ms): red screen fades out, reveal home
    const t3 = setTimeout(() => setPhase('reveal'), 1450)
    // Phase 5 (1800ms): unmount
    const t4 = setTimeout(() => onFinish(), 1800)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [onFinish])

  return (
    <div className={`splash ${phase}`}>
      {/* Logo + brand text — shown first */}
      <div className="splash-brand-area">
        <div className="splash-logo">
          <img src="/logo.svg" alt="RedotPay" />
        </div>
        <div className="splash-brand-text">RedotPay</div>
        <div className="splash-tagline">Web3 Payment, Simplified</div>
      </div>

      {/* Red dot that expands to fill screen */}
      <div className="splash-dot"></div>
    </div>
  )
}

export default Splash
