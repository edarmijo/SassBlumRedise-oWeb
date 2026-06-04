import { useState, useEffect } from 'react'
import { ticketAdminService } from '../../services/TicketAdminService'
import { userAdminService } from '../../../auth/services/UserAdminService'
import type { AdminUser } from '../../../auth/interfaces/IUserAdminActions'

interface AssignModalProps {
  ticketId: string
  onClose: () => void
  onAssigned?: () => void
}

/**
 * SRP: lets an admin pick an active worker and assign a ticket.
 * DIP: ITicketAdminActions (assign) + IUserAdminActions (worker list).
 */
export function AssignModal({ ticketId, onClose, onAssigned }: AssignModalProps) {
  const [workers, setWorkers] = useState<AdminUser[]>([])
  const [workerId, setWorkerId] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void userAdminService.listUsers({ role: 'worker', estado: 'activo' }).then(setWorkers)
  }, [])

  const assign = async () => {
    if (!workerId) return
    setBusy(true)
    setError(null)
    try {
      await ticketAdminService.assignTicket(ticketId, workerId)
      onAssigned?.()
      onClose()
    } catch (err: unknown) {
      const d = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setError(d ?? 'No se pudo asignar.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4" role="dialog" aria-label="Asignar ticket">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">Asignar ticket a un trabajador</h3>
        <select value={workerId} onChange={(e) => setWorkerId(e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="">Selecciona…</option>
          {workers.map((w) => <option key={w.id} value={w.id}>{w.email}</option>)}
        </select>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-sm text-gray-500 px-3 py-1.5">Cancelar</button>
          <button type="button" disabled={!workerId || busy} onClick={() => void assign()} className="rounded-lg bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 hover:bg-blue-700 disabled:opacity-50">
            {busy ? 'Asignando…' : 'Asignar'}
          </button>
        </div>
      </div>
    </div>
  )
}
