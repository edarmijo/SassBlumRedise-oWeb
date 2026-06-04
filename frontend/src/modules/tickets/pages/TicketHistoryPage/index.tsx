import { useState } from 'react'
import { useTicketsList } from '../../hooks/useTickets'
import { TicketCard } from '../../components/TicketCard'
import type { TicketEstado, TicketPrioridad, TicketFilterOptions } from '../../interfaces/ITicketService'

const ESTADOS: TicketEstado[] = ['Nuevo', 'EnProceso', 'EnEspera', 'Resuelto', 'Cerrado']
const PRIORIDADES: TicketPrioridad[] = ['Baja', 'Media', 'Alta', 'Critica']

interface TicketHistoryPageProps {
  onSelectTicket?: (id: string) => void
}

/**
 * SRP: lists the user's tickets with filters. Reuses TicketCard (S17).
 * DIP: data via useTicketsList (ITicketClientActions through Context).
 * OCP: new filter → add a control + a key in TicketFilterOptions; list logic unchanged.
 */
export function TicketHistoryPage({ onSelectTicket }: TicketHistoryPageProps) {
  const [filters, setFilters] = useState<TicketFilterOptions>({})
  const { tickets, isLoading, error } = useTicketsList(filters)

  const setFilter = (key: keyof TicketFilterOptions, value: string) => {
    setFilters((prev) => {
      const next = { ...prev }
      if (value) next[key] = value as never
      else delete next[key]
      return next
    })
  }

  return (
    <section className="space-y-5">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">Historial de tickets</h1>
        <p className="text-sm text-gray-500 mt-0.5">Consulta y filtra tus solicitudes.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select
          aria-label="Filtrar por estado"
          onChange={(e) => setFilter('estado', e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>

        <select
          aria-label="Filtrar por prioridad"
          onChange={(e) => setFilter('prioridad', e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las prioridades</option>
          {PRIORIDADES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* List */}
      {isLoading && <p className="text-sm text-gray-400">Cargando tickets…</p>}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      {!isLoading && !error && tickets.length === 0 && (
        <p className="text-sm text-gray-400 py-8 text-center">No hay tickets que coincidan.</p>
      )}
      {!isLoading && !error && tickets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} onSelect={onSelectTicket} />
          ))}
        </div>
      )}
    </section>
  )
}
