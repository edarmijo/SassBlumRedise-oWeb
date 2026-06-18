import { ArrowRight } from 'lucide-react'
import type { ServiceSummary } from '../../interfaces/ICatalogService'

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
      className="group text-left bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-slate-300 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-foreground">{service.nombre}</h3>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-muted rounded-full px-2 py-0.5 shrink-0">
          {service.categoria}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{service.descripcion}</p>
      <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-brand-cyan-dark">
        Crear ticket
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </button>
  )
}
