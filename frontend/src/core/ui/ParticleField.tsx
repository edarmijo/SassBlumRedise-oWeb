import { motion, useReducedMotion } from 'framer-motion'

interface ParticleFieldProps {
  count?: number
}

const PARTICLES = [
  { left: '8%', top: '18%', size: 8, delay: 0, duration: 9 },
  { left: '18%', top: '72%', size: 6, delay: 0.6, duration: 11 },
  { left: '31%', top: '28%', size: 10, delay: 0.3, duration: 10 },
  { left: '52%', top: '14%', size: 7, delay: 1, duration: 12 },
  { left: '67%', top: '66%', size: 11, delay: 0.2, duration: 9.5 },
  { left: '79%', top: '24%', size: 6, delay: 0.8, duration: 10.5 },
  { left: '88%', top: '58%', size: 9, delay: 0.4, duration: 11.5 },
] as const

export function ParticleField({ count = 7 }: ParticleFieldProps) {
  const reduceMotion = useReducedMotion()
  const particles = PARTICLES.slice(0, count)

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}-${index}`}
          className="absolute rounded-full bg-brand-cyan/40 blur-[1px]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow: '0 0 18px rgba(0, 212, 255, 0.35)',
          }}
          animate={reduceMotion ? undefined : { y: [-10, 10, -10], opacity: [0.35, 0.9, 0.35] }}
          transition={reduceMotion ? undefined : { duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}