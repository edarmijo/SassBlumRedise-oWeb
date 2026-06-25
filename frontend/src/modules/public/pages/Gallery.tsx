import { ImageWithFallback } from '../../../core/ui/ImageWithFallback'
import { PageHero } from '../../../core/ui/layout/PageHero'
import { FocusReveal } from '../../../core/ui/motion'

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80', label: 'Infraestructura IT', desc: 'Diseño e implementación de soluciones tecnológicas robustas y escalables.' },
  { src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=900&q=80', label: 'CCTV', desc: 'Sistemas de videovigilancia con integración Hikvision, Ubiquiti y ZKTeco.' },
  { src: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80', label: 'Domótica', desc: 'Control inteligente de oficinas y hogares desde tu computador o smartphone.' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80', label: 'Soporte Técnico', desc: 'Servicio profesional que maximiza la inversión en tus equipos.' },
  { src: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=900&q=80', label: 'Cableado Estructurado', desc: 'Redes de voz y datos bajo estándares de calidad y conectividad.' },
  { src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80', label: 'Servidores', desc: 'Importación directa de servidores escalables con virtualización y BCP.' },
]

export function Gallery() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        eyebrow="Portafolio"
        title="Galería"
        subtitle="Proyectos y soluciones que hemos implementado"
        accent="indigo"
        orbPosition="bottom-right"
      />

      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PHOTOS.map((p) => (
            <FocusReveal key={p.label}>
              <div className="group relative overflow-hidden rounded-2xl h-72 shadow-lg ring-1 ring-black/5">
                <ImageWithFallback
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Capa de degradado siempre presente */}
                <div className="absolute inset-0 bg-linear-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                {/* Título + descripción que se revela al hover */}
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-white text-xl font-medium tracking-wide">{p.label}</h3>
                  <p className="text-gray-200 text-sm mt-2 max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
                    {p.desc}
                  </p>
                </div>
              </div>
            </FocusReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
