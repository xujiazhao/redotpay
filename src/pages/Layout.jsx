import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PiHouse, PiHouseFill, PiCreditCard, PiCreditCardFill, PiX, PiReceipt, PiReceiptFill, PiWallet, PiWalletFill } from 'react-icons/pi'
import StatusBar from './StatusBar'
import Pay from './Pay'
import '../styles/Layout.css'

const RedotLogo = () => (
  <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
    <path d="M14.9946 11.5645C13.1015 11.5645 11.5664 13.0996 11.5664 14.9927V18.4209H14.9946C16.8878 18.4209 18.4229 16.8858 18.4229 14.9927C18.4229 13.0996 16.8878 11.5645 14.9946 11.5645Z" fill="currentColor"/>
    <path d="M14.993 0C6.71426 0 0 6.71426 0 14.993V29.9861H6.85647V14.993C6.85647 10.5005 10.5005 6.85649 14.993 6.85649C19.4856 6.85649 23.1296 10.5005 23.1296 14.993C23.1296 19.4856 19.4856 23.1296 14.993 23.1296H11.5648V29.9861H14.993C23.2718 29.9861 29.9861 23.2718 29.9861 14.993C29.9861 6.71426 23.2718 0 14.993 0Z" fill="currentColor"/>
  </svg>
)

const tabs = [
  { path: '/', label: 'Home', icon: <PiHouse />, activeIcon: <PiHouseFill /> },
  { path: '/card', label: 'Card', icon: <PiCreditCard />, activeIcon: <PiCreditCardFill /> },
  { path: '__pay__', label: '', icon: <RedotLogo />, closeIcon: <PiX />, isPay: true },
  { path: '/activity', label: 'Activity', icon: <PiReceipt />, activeIcon: <PiReceiptFill /> },
  { path: '/asset', label: 'Asset', icon: <PiWallet />, activeIcon: <PiWalletFill /> },
]

