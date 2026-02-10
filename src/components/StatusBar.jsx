function StatusBar({ light = false }) {
  const base = import.meta.env.BASE_URL
  const src = light ? `${base}statusbar-light.svg` : `${base}statusbar-dark.svg`

  return (
    <div className="status-bar">
      <img src={src} alt="" className="status-bar-img" />
    </div>
  )
}

export default StatusBar
