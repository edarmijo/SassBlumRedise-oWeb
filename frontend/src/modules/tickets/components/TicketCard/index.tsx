import type { TicketSummary } from '../../interfaces/ITicketService'
import { TicketStatusBadge } from '../TicketStatusBadge'

const PRIORITY_CLASSES: Record<string, string> = {
  Critica: 'text-red-600 font-semibold',
  Alta:    'text-orange-600 font-medium',
  Media:   'text-yellow-600',
  Baja:    'text-green-600',
}

interface TicketCardProps {
  ticket: TicketSummary
  onSelect?: (id: string) => void
}

/**
 * SRP: renders a summary card for one ticket. No data fetching.
 * DIP: depends on TicketSummary type (from ITicketService), not on any concrete service.
 * OCP: new display field → extend TicketSummary + update this template; no structural change.
 */
export function TicketCard({ ticket, onSelect }: TicketCardProps) {
  const handleClick = () => onSelect?.(ticket.id)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect?.(ticket.id)
    }
  }

  return (
    <article
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Ticket ${ticket.numero}: ${ticket.asunto}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-mono text-gray-400 tracking-wide">
            {ticket.numero}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 truncate mt-0.5 leading-snug">
            {ticket.asunto}
          </h3>
          <p className="text-xs text-gray-500 mt-1 truncate">{ticket.servicioNombre}</p>
        </div>
        <TicketStatusBadge estado={ticket.estado} />
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <time className="text-xs text-gray-400">
          {new Date(ticket.creadoEn).toLocaleDateString('es-EC', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </time>
        <span className={`text-xs ${PRIORITY_CLASSES[ticket.prioridad] ?? 'text-gray-500'}`}>
          ▲ {ticket.prioridad}
        </span>
      </div>
    </article>
  )
}
