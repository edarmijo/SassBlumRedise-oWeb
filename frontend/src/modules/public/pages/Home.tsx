import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '../../../core/ui/button'
import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'

const GRID_BG =
  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300d4ff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const HIGHLIGHTS = [
  { title: 'Infraestructura IT', desc: 'Diseño e implementación de soluciones tecnológicas robustas', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=80' },
  { title: 'CCTV', desc: 'Sistemas de videovigilancia y seguridad avanzados', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1080&q=80' },
  { title: 'Domótica', desc: 'Automatización inteligente para espacios modernos', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1080&q=80' },
]

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 animate-brand-gradient" style={{ backgroundImage: GRID_BG }} />
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center">
            <p className="text-brand-cyan mb-4 uppercase tracking-[0.3em]">SASS BLUM</p>
            <h1 className="text-4xl md:text-6xl mb-6 max-w-4xl mx-auto font-semibold leading-tight">
              Innovación tecnológica para tu negocio
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Soluciones integrales en tecnología con más de 20 años de experiencia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-cyan hover:bg-brand-cyan-dark text-brand-navy font-semibold">
                <Link to="/servicios">Nuestros Servicios <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy bg-transparent">
                <Link to="/nosotros">Conocer más</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ChevronDown className="h-8 w-8 text-brand-cyan" />
          </motion.div>
        </div>
      </div>

      {/* Áreas de experiencia */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-brand-cyan uppercase mb-2 tracking-widest">Servicios</p>
            <h2 className="text-3xl md:text-4xl text-gray-900 font-semibold">Áreas de experiencia</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
              >
                <Link to="/servicios" className="group block">
                  <div className="relative overflow-hidden rounded-xl mb-4 h-64 shadow-md">
                    <ImageWithFallback src={h.img} alt={h.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
                  </div>
                  <h3 className="text-xl mb-2 font-medium">{h.title}</h3>
                  <p className="text-gray-600">{h.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sobre nosotros preview */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <ImageWithFallback src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1080&q=80" alt="Equipo Sass Blum" className="rounded-xl shadow-lg w-full h-80 object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <p className="text-brand-cyan uppercase mb-2 tracking-widest">Acerca de nosotros</p>
              <h2 className="text-3xl md:text-4xl mb-4 font-semibold">20+ Años de experiencia</h2>
              <p className="text-lg text-gray-600 mb-4">En innovación tecnológica</p>
              <p className="text-gray-700 mb-6">
                SASS BLUM se especializa en soluciones IT integrales, ofreciendo servicios innovadores a empresas e
                industrias, liderando proyectos y venta de servicios para distintos proveedores de tecnología.
              </p>
              <Button asChild className="bg-brand-cyan hover:bg-brand-cyan-dark text-brand-navy font-semibold">
                <Link to="/nosotros">Conocer más</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4 font-semibold">¿Necesitas ayuda con un proyecto?</h2>
          <p className="text-gray-300 mb-8">Nuestro equipo está listo para ayudarte con soluciones tecnológicas personalizadas</p>
          <Button asChild size="lg" className="bg-brand-cyan hover:bg-brand-cyan-dark text-brand-navy font-semibold">
            <Link to="/login">Crear un ticket</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
