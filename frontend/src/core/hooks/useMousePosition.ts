import { useEffect, useRef, useState } from 'react'

export interface MousePosition {
  x: number
  y: number
  normalizedX: number
  normalizedY: number
}

const INITIAL_POSITION: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>(INITIAL_POSITION)
  const frame = useRef<number | null>(null)
  const lastEvent = useRef<PointerEvent | MouseEvent | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const update = () => {
      frame.current = null
      const event = lastEvent.current
      if (!event) return

      setPosition({
        x: event.clientX,
        y: event.clientY,
        normalizedX: (event.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (event.clientY / window.innerHeight) * 2 - 1,
      })
    }

    const handler = (event: PointerEvent | MouseEvent) => {
      lastEvent.current = event
      if (frame.current !== null) return
      frame.current = window.requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', handler, { passive: true })
    window.addEventListener('mousemove', handler, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handler)
      window.removeEventListener('mousemove', handler)
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current)
      }
    }
  }, [])

  return position
}