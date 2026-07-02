import type { ReactNode } from 'react'
import { cn } from './utils'
import { useTilt } from '../hooks/useTilt'

interface GlowCardProps {
  children: ReactNode
  className?: string
  accent?: 'cyan' | 'indigo'
}

const ACCENT_STYLES = {
  cyan: 'rgba(0, 212, 255, 0.22)',
  indigo: 'rgba(99, 102, 241, 0.22)',
} as const

export function GlowCard({ children, className, accent = 'cyan' }: GlowCardProps) {
  const { ref, style, handlers } = useTilt({ maxTilt: 12, perspective: 1200, scale: 1.015, speed: 360 })
  const accentColor = ACCENT_STYLES[accent]

  return (
    <div className={cn('relative h-full w-full', className)} style={{ perspective: '1200px' }}>
      <div
        ref={ref}
        {...handlers}
        className="group relative h-full w-full overflow-hidden rounded-[1.2rem] border border-border bg-card shadow-[0_12px_40px_rgba(10,22,40,0.08)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(10,22,40,0.14)]"
        style={style}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.14), transparent 35%, transparent 65%, rgba(255,255,255,0.08))' }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 72%)` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-px rounded-[1.15rem] opacity-0 ring-1 ring-inset transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 1px 0 0 ${accentColor}` }}
        />
        <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  )
}