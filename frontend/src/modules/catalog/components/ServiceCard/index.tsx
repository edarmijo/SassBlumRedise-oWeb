import { ArrowRight } from 'lucide-react'
import type { ServiceSummary } from '../../interfaces/ICatalogService'
import { GlowCard } from '../../../../core/ui/GlowCard'

interface ServiceCardProps {
  service: ServiceSummary
  onSelect?: (id: string) => void
}

/** SRP: renders one service card. DIP: depends on ServiceSummary type only. */
export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(service.id)}
      className="group block h-full w-full text-left rounded-[1.2rem] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
    >
      <GlowCard accent="cyan" className="h-full">
        <div className="flex h-full flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">{service.nombre}</h3>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-muted rounded-full px-2 py-0.5 shrink-0">
              {service.categoria}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-3 flex-1">{service.descripcion}</p>
          <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-brand-cyan-dark">
            Crear ticket
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </GlowCard>
    </button>
  )
}
