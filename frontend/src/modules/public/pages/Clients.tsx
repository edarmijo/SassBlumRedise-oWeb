import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '../../../core/ui/card'
import { LogoMarquee, type Brand } from '../../../core/ui/LogoMarquee'
import { PageHero } from '../../../core/ui/layout/PageHero'
import { Reveal, FocusReveal } from '../../../core/ui/motion'

const TESTIMONIALS = [
  { name: 'María González', company: 'Distribuidora Andina', text: 'SASS BLUM transformó nuestra infraestructura de red. El soporte es excelente y siempre responden a tiempo.' },
  { name: 'Carlos Mendoza', company: 'Clínica San Rafael', text: 'Instalaron todo nuestro sistema de CCTV y domótica. Profesionalismo de principio a fin.' },
  { name: 'Ana Vélez', company: 'Corporación Litoral', text: 'El equipo de soporte técnico es de primera. Resolvieron problemas que otros proveedores no pudieron.' },
]

/** Marcas autorizadas que SASS BLUM integra (CCTV, redes, control de acceso). */
const PARTNERS: Brand[] = [
  { name: 'Hikvision', domain: 'hikvision.com' },
  { name: 'Ubiquiti', domain: 'ui.com' },
  { name: 'Grandstream', domain: 'grandstream.com' },
  { name: 'ZKTeco', domain: 'zkteco.com' },
]

export function Clients() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        eyebrow="Confianza"
        title="Clientes"
        subtitle="Empresas e industrias que confían en nosotros"
        accent="cyan"
        orbPosition="top-right"
      />

      {/* Testimonios */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-brand-cyan-dark uppercase mb-3 tracking-[0.3em] text-sm">Testimonios</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900">
              Lo que dicen nuestros clientes
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <FocusReveal key={t.name}>
                <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <CardContent className="pt-8">
                    <Quote className="h-9 w-9 text-brand-cyan/30 mb-4" />
                    <p className="text-gray-700 mb-6 leading-relaxed">{t.text}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-brand-cyan text-brand-cyan" />
                      ))}
                    </div>
                    <p className="font-medium text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.company}</p>
                  </CardContent>
                </Card>
              </FocusReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel de marcas / aliados — auto-scroll infinito */}
      <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-brand-cyan-dark uppercase tracking-[0.3em] mb-3 text-sm">Aliados tecnológicos</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
              Marcas que integramos
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Somos integradores autorizados de las marcas líderes en seguridad, redes y control de acceso.
            </p>
          </Reveal>
        </div>
        <LogoMarquee brands={PARTNERS} durationSec={28} />
      </section>
    </div>
  )
}
