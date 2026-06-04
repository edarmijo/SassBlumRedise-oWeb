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
      className="text-left bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-gray-900">{service.nombre}</h3>
        <span className="text-[10px] uppercase tracking-wide text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">
          {service.categoria}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2 line-clamp-3">{service.descripcion}</p>
      <span className="inline-block mt-3 text-xs font-medium text-blue-600">Crear ticket →</span>
    </button>
  )
}
