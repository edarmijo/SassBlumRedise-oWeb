import { motion } from 'framer-motion'
import { EASE_APPLE } from '../motion/ease'

const ORB_COLOR = {
  cyan: '#00d4ff',
  indigo: '#6366f1',
} as const

const ORB_POSITION = {
  'top-right': '-top-24 -right-16',
  'bottom-left': '-bottom-24 -left-16',
  'bottom-right': '-bottom-24 right-0',
} as const

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle: string
  accent?: keyof typeof ORB_COLOR
  orbPosition?: keyof typeof ORB_POSITION
}

/**
 * Hero estándar de las páginas públicas: eyebrow + título con gradiente + subtítulo,
 * sobre fondo navy con un orbe de luz estático. Entrada one-shot (sin loops).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  accent = 'cyan',
  orbPosition = 'top-right',
}: PageHeroProps) {
  return (
    <div className="relative bg-brand-navy text-white py-28 md:py-36 overflow-hidden">
      <div
        className={`absolute ${ORB_POSITION[orbPosition]} h-96 w-96 rounded-full blur-2xl`}
        style={{ background: `radial-gradient(circle, ${ORB_COLOR[accent]} 0%, transparent 70%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-cyan mb-4 uppercase tracking-[0.4em] text-sm"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_APPLE }}
          className="text-5xl md:text-7xl mb-5 font-semibold tracking-tight"
        >
          <span className="text-gradient-brand">{title}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-gray-300 font-light"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  )
}
