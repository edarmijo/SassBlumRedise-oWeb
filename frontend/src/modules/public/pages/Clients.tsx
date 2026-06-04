import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '../../../core/ui/card'

const TESTIMONIALS = [
  { name: 'María González', company: 'Distribuidora Andina', text: 'SASS BLUM transformó nuestra infraestructura de red. El soporte es excelente y siempre responden a tiempo.' },
  { name: 'Carlos Mendoza', company: 'Clínica San Rafael', text: 'Instalaron todo nuestro sistema de CCTV y domótica. Profesionalismo de principio a fin.' },
  { name: 'Ana Vélez', company: 'Corporación Litoral', text: 'El equipo de soporte técnico es de primera. Resolvieron problemas que otros proveedores no pudieron.' },
]

const BRANDS = ['Andina', 'San Rafael', 'Litoral', 'TecnoSur', 'Global IT', 'Pacífico']

export function Clients() {
  return (
    <div className="min-h-screen">
      <div className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl mb-4 font-semibold">Clientes</motion.h1>
          <p className="text-xl text-gray-300">Empresas que confían en nosotros</p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="pt-8">
                    <Quote className="h-8 w-8 text-brand-cyan mb-4" />
                    <p className="text-gray-700 mb-6">{t.text}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-brand-cyan text-brand-cyan" />)}
                    </div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.company}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-cyan uppercase tracking-widest mb-8">Marcas que nos respaldan</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {BRANDS.map((b) => (
              <span key={b} className="text-2xl font-semibold text-gray-400">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
