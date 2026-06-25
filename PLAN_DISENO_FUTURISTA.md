# 🚀 Plan de Implementación — Diseño Futurista SassBlum

> **Proyecto:** SassBlum Rediseño Web
> **Stack:** React 19 + TypeScript + Tailwind CSS 4 + Framer Motion
> **Objetivo:** Transformar la landing page y dashboard con efectos futuristas
> tipo antigravity, hover 3D, partículas, y transiciones fluidas

---

## 📋 Resumen de Efectos a Implementar

| # | Efecto | Dónde | Complejidad |
|---|--------|-------|-------------|
| 1 | Hero con antigravity floating | Home.tsx | Media |
| 2 | Tarjetas con hover 3D tilt | ServiceCard, TicketCard | Media |
| 3 | Fondo con partículas/grilla animada | Home.tsx, Login | Alta |
| 4 | Cursor personalizado reactivo | Global | Baja |
| 5 | Transiciones de página fluidas | App.tsx (routes) | Media |
| 6 | Navbar glassmorphism animado | Navbar.tsx | Baja |
| 7 | Scroll reveal animations | Todas las secciones | Baja |
| 8 | Botones con ripple effect | button.tsx | Baja |
| 9 | Loading skeleton animado | Dashboard, Cards | Baja |
| 10 | Efecto glow/brillo en hover | CTAs, badges | Baja |

---

## ⏱️ Estimación Total: ~20-25 horas

| Fase | Tiempo | Descripción |
|------|--------|-------------|
| Fase 1: Fundamentos | 3h | Design tokens, utilidades, cursor |
| Fase 2: Hero Antigravity | 4h | Floating text, partículas, parallax |
| Fase 3: Tarjetas 3D | 5h | Tilt effect, sombras dinámicas |
| Fase 4: Transiciones | 4h | Page transitions, scroll reveal |
| Fase 5: Detalles | 3h | Ripple, glow, skeletons |
| Fase 6: Optimización | 2h | Performance, accessibility |

---

## 🔧 PREREQUISITOS

### Dependencias necesarias

```bash
cd frontend
npm install framer-motion three @react-three/fiber @react-three/drei
```

> **Nota:** `framer-motion` ya está instalado. `three` + `@react-three/fiber` son para
> partículas 3D opcionales. Si quieres solo CSS/JS, no necesitas Three.js.

### Estructura de archivos a crear

```
frontend/src/
├── core/
│   ├── hooks/
│   │   ├── useMousePosition.ts      ← Posición del cursor
│   │   ├── useTilt.ts               ← Efecto tilt 3D
│   │   └── useScrollReveal.ts       ← Intersection Observer
│   ├── ui/
│   │   ├── CursorFollower.tsx        ← Cursor personalizado
│   │   ├── ParticleField.tsx         ← Partículas de fondo
│   │   ├── GridBackground.tsx        ← Grilla animada
│   │   ├── GlowCard.tsx             ← Card con efecto glow
│   │   ├── RippleButton.tsx          ← Botón con ripple
│   │   └── PageTransition.tsx        ← Wrapper de transición
│   └── utils/
│       └── animation.ts             ← Variants de Framer Motion reutilizables
└── modules/
    └── public/
        └── pages/
            └── Home.tsx              ← Rediseño completo
```

---

## FASE 1: Fundamentos (3 horas)

### 1.1 Design Tokens de Animación

**Archivo:** `frontend/src/index.css`

Agregar tokens de animación a los design tokens existentes:

```css
/* ════════════════════════════════════════════════════════════════
   ANIMATION TOKENS — SassBlum Futurista
   ════════════════════════════════════════════════════════════════ */

:root {
  /* Timing functions */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-glacial: 1200ms;

  /* 3D perspective */
  --perspective-card: 1000px;
  --perspective-page: 1200px;

  /* Glow effects */
  --glow-cyan: 0 0 20px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1);
  --glow-cyan-strong: 0 0 30px rgba(0, 212, 255, 0.5), 0 0 80px rgba(0, 212, 255, 0.2);

  /* Floating animation */
  --float-distance: 10px;
  --float-duration: 3s;
}

/* Respeta prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  :root {
    --float-distance: 0px;
    --float-duration: 0s;
  }
}

/* Keyframes reutilizables */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(calc(-1 * var(--float-distance))); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: var(--glow-cyan); }
  50% { box-shadow: var(--glow-cyan-strong); }
}

@keyframes grid-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 0 60px; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Utility classes */
.animate-float { animation: float var(--float-duration) ease-in-out infinite; }
.animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.animate-grid-scroll { animation: grid-scroll 8s linear infinite; }
.animate-fade-in-up { animation: fade-in-up 0.6s var(--ease-out-expo) forwards; }
.animate-shimmer {
  background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.1) 50%, transparent 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 1.2 Variantes de Framer Motion Reutilizables

**Archivo nuevo:** `frontend/src/core/utils/animation.ts`

```typescript
import type { Variants, Transition } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════
// ANIMATION VARIANTS — Reutilizables en todo el proyecto
// ═══════════════════════════════════════════════════════════════

