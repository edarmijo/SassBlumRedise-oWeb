import { useTicketDetail } from '../../hooks/useTickets'
import { TicketStatusBadge } from '../TicketStatusBadge'
import { TicketHistory } from '../TicketHistory'

interface TicketDetailProps {
  ticketId: string
}

/**
 * SRP: renders full detail of one ticket including history.
 * DIP: loads data via useTicketDetail which depends on ITicketClientActions (Context).
 * OCP: new section (e.g. adjuntos list) → add below the grid without touching other sections.
 */
export function TicketDetail({ ticketId }: TicketDetailProps) {
  const { ticket, isLoading, error } = useTicketDetail(ticketId)

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-20 bg-gray-200 rounded" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
        {error}
      </div>
    )
  }

  if (!ticket) return null

  return (
    <article className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-mono text-gray-400 tracking-wide">{ticket.numero}</p>
          <h2 className="text-xl font-semibold text-gray-900 mt-1 leading-snug">
            {ticket.asunto}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{ticket.servicioNombre}</p>
        </div>
        <TicketStatusBadge estado={ticket.estado} />
      </div>

      {/* Description */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
          Descripción
        </h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {ticket.descripcion}
        </p>
      </section>

      {/* Metadata grid */}
      <section className="grid grid-cols-2 gap-4 text-sm bg-gray-50 rounded-lg p-4">
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Cliente
          </span>
          <p className="mt-0.5 text-gray-900">{ticket.clienteNombre}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Asignado a
          </span>
          <p className="mt-0.5 text-gray-900">
            {ticket.asignadoNombre ?? <span className="italic text-gray-400">Sin asignar</span>}
          </p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Prioridad
          </span>
          <p className="mt-0.5 text-gray-900">{ticket.prioridad}</p>
        </div>
        <div>
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Creado
          </span>
          <p className="mt-0.5 text-gray-900">
            {new Date(ticket.creadoEn).toLocaleDateString('es-EC', {
              day: '2-digit', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
      </section>

      {/* Attachments */}
      {ticket.adjuntos.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Adjuntos ({ticket.adjuntos.length})
          </h3>
          <ul className="space-y-2">
            {ticket.adjuntos.map((att) => (
              <li key={att.id}>
                <a
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                >
                  <span>📎</span>
                  <span>{att.nombreArchivo}</span>
                  <span className="text-gray-400 text-xs">
                    ({(att.tamañoBytes / 1024).toFixed(0)} KB)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* History */}
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Historial de eventos
        </h3>
        <TicketHistory events={ticket.eventos} />
      </section>
    </article>
  )
}
