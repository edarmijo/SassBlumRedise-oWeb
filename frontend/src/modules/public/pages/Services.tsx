import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Headphones, Wifi, Printer, Server, Camera, Home as HomeIcon, Wrench } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../core/ui/card'
import { Button } from '../../../core/ui/button'
import { Skeleton } from '../../../core/ui/skeleton'
import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'
import { useCatalog } from '../../catalog/hooks/useCatalog'
import { useAuth } from '../../auth/hooks/useAuth'

const CATEGORY_ICON: Record<string, typeof Wrench> = {
  soporte: Headphones,
  'wi-fi': Wifi,
  wifi: Wifi,
  redes: Wifi,
  impresoras: Printer,
  infraestructura: Server,
  servidores: Server,
  cctv: Camera,
  seguridad: Camera,
  domotica: HomeIcon,
  'domótica': HomeIcon,
}

function iconFor(categoria: string) {
  const key = categoria?.toLowerCase().trim()
  return CATEGORY_ICON[key] ?? Wrench
}

export function Services() {
  const { services, isLoading, error } = useCatalog()
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      <div className="bg-brand-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl mb-4 font-semibold">
            Servicios
          </motion.h1>
          <p className="text-xl text-gray-300">Soluciones tecnológicas integrales para tu empresa</p>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && <p className="text-center text-red-600 mb-8">{error}</p>}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
            </div>
          ) : services.length === 0 ? (
            <p className="text-center text-gray-500">Aún no hay servicios publicados en el catálogo.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s, i) => {
                const Icon = iconFor(s.categoria)
                const img = s.imagenUrl
                return (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }}>
                    <Card className="overflow-hidden hover:shadow-xl transition-shadow h-full">
                      {img ? (
                        <div className="h-44 overflow-hidden">
                          <ImageWithFallback src={img} alt={s.nombre} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : (
                        <div className="h-44 flex items-center justify-center bg-brand-navy/5">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-cyan/10">
                            <Icon className="h-8 w-8 text-brand-cyan" />
                          </div>
                        </div>
                      )}
                      <CardHeader>
                        <p className="text-[10px] uppercase tracking-widest text-brand-cyan">{s.categoria}</p>
                        <CardTitle>{s.nombre}</CardTitle>
                        <CardDescription className="line-clamp-3">{s.descripcion}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button asChild variant="outline" size="sm" className="w-full border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-brand-navy">
                          <Link to={user ? '/mis-tickets' : '/login'}>Solicitar servicio</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4 font-semibold">¿Necesitas alguno de estos servicios?</h2>
          <p className="text-gray-600 mb-8">
            {user ? 'Crea un ticket y nuestro equipo te contactará pronto' : 'Regístrate para crear un ticket y nuestro equipo te contactará pronto'}
          </p>
          <Button asChild size="lg" className="bg-brand-cyan hover:bg-brand-cyan-dark text-brand-navy font-semibold">
            <Link to={user ? '/mis-tickets' : '/login'}>{user ? 'Crear ticket' : 'Registrarse ahora'}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