// Easing curves
export const easing = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
  spring: [0.175, 0.885, 0.32, 1.275] as const,
}

// Durations
export const duration = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  glacial: 1.2,
}

// Fade up (aparece subiendo)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

// Fade in (aparece con opacidad)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

// Scale in (aparece escalando)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.outBack },
  },
}

// Stagger container (anima hijos en secuencia)
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

// Stagger item (hijo individual)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easing.outExpo },
  },
}

// Hover lift (se eleva al hover)
export const hoverLift = {
  whileHover: {
    y: -8,
    transition: { duration: duration.normal, ease: easing.outExpo },
  },
  whileTap: { scale: 0.98 },
}

// Magnetic hover (sigue el cursor ligeramente)
export const magneticHover = (strength = 0.3) => ({
  whileHover: { scale: 1.02 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
})

// Page transition
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

// Scroll-triggered animation config
export const scrollConfig = {
  once: true,
  margin: '-100px 0px',
  amount: 0.3,
} as const
```

### 1.3 Hook de Posición del Cursor

**Archivo nuevo:** `frontend/src/core/hooks/useMousePosition.ts`

```typescript
import { useState, useEffect } from 'react'

interface MousePosition {
  x: number
  y: number
  normalizedX: number  // -1 a 1
  normalizedY: number  // -1 a 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0, y: 0, normalizedX: 0, normalizedY: 0,
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }

    // Respeta prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) {
      window.addEventListener('mousemove', handler, { passive: true })
    }

    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return position
}
```

### 1.4 Hook de Tilt 3D

**Archivo nuevo:** `frontend/src/core/hooks/useTilt.ts`

```typescript
import { useRef, useCallback, type MouseEvent } from 'react'

interface TiltOptions {
  maxTilt?: number      // Máxima rotación en grados
  perspective?: number  // Perspectiva CSS
  scale?: number        // Escala al hover
  speed?: number        // Velocidad de la transición
}

export function useTilt(options: TiltOptions = {}) {
  const { maxTilt = 15, perspective = 1000, scale = 1.02, speed = 400 } = options
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    ref.current.style.transform =
      `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
  }, [maxTilt, perspective, scale])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform =
      `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
  }, [perspective])

  return {
    ref,
    style: {
      transformStyle: 'preserve-3d' as const,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      willChange: 'transform',
    },
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  }
}
```

---

## FASE 2: Hero Antigravity (4 horas)

### 2.1 Grilla de Fondo Animada

**Archivo nuevo:** `frontend/src/core/ui/GridBackground.tsx`

```tsx
import { memo } from 'react'

interface GridBackgroundProps {
  color?: string
  cellSize?: number
  opacity?: number
  animated?: boolean
}

