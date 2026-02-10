function StatusBar({ light = false }) {
  const src = light ? '/statusbar-light.svg' : '/statusbar-dark.svg'

  return (
    <div className="status-bar">
      <img src={src} alt="" className="status-bar-img" />
    </div>
  )
}

export default StatusBar
