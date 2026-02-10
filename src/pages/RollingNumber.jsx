import { useState, useEffect, useRef } from 'react'
import '../styles/RollingNumber.css'

const CHARS = '0123456789'

function DigitColumn({ to, delay }) {
  const idx = CHARS.indexOf(to)
  // If not a digit (comma, dot), render static
  if (idx === -1) return <span className="roll-static">{to}</span>

  return (
    <span className="roll-col-wrap">
      <span
        className="roll-col"
        style={{
          transform: `translateY(-${idx * 10}%)`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {CHARS.split('').map(d => (
          <span key={d} className="roll-cell">{d}</span>
        ))}
      </span>
    </span>
  )
}

export default function RollingNumber({ value, className }) {
  const chars = value.split('')

  return (
    <span className={`rolling-number ${className || ''}`}>
      {chars.map((char, i) => (
        <DigitColumn key={i} to={char} delay={i * 40} />
      ))}
    </span>
  )
}