export const GridBackground = memo(function GridBackground({
  color = '#00d4ff',
  cellSize = 60,
  opacity = 0.08,
  animated = true,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px),
          linear-gradient(90deg, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        animation: animated ? 'grid-scroll 8s linear infinite' : 'none',
        willChange: animated ? 'background-position' : 'auto',
      }}
    />
  )
})
```

### 2.2 Hero Section Rediseñado

**Archivo:** `frontend/src/modules/public/pages/Home.tsx`

Reemplazar la sección Hero actual con:

```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GridBackground } from '../../../core/ui/GridBackground'
import { fadeUp, staggerContainer, staggerItem, easing, duration } from '../../../core/utils/animation'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax: el texto se mueve más lento que el scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div ref={heroRef} className="relative bg-brand-navy text-white overflow-hidden min-h-screen">
      {/* Grilla animada de fondo */}
      <GridBackground color="#00d4ff" cellSize={60} opacity={0.06} />

      {/* Glow orbs de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)' }}
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Contenido principal con parallax */}
      <motion.div
        style={{ y, opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 flex flex-col items-center justify-center min-h-screen"
      >
        {/* Badge flotante */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan text-sm tracking-[0.3em] uppercase animate-float">
            SASS BLUM
          </span>
        </motion.div>

        {/* Título con efecto antigravity */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl mb-6 max-w-4xl mx-auto font-semibold leading-tight text-center"
        >
          <span className="block">Innovación</span>
          <motion.span
            className="block text-brand-cyan"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            tecnológica
          </motion.span>
          <span className="block">para tu negocio</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 text-center"
        >
          Soluciones integrales en tecnología con más de 20 años de experiencia
        </motion.p>

        {/* CTAs con glow effect */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.15)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div variants={staggerItem}>
            <Link
              to="/servicios"
              className="group relative inline-flex items-center px-8 py-3 bg-brand-cyan text-brand-navy font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[var(--glow-cyan-strong)]"
            >
              <span className="relative z-10">Nuestros Servicios</span>
              <ArrowRight className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </motion.div>
          <motion.div variants={staggerItem}>
            <Link
              to="/nosotros"
              className="inline-flex items-center px-8 py-3 border border-brand-cyan text-brand-cyan font-semibold rounded-lg bg-transparent hover:bg-brand-cyan/10 transition-all duration-300"
            >
              Conocer más
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-8 w-8 text-brand-cyan/60" />
        </motion.div>
      </motion.div>
    </div>
  )
}
```

---

## FASE 3: Tarjetas con Hover 3D (5 horas)

### 3.1 Componente GlowCard

**Archivo nuevo:** `frontend/src/core/ui/GlowCard.tsx`

```tsx
import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { cn } from './utils'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: string
  maxTilt?: number
}

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(0, 212, 255, 0.15)',
  maxTilt = 12,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glareRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Rotación 3D
    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    cardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

    // Glare effect (brillo que sigue al cursor)
    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100
    glareRef.current.style.background =
      `radial-gradient(circle at ${glareX}% ${glareY}%, ${glowColor}, transparent 60%)`
    glareRef.current.style.opacity = '1'
  }, [maxTilt, glowColor])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || !glareRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    glareRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative rounded-xl transition-transform duration-500 ease-out',
        'will-change-transform',
        className
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glare overlay */}
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        aria-hidden
      />
      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
    </div>
  )
}
```

### 3.2 ServiceCard con 3D Tilt

**Archivo:** `frontend/src/modules/catalog/components/ServiceCard/index.tsx`

```tsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GlowCard } from '../../../../core/ui/GlowCard'
import { ImageWithFallback } from '../../../../core/ui/ImageWithFallback'
import { staggerItem } from '../../../../core/utils/animation'

interface ServiceCardProps {
  title: string
  description: string
  imageUrl: string
  href: string
}

export function ServiceCard({ title, description, imageUrl, href }: ServiceCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Link to={href} className="group block">
        <GlowCard className="bg-white shadow-md hover:shadow-xl transition-shadow duration-500">
          {/* Imagen con zoom suave */}
          <div className="relative overflow-hidden rounded-t-xl h-64">
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          {/* Contenido */}
          <div className="p-6">
            <h3 className="text-xl mb-2 font-medium group-hover:text-brand-cyan-dark transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600">{description}</p>
          </div>
        </GlowCard>
      </Link>
    </motion.div>
  )
}
```

---

## FASE 4: Transiciones de Página (4 horas)

### 4.1 Page Transition Wrapper

**Archivo nuevo:** `frontend/src/core/ui/PageTransition.tsx`

```tsx
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { pageTransition } from '../utils/animation'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### 4.2 Scroll Reveal Component

**Archivo nuevo:** `frontend/src/core/ui/ScrollReveal.tsx`

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { fadeUp, scrollConfig } from '../utils/animation'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, scrollConfig)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### 4.3 Navbar Glassmorphism

**Archivo:** `frontend/src/core/ui/layout/Navbar.tsx`

Cambiar el fondo del nav:

```tsx
// ANTES:
<nav className="bg-brand-navy text-white sticky top-0 z-50 border-b border-brand-border">

// DESPUÉS:
<nav className="bg-brand-navy/80 backdrop-blur-xl text-white sticky top-0 z-50 border-b border-brand-border/50">
```

