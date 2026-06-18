import { useState, useEffect } from 'react'
import { ticketAdminService } from '../../services/TicketAdminService'
import { userAdminService } from '../../../auth/services/UserAdminService'
import type { AdminUser } from '../../../auth/interfaces/IUserAdminActions'
import { Button } from '../../../../core/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../../../core/ui/select'
import { Alert, AlertDescription } from '../../../../core/ui/alert'

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

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
    <div
      className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in-up"
      role="dialog"
      aria-modal="true"
      aria-label="Asignar ticket"
      onClick={onClose}
    >
      <div
        className="bg-card border border-border rounded-xl shadow-xl w-full max-w-sm p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="text-base font-semibold text-foreground">Asignar ticket</h3>
          <p className="text-sm text-muted-foreground mt-0.5">Selecciona un trabajador activo.</p>
        </div>

        <Select value={workerId} onValueChange={setWorkerId}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona un trabajador…" />
          </SelectTrigger>
          <SelectContent>
            {workers.map((w) => <SelectItem key={w.id} value={w.id}>{w.email}</SelectItem>)}
          </SelectContent>
        </Select>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button type="button" variant="brand" disabled={!workerId || busy} onClick={() => void assign()}>
            {busy ? 'Asignando…' : 'Asignar'}
          </Button>
        </div>
      </div>
    </div>
  )
}
