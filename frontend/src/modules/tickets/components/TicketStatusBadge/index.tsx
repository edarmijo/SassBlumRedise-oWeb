import type { TicketEstado } from '../../interfaces/ITicketService'

interface StatusConfig {
  label: string
  className: string
}

const STATUS_CONFIG: Record<TicketEstado, StatusConfig> = {
  Nuevo:     { label: 'Nuevo',      className: 'bg-blue-100 text-blue-800 border-blue-200' },
  EnProceso: { label: 'En Proceso', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  EnEspera:  { label: 'En Espera',  className: 'bg-orange-100 text-orange-800 border-orange-200' },
  Resuelto:  { label: 'Resuelto',   className: 'bg-green-100 text-green-800 border-green-200' },
  Cerrado:   { label: 'Cerrado',    className: 'bg-gray-100 text-gray-600 border-gray-200' },
}

interface TicketStatusBadgeProps {
  estado: TicketEstado
}

/**
 * SRP: renders a colored badge for a ticket state.
 * DIP: reads color config from STATUS_CONFIG — TicketStateMachine.TRANSITIONS
 *      can be cross-referenced here in Sprint 4 without modifying this component.
 * OCP: new state → new entry in STATUS_CONFIG; component unchanged.
 */
export function TicketStatusBadge({ estado }: TicketStatusBadgeProps) {
  const config = STATUS_CONFIG[estado] ?? {
    label: estado,
    className: 'bg-gray-100 text-gray-600 border-gray-200',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
      aria-label={`Estado: ${config.label}`}
    >
      {config.label}
    </span>
  )
}
