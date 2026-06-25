import { createElement, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Headphones, Wifi, Printer, Server, Camera, Home as HomeIcon, Wrench, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../core/ui/card'
import { Button } from '../../../core/ui/button'
import { Skeleton } from '../../../core/ui/skeleton'
import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../../core/ui/dialog'
import { PageHero } from '../../../core/ui/layout/PageHero'
import { EASE_APPLE } from '../../../core/ui/motion/ease'
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

/** Renderiza el icono de la categoría (componente estático, fuera del render). */
function CategoryIcon({ categoria, className }: { categoria: string; className?: string }) {
  return createElement(iconFor(categoria), { className })
}

export function Services() {
  const { services, isLoading, error } = useCatalog()
  const { user } = useAuth()
  const [selected, setSelected] = useState<(typeof services)[number] | null>(null)

  const ctaTo = user ? '/mis-tickets' : '/login'

  return (
    <div className="min-h-screen">
      <PageHero
        eyebrow="Catálogo"
        title="Servicios"
        subtitle="Soluciones tecnológicas integrales para tu empresa"
        accent="cyan"
        orbPosition="top-right"
      />

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
                const img = s.imagenUrl
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, ease: EASE_APPLE, delay: (i % 3) * 0.1 }}
                    className="group"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(s)}
                      className="block w-full text-left cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2"
                      aria-label={`Ver detalles de ${s.nombre}`}
                    >
                      <Card className="overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full">
                        {img ? (
                          <div className="h-44 overflow-hidden">
                            <ImageWithFallback src={img} alt={s.nombre} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                          </div>
                        ) : (
                          <div className="h-44 flex items-center justify-center bg-brand-navy/5">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-cyan/10 transition-transform duration-300 group-hover:scale-110">
                              <CategoryIcon categoria={s.categoria} className="h-8 w-8 text-brand-cyan" />
                            </div>
                          </div>
                        )}
                        <CardHeader>
                          <p className="text-[10px] uppercase tracking-widest text-brand-cyan">{s.categoria}</p>
                          <CardTitle>{s.nombre}</CardTitle>
                          <CardDescription className="line-clamp-2">{s.descripcion}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-cyan-dark transition-all group-hover:gap-2">
                            Ver detalles <ArrowRight className="h-4 w-4" />
                          </span>
                        </CardContent>
                      </Card>
                    </button>
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
            <Link to={ctaTo}>{user ? 'Crear ticket' : 'Registrarse ahora'}</Link>
          </Button>
        </div>
      </div>

      {/* Modal de detalle del servicio */}
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null) }}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden gap-0">
          {selected && (
            <>
              {selected.imagenUrl ? (
                <div className="h-52 overflow-hidden">
                  <ImageWithFallback src={selected.imagenUrl} alt={selected.nombre} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="h-52 flex items-center justify-center bg-brand-navy">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-cyan/10 ring-1 ring-brand-cyan/30">
                    <CategoryIcon categoria={selected.categoria} className="h-10 w-10 text-brand-cyan" />
                  </div>
                </div>
              )}
              <div className="p-6">
                <DialogHeader>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-brand-cyan-dark mb-1">{selected.categoria}</p>
                  <DialogTitle className="text-2xl">{selected.nombre}</DialogTitle>
                  <DialogDescription className="text-base text-gray-600 leading-relaxed mt-2">
                    {selected.descripcion}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-6">
                  <Button asChild size="lg" className="w-full sm:w-auto bg-brand-cyan hover:bg-brand-cyan-dark text-brand-navy font-semibold">
                    <Link to={ctaTo}>{user ? 'Solicitar servicio' : 'Inicia sesión para solicitar'}</Link>
                  </Button>
                </DialogFooter>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
