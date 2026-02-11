import { useState, useEffect } from 'react'
import '../styles/Splash.css'

function Splash({ onFinish }) {
  const [phase, setPhase] = useState('show')  // show → fadelogo → expand → reveal

  useEffect(() => {
    // Phase 1 (0ms): logo + text visible on white bg
    // Phase 2 (1700ms): logo & text fade out
    const t1 = setTimeout(() => setPhase('fadelogo'), 1200)
    // Phase 3 (2000ms): red dot expands from center
    const t2 = setTimeout(() => setPhase('expand'), 1500)
    // Phase 4 (2450ms): red screen fades out, reveal home
    const t3 = setTimeout(() => setPhase('reveal'), 1950)
    // Phase 5 (2800ms): unmount
    const t4 = setTimeout(() => onFinish(), 2300)

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
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="RedotPay" />
        </div>
        <img src={`${import.meta.env.BASE_URL}logo%20titile.svg`} alt="RedotPay" className="splash-brand-logo" />
        <div className="splash-tagline">Where Crypto Meets Real Life</div>
      </div>

      {/* Red dot that expands to fill screen */}
      <div className="splash-dot"></div>
    </div>
  )
}

export default Splash