---

## FASE 5: Detalles de Micro-interacción (3 horas)

### 5.1 Botón con Ripple Effect

**Archivo nuevo:** `frontend/src/core/ui/RippleButton.tsx`

```tsx
import { useState, useCallback, type MouseEvent, type ReactNode } from 'react'
import { Button } from './button'
import type { ButtonProps } from './button'

interface RippleButtonProps extends ButtonProps {
  children: ReactNode
}

export function RippleButton({ children, className, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
  }, [])

  return (
    <Button className={`relative overflow-hidden ${className ?? ''}`} onClick={handleClick} {...props}>
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-[ripple_0.6s_ease-out_forwards] pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
    </Button>
  )
}
```

Agregar la keyframe en `index.css`:

```css
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

### 5.2 Cursor Personalizado (Opcional)

**Archivo nuevo:** `frontend/src/core/ui/CursorFollower.tsx`

```tsx
import { motion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'

export function CursorFollower() {
  const { x, y } = useMousePosition()

  // Solo en desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-brand-cyan/50 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{
        x: x - 16,
        y: y - 16,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 400,
        mass: 0.5,
      }}
    />
  )
}
```

---

## FASE 6: Optimización (2 horas)

### 6.1 Respeta prefers-reduced-motion

Todos los componentes ya incluyen soporte. Verificar con:

```typescript
// En cada hook de animación
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) return // No animar
```

### 6.2 Performance Checklist

- [ ] `will-change` solo en elementos que se animan activamente
- [ ] `transform` y `opacity` para animaciones (GPU-accelerated)
- [ ] `contain: layout` en componentes aislados
- [ ] Lazy loading de componentes de partículas
- [ ] `React.memo` en componentes que no cambian frecuentemente
- [ ] `useCallback` en handlers de mouse
- [ ] Throttle de `mousemove` events (16ms = 60fps)

### 6.3 Accessibility Checklist

- [ ] `aria-hidden` en elementos decorativos
- [ ] `prefers-reduced-motion` respeta todas las animaciones
- [ ] Focus visible en elementos interactivos
- [ ] Animaciones no causan vestibular motion sickness
- [ ] Contraste de colores mantiene WCAG 2.1 AA

---

## 📦 Resumen de Archivos a Crear/Modificar

| # | Archivo | Acción | Fase |
|---|---------|--------|------|
| 1 | `src/index.css` | Modificar (agregar tokens) | 1 |
| 2 | `src/core/utils/animation.ts` | **Crear** | 1 |
| 3 | `src/core/hooks/useMousePosition.ts` | **Crear** | 1 |
| 4 | `src/core/hooks/useTilt.ts` | **Crear** | 1 |
| 5 | `src/core/ui/GridBackground.tsx` | **Crear** | 2 |
| 6 | `src/core/ui/GlowCard.tsx` | **Crear** | 3 |
| 7 | `src/core/ui/PageTransition.tsx` | **Crear** | 4 |
| 8 | `src/core/ui/ScrollReveal.tsx` | **Crear** | 4 |
| 9 | `src/core/ui/RippleButton.tsx` | **Crear** | 5 |
| 10 | `src/core/ui/CursorFollower.tsx` | **Crear** | 5 |
| 11 | `src/modules/public/pages/Home.tsx` | **Modificar** (Hero) | 2 |
| 12 | `src/modules/catalog/components/ServiceCard/index.tsx` | **Modificar** | 3 |
| 13 | `src/core/ui/layout/Navbar.tsx` | **Modificar** (glass) | 4 |
| 14 | `src/App.tsx` | **Modificar** (transitions) | 4 |

**Total: 10 archivos nuevos + 4 modificados**

---

## 🎯 Resultado Final

Después de implementar las 6 fases, tu SassBlum tendrá:

- ✅ Hero con texto flotante antigravity y grilla animada
- ✅ Tarjetas con tilt 3D que siguen al cursor
- ✅ Efecto glow/brillo que reacciona al mouse
- ✅ Transiciones fluidas entre páginas
- ✅ Scroll reveal animations
- ✅ Navbar glassmorphism
- ✅ Botones con ripple effect
- ✅ Cursor personalizado (opcional)
- ✅ Respeta prefers-reduced-motion
- ✅ GPU-accelerated (60fps)
- ✅ Accesible (WCAG 2.1 AA)
