import type { Variants } from 'framer-motion'

export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
}

export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  glacial: 1.2,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.outBack },
  },
}

export const staggerContainer = (staggerChildren = 0.1): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren: 0.1,
    },
  },
})

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

export const hoverLift = {
  whileHover: {
    y: -8,
    transition: { duration: duration.normal, ease: easing.outExpo },
  },
  whileTap: { scale: 0.98 },
}

export const magneticHover = () => ({
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
})

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(10px)',
    transition: { duration: duration.normal, ease: easing.outExpo },
  },
}

export const scrollConfig = {
  once: true,
  margin: '-100px 0px',
  amount: 0.3,
} as const