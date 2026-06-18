import { ArrowRight } from 'lucide-react'
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
      <p className="text-sm text-muted-foreground italic">Sin historial de eventos.</p>
    )
  }

  return (
    <ol className="relative border-l-2 border-border space-y-6 ml-2">
      {events.map((event) => (
        <li key={event.id} className="ml-6">
          {/* Timeline dot */}
          <span className="absolute -left-1.75 mt-1 flex h-3 w-3 items-center justify-center rounded-full bg-brand-cyan ring-4 ring-card" />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-foreground">
                {EVENT_LABELS[event.tipoEvento] ?? event.tipoEvento}
              </span>

              {event.estadoAnterior && event.estadoNuevo && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TicketStatusBadge estado={event.estadoAnterior as TicketEstado} />
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  <TicketStatusBadge estado={event.estadoNuevo as TicketEstado} />
                </span>
              )}
            </div>

            <time className="text-xs text-muted-foreground">
              {new Date(event.creadoEn).toLocaleString('es-EC', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' · '}
              <span className="font-medium text-foreground/70">{event.autorNombre}</span>
            </time>

            {event.comentario && (
              <p className="text-sm text-foreground/90 bg-slate-50 border border-border rounded-md px-3 py-2 mt-1">
                {event.comentario}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
