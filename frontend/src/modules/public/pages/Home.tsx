import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion'
import { ArrowRight, ShieldCheck, Cpu, Camera as CameraIcon } from 'lucide-react'
import { Button } from '../../../core/ui/button'
import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'
import { InteractiveGlow } from '../../../core/ui/InteractiveGlow'
import { Reveal, FocusReveal } from '../../../core/ui/motion'
import { EASE_APPLE } from '../../../core/ui/motion/ease'

const GRID_BG =
  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300d4ff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'

const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const heroChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

const HIGHLIGHTS = [
  {
    title: 'Infraestructura IT',
    desc: 'Diseño e implementación de soluciones tecnológicas robustas y escalables.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    icon: Cpu,
  },
  {
    title: 'CCTV',
    desc: 'Sistemas de videovigilancia y seguridad avanzados, monitoreo en tiempo real.',
    img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80',
    icon: CameraIcon,
  },
  {
    title: 'Domótica',
    desc: 'Automatización inteligente para espacios modernos y eficientes.',
    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    icon: ShieldCheck,
  },
]

/* ── Hero con parallax ligero (un solo transform) del titular ──────────────── */
function CinematicHero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  // Único trabajo por frame: desplaza/atenúa el titular (transform + opacity).
  const textY = useTransform(scrollY, [0, 600], [0, -120])
  const textOpacity = useTransform(scrollY, [0, 420], [1, 0])

  return (
    <section className="relative h-svh min-h-160 bg-brand-navy text-white overflow-hidden">
      {/* Cuadrícula estática */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: GRID_BG }}
      />

      {/* Resplandor interactivo que sigue al cursor (estilo Antigravity) */}
      <InteractiveGlow color="#00d4ff" size={560} />

      {/* Orbes de luz estáticos (se pintan una vez) */}
      <div
        className="absolute -top-32 -right-24 h-136 w-136 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -left-32 h-120 w-120 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
      />

      {/* Contenido del hero */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <motion.div
          style={reduce ? undefined : { y: textY, opacity: textOpacity }}
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={heroChild}
            transition={{ duration: 0.6, ease: EASE_APPLE }}
            className="text-brand-cyan mb-5 uppercase tracking-[0.45em] text-sm"
          >
            Sass Blum
          </motion.p>
          <motion.h1
            variants={heroChild}
            transition={{ duration: 0.8, ease: EASE_APPLE }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight max-w-5xl mx-auto"
          >
            Innovación tecnológica
            <br />
            <span className="text-gradient-brand">para tu negocio</span>
          </motion.h1>
          <motion.p
            variants={heroChild}
            transition={{ duration: 0.7, ease: EASE_APPLE }}
            className="text-lg md:text-2xl text-gray-300/90 max-w-2xl mx-auto mt-7 mb-10 font-light"
          >
            Soluciones integrales en tecnología con más de 20 años de experiencia.
          </motion.p>
          <motion.div
            variants={heroChild}
            transition={{ duration: 0.7, ease: EASE_APPLE }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-brand-cyan hover:bg-brand-cyan text-brand-navy font-semibold rounded-full px-7 h-12 shadow-lg shadow-brand-cyan/20 transition-transform hover:scale-[1.03]"
            >
              <Link to="/servicios">
                Nuestros Servicios
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm rounded-full px-7 h-12 transition-transform hover:scale-[1.03]"
            >
              <Link to="/nosotros">Conocer más</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-9 left-1/2 -translate-x-1/2">
          <div className="h-10 w-6 rounded-full border-2 border-brand-cyan/50 flex items-start justify-center p-1.5">
            <span className="block h-2 w-1 rounded-full bg-brand-cyan animate-scroll-cue" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <CinematicHero />

      {/* ── Áreas de experiencia — tarjetas que "entran en foco" al scrollear ── */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16 md:mb-20">
            <p className="text-brand-cyan-dark uppercase mb-3 tracking-[0.3em] text-sm">Servicios</p>
            <h2 className="text-4xl md:text-6xl text-gray-900 font-semibold tracking-tight">
              Áreas de experiencia
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {HIGHLIGHTS.map((h) => (
              <FocusReveal key={h.title}>
                <Link to="/servicios" className="group block">
                  <div className="relative overflow-hidden rounded-2xl mb-5 h-72 shadow-lg shadow-brand-navy/5 ring-1 ring-black/5">
                    <ImageWithFallback
                      src={h.img}
                      alt={h.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
                    <div className="absolute top-5 left-5 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                      <h.icon className="h-6 w-6 text-brand-cyan" />
                    </div>
                    <h3 className="absolute bottom-5 left-5 right-5 text-2xl font-medium text-white">
                      {h.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{h.desc}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-brand-cyan-dark font-medium opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Ver más <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </FocusReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Declaración kinética full-bleed — números grandes estilo Apple ───── */}
      <KineticStatement />

      {/* ── Sobre nosotros — imagen con parallax ────────────────────────────── */}
      <section className="py-28 md:py-36 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ParallaxImage />
            <Reveal y={32}>
              <p className="text-brand-cyan-dark uppercase mb-3 tracking-[0.3em] text-sm">
                Acerca de nosotros
              </p>
              <h2 className="text-3xl md:text-5xl mb-5 font-semibold tracking-tight">
                20+ años transformando empresas con tecnología
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                SASS BLUM se especializa en soluciones IT integrales, ofreciendo servicios
                innovadores a empresas e industrias, liderando proyectos y la venta de servicios
                para distintos proveedores de tecnología.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-brand-navy hover:bg-brand-navy text-white rounded-full px-7 h-12 transition-transform hover:scale-[1.03]"
              >
                <Link to="/nosotros">Conocer más</Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA final con glow ──────────────────────────────────────────────── */}
      <section className="relative bg-brand-navy text-white py-28 md:py-32 overflow-hidden">
        <InteractiveGlow color="#00d4ff" size={520} />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-112 w-md rounded-full blur-2xl"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl mb-6 font-semibold tracking-tight">
              ¿Necesitas ayuda con un proyecto?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 font-light">
              Nuestro equipo está listo para ofrecerte soluciones tecnológicas personalizadas.
            </p>
            <Button
              asChild
              size="lg"
              className="group bg-brand-cyan hover:bg-brand-cyan text-brand-navy font-semibold rounded-full px-8 h-12 text-base shadow-xl shadow-brand-cyan/25 transition-transform hover:scale-[1.04]"
            >
              <Link to="/login">
                Crear un ticket
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

/* ── Sección de números grandes con reveal escalonado ──────────────────────── */
function KineticStatement() {
  const stats = [
    { value: '20+', label: 'Años de experiencia' },
    { value: '500+', label: 'Proyectos entregados' },
    { value: '24/7', label: 'Soporte técnico' },
  ]

  return (
    <section className="relative bg-brand-navy-deep text-white py-32 md:py-44 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{ backgroundImage: GRID_BG }}
      />
      <InteractiveGlow color="#6366f1" size={600} />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-3xl mx-auto leading-tight">
            La conexión perfecta entre tu empresa y{' '}
            <span className="text-gradient-brand">la tecnología</span>.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-20">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12} y={24}>
              <p className="text-6xl md:text-7xl font-semibold text-brand-cyan tracking-tight">
                {s.value}
              </p>
              <p className="text-gray-400 mt-3 uppercase tracking-widest text-sm">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Imagen con parallax interno (se desplaza más lento que el texto) ───────── */
function ParallaxImage() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1])

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl shadow-2xl shadow-brand-navy/10 ring-1 ring-black/5 h-96">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y, scale }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
          alt="Equipo Sass Blum"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  )
}
