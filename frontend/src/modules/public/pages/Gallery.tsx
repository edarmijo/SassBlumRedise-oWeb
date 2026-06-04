import { motion } from 'framer-motion'
import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80', label: 'Infraestructura IT' },
  { src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80', label: 'CCTV' },
  { src: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80', label: 'Domótica' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80', label: 'Soporte Técnico' },
  { src: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80', label: 'Redes Wi-Fi' },
  { src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', label: 'Servidores' },
]

export function Gallery() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl mb-4 font-semibold">Galería</motion.h1>
          <p className="text-xl text-gray-300">Proyectos y soluciones que hemos implementado</p>
        </div>
      </div>
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-xl h-64 shadow-md"
            >
              <ImageWithFallback src={p.src} alt={p.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-medium tracking-wide">{p.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
