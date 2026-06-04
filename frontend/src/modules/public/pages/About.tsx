import { motion } from 'framer-motion'
import { Target, Eye, Award, Users } from 'lucide-react'
import { Card, CardContent } from '../../../core/ui/card'
import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'

const VALUES = [
  { icon: Target, title: 'Misión', text: 'Brindar soluciones tecnológicas integrales que impulsen la competitividad de nuestros clientes.' },
  { icon: Eye, title: 'Visión', text: 'Ser el aliado tecnológico líder en Ecuador, reconocido por su innovación y servicio.' },
  { icon: Award, title: 'Calidad', text: 'Más de 20 años entregando proyectos con los más altos estándares del mercado.' },
  { icon: Users, title: 'Equipo', text: 'Profesionales certificados comprometidos con el éxito de cada proyecto.' },
]

export function About() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl mb-4 font-semibold">Nosotros</motion.h1>
          <p className="text-xl text-gray-300">La conexión perfecta entre tu empresa y la tecnología</p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <ImageWithFallback src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1080&q=80" alt="Equipo" className="rounded-xl shadow-lg w-full h-96 object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-brand-cyan uppercase mb-2 tracking-widest">Quiénes somos</p>
            <h2 className="text-3xl md:text-4xl mb-4 font-semibold">20+ años de experiencia en tecnología</h2>
            <p className="text-gray-700 mb-4">
              SASS BLUM es una firma de soluciones y servicios tecnológicos ubicada en Guayaquil, Ecuador. Actuamos como
              integradores de tecnología, la conexión perfecta entre los ejecutivos y sus distintos proveedores.
            </p>
            <p className="text-gray-700">
              Acompañamos a empresas e industrias en infraestructura IT, soporte técnico, cableado estructurado, CCTV,
              domótica y mucho más, con un enfoque personalizado y centrado en el cliente.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Card className="h-full text-center">
                  <CardContent className="pt-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brand-cyan/10 mb-4">
                      <v.icon className="h-7 w-7 text-brand-cyan" />
                    </div>
                    <h3 className="text-lg mb-2 font-medium">{v.title}</h3>
                    <p className="text-sm text-gray-600">{v.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