function Layout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [fadeIn, setFadeIn] = useState(true)
  const [payOpen, setPayOpen] = useState(false)
  const [payClosing, setPayClosing] = useState(false)
  const [flyAnim, setFlyAnim] = useState(null) // 'opening' | 'closing' | null
  const [overlayReady, setOverlayReady] = useState(false) // controls transition start

  const payBtnRef = useRef(null)
  const qrTargetRef = useRef(null)
  const shellRef = useRef(null)
  const flyRef = useRef(null)
  const flyTimerRef = useRef(null)

  useEffect(() => {
    setFadeIn(false)
    const t = setTimeout(() => setFadeIn(true), 30)
    return () => clearTimeout(t)
  }, [location.pathname])

  const setQrTarget = useCallback((el) => {
    qrTargetRef.current = el
  }, [])

  const getRelativePos = (el) => {
    const shell = shellRef.current
    if (!el || !shell) return null
    const shellRect = shell.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    return {
      x: elRect.left - shellRect.left + elRect.width / 2,
      y: elRect.top - shellRect.top + elRect.height / 2,
    }
  }

  const openPay = () => {
    if (flyTimerRef.current) clearTimeout(flyTimerRef.current)

    // 1. Mount the overlay (initially at translateY(100%)) and place flying btn at tab
    setPayOpen(true)
    setPayClosing(false)
    setOverlayReady(false)
    setFlyAnim('opening')

    const btnPos = getRelativePos(payBtnRef.current)
    if (btnPos && flyRef.current) {
      flyRef.current.style.transition = 'none'
      flyRef.current.style.left = `${btnPos.x - 28}px`
      flyRef.current.style.top = `${btnPos.y - 28}px`
      flyRef.current.style.opacity = '1'
    }

    // 2. Next frame: overlay is mounted at translateY(100%) with no transition yet.
    //    Measure the QR target position (overlay is off-screen but elements exist in DOM
    //    at their natural positions relative to the overlay container).
    requestAnimationFrame(() => {
      // Measure QR target relative to overlay (overlay is at translateY(100%) but the
      // target's offset within the overlay is what we need). We read the target element's
      // position within the overlay, then compute where it WILL BE once overlay is at translateY(0).
      const shell = shellRef.current
      const overlay = shell?.querySelector('.pay-overlay')
      let targetFinalPos = null
      if (overlay && qrTargetRef.current && shell) {
        const shellRect = shell.getBoundingClientRect()
        const overlayRect = overlay.getBoundingClientRect()
        const targetRect = qrTargetRef.current.getBoundingClientRect()
        // Target's position relative to overlay
        const relToOverlayX = targetRect.left - overlayRect.left + targetRect.width / 2
        const relToOverlayY = targetRect.top - overlayRect.top + targetRect.height / 2
        // Overlay's final position relative to shell (top:0, left:0)
        targetFinalPos = {
          x: relToOverlayX,
          y: relToOverlayY,
        }
      }

      // 3. Now trigger the overlay transition to translateY(0) and fly the button
      requestAnimationFrame(() => {
        setOverlayReady(true)

        if (targetFinalPos && flyRef.current) {
          flyRef.current.style.transition = 'all 0.675s cubic-bezier(0.32, 0.72, 0, 1)'
          flyRef.current.style.left = `${targetFinalPos.x - 28}px`
          flyRef.current.style.top = `${targetFinalPos.y - 28}px`
        }

        flyTimerRef.current = setTimeout(() => setFlyAnim(null), 690)
      })
    })
  }

  const closePay = () => {
    if (flyTimerRef.current) clearTimeout(flyTimerRef.current)

    // Capture QR target position (overlay is at translateY(0) now, so direct measurement works)
    const targetPos = getRelativePos(qrTargetRef.current)
    const btnPos = getRelativePos(payBtnRef.current)

    setPayClosing(true)
    setOverlayReady(false)
    setFlyAnim('closing')

    // Place flying btn at QR center
    if (targetPos && flyRef.current) {
      flyRef.current.style.transition = 'none'
      flyRef.current.style.left = `${targetPos.x - 28}px`
      flyRef.current.style.top = `${targetPos.y - 28}px`
      flyRef.current.style.opacity = '1'
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (btnPos && flyRef.current) {
          flyRef.current.style.transition = 'all 0.525s cubic-bezier(0.32, 0.72, 0, 1)'
          flyRef.current.style.left = `${btnPos.x - 28}px`
          flyRef.current.style.top = `${btnPos.y - 28}px`
        }
        flyTimerRef.current = setTimeout(() => {
          setPayOpen(false)
          setPayClosing(false)
          setOverlayReady(false)
          setFlyAnim(null)
          if (flyRef.current) flyRef.current.style.opacity = '0'
        }, 525)
      })
    })
  }

  const handleTabClick = (tab) => {
    // Block clicks while animation is in progress
    if (flyAnim) return

    if (tab.isPay) {
      if (payOpen) {
        closePay()
      } else {
        openPay()
      }
    } else {
      if (payOpen) closePay()
      navigate(tab.path)
    }
  }

  const isLightStatusBar = location.pathname === '/card'
  const hideQrLogo = flyAnim != null

  return (
    <div className="app-shell" ref={shellRef}>
      <StatusBar light={isLightStatusBar} />
      <div className={`page-content ${fadeIn ? 'page-visible' : 'page-hidden'}`}>
        {children}
      </div>

      {/* Flying red circle */}
      <div ref={flyRef} className="flying-pay-btn" style={{ opacity: 0 }}>
        <RedotLogo />
      </div>

      {/* Pay overlay — uses CSS transition instead of keyframe animation */}
      {payOpen && (
        <div className={`pay-overlay ${overlayReady && !payClosing ? 'pay-overlay-visible' : ''} ${payClosing ? 'pay-overlay-closing' : ''}`}>
          <Pay onClose={closePay} qrTargetRef={setQrTarget} hideQrLogo={hideQrLogo} ringsVisible={!flyAnim && payOpen && !payClosing} />
        </div>
      )}

      <div className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.path}
            className={`tab-item ${tab.isPay ? 'pay-btn' : ''} ${!tab.isPay && !payOpen && location.pathname === tab.path ? 'active' : ''} ${tab.isPay && payOpen ? 'pay-active' : ''}`}
            onClick={() => handleTabClick(tab)}
            ref={tab.isPay ? payBtnRef : undefined}
          >
            <span className="tab-icon">
              {tab.isPay
                ? (payOpen ? tab.closeIcon : tab.icon)
                : (!payOpen && location.pathname === tab.path && tab.activeIcon ? tab.activeIcon : tab.icon)
              }
            </span>
            {tab.label && <span className="tab-label">{tab.label}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Layout
