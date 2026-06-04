import { Badge } from '../../../core/ui/badge'
import type { TicketEstado, TicketPrioridad } from '../interfaces/ITicketService'

const ESTADO: Record<TicketEstado, { label: string; cls: string }> = {
  Nuevo: { label: 'Nuevo', cls: 'bg-blue-500 text-white' },
  EnProceso: { label: 'En Proceso', cls: 'bg-yellow-500 text-white' },
  EnEspera: { label: 'En Espera', cls: 'bg-orange-500 text-white' },
  Resuelto: { label: 'Resuelto', cls: 'bg-green-500 text-white' },
  Cerrado: { label: 'Cerrado', cls: 'bg-gray-500 text-white' },
}

const PRIORIDAD: Record<TicketPrioridad, { label: string; cls: string }> = {
  Baja: { label: 'Baja', cls: 'bg-gray-400 text-white' },
  Media: { label: 'Media', cls: 'bg-blue-500 text-white' },
  Alta: { label: 'Alta', cls: 'bg-orange-500 text-white' },
  Critica: { label: 'Crítica', cls: 'bg-red-500 text-white' },
}

export function StatusBadge({ estado }: { estado: TicketEstado }) {
  const c = ESTADO[estado] ?? { label: estado, cls: 'bg-gray-500 text-white' }
  return <Badge className={c.cls}>{c.label}</Badge>
}

export function PriorityBadge({ prioridad }: { prioridad: TicketPrioridad }) {
  const c = PRIORIDAD[prioridad] ?? { label: prioridad, cls: 'bg-gray-400 text-white' }
  return <Badge className={c.cls}>{c.label}</Badge>
}
