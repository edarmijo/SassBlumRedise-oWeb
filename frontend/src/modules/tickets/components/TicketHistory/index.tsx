import type { TicketEvent } from '../../interfaces/ITicketService'
import { TicketStatusBadge } from '../TicketStatusBadge'
import type { TicketEstado } from '../../interfaces/ITicketService'

interface TicketHistoryProps {
  events: TicketEvent[]
}

const EVENT_LABELS: Record<string, string> = {
  creacion:      'Ticket creado',
  cambio_estado: 'Cambio de estado',
  comentario:    'Comentario',
  asignacion:    'Asignación',
  reasignacion:  'Reasignación',
}

/**
 * SRP: renders a timeline of TicketEvent records. No data fetching.
 * Receives events as props — TicketDetail is responsible for loading them.
 */
export function TicketHistory({ events }: TicketHistoryProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">Sin historial de eventos.</p>
    )
  }

  return (
    <ol className="relative border-l-2 border-gray-200 space-y-6 ml-2">
      {events.map((event) => (
        <li key={event.id} className="ml-6">
          {/* Timeline dot */}
          <span className="absolute -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-white border-2 border-gray-300" />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-700">
                {EVENT_LABELS[event.tipoEvento] ?? event.tipoEvento}
              </span>

              {event.estadoAnterior && event.estadoNuevo && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <TicketStatusBadge estado={event.estadoAnterior as TicketEstado} />
                  <span aria-hidden>→</span>
                  <TicketStatusBadge estado={event.estadoNuevo as TicketEstado} />
                </span>
              )}
            </div>

            <time className="text-xs text-gray-400">
              {new Date(event.creadoEn).toLocaleString('es-EC', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' · '}
              <span className="font-medium">{event.autorNombre}</span>
            </time>

            {event.comentario && (
              <p className="text-sm text-gray-700 bg-gray-50 rounded-md px-3 py-2 mt-1">
                {event.comentario}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
