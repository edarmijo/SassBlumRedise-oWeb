import { useReducedMotion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'

export function CursorFollower() {
  const reduceMotion = useReducedMotion()
  const { x, y } = useMousePosition()

  if (reduceMotion) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 hidden md:block" style={{ zIndex: 60 }}>
      <div
        className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-cyan/35 bg-brand-cyan/6 shadow-[0_0_40px_rgba(0,212,255,0.18)] animate-cursor-breathe"
        style={{
          left: x,
          top: y,
          transition: 'transform 140ms ease-out, opacity 180ms ease-out',
        }}
      />
      <div
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cyan shadow-[0_0_18px_rgba(0,212,255,0.55)]"
        style={{
          left: x,
          top: y,
          transition: 'transform 90ms ease-out, opacity 90ms ease-out',
        }}
      />
    </div>
  )
}