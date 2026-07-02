import { useCallback, useRef, type MouseEvent as ReactMouseEvent } from 'react'
import { useReducedMotion } from 'framer-motion'

interface TiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  speed?: number
}

export function useTilt(options: TiltOptions = {}) {
  const { maxTilt = 15, perspective = 1000, scale = 1.02, speed = 400 } = options
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const handleMouseMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
  }, [maxTilt, perspective, reduceMotion, scale])

  const handleMouseLeave = useCallback(() => {
    if (reduceMotion) return
    if (!ref.current) return

    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }, [perspective, reduceMotion])

  return {
    ref,
    style: {
      transformStyle: 'preserve-3d' as const,
      transition: reduceMotion ? undefined : `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      willChange: 'transform',
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}