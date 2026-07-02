import { useReducedMotion } from 'framer-motion'

interface GridBackgroundProps {
  color?: string
  cellSize?: number
  opacity?: number
}

export function GridBackground({
  color = '#00d4ff',
  cellSize = 56,
  opacity = 0.1,
}: GridBackgroundProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ opacity }}
    >
      <div
        className={`absolute inset-0 ${reduceMotion ? '' : 'animate-grid-scroll'}`}
        style={{
          backgroundImage: `linear-gradient(to right, ${color}26 1px, transparent 1px), linear-gradient(to bottom, ${color}26 1px, transparent 1px)`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundPosition: '0 0',
          maskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 68%, transparent 100%)',
        }}
      />
    </div>
  )
}