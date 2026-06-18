import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Paperclip, X } from 'lucide-react'
import { useTicketsList } from '../../hooks/useTickets'
import { TicketValidatorChain } from '../../validators/TicketValidatorChain'
import type { TicketPrioridad } from '../../interfaces/ITicketService'
import { Button } from '../../../../core/ui/button'
import { Input } from '../../../../core/ui/input'
import { Label } from '../../../../core/ui/label'
import { Textarea } from '../../../../core/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../../../core/ui/select'
import { Alert, AlertDescription } from '../../../../core/ui/alert'

interface ServiceOption {
  id: string
  nombre: string
}

interface CreateTicketFormProps {
  services: ServiceOption[]
  onSuccess?: (ticketId: string) => void
}

interface FormErrors {
  asunto?: string
  descripcion?: string
  servicioId?: string
  adjuntos?: string
  horario?: string
  general?: string
}

const PRIORIDADES: TicketPrioridad[] = ['Baja', 'Media', 'Alta', 'Critica']

/**
 * SRP: manages ticket creation form state and submission.
 * DIP: submits via useTicketsList (ITicketClientActions) — never calls TicketService directly.
 * OCP: new field → add to state + JSX; validation chain handles it automatically.
 */
export function CreateTicketForm({ services, onSuccess }: CreateTicketFormProps) {
  const { createTicket, isLoading } = useTicketsList()
  const validatorChain = useRef(new TicketValidatorChain())

  const [asunto, setAsunto] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [servicioId, setServicioId] = useState('')
  const [prioridad, setPrioridad] = useState<TicketPrioridad>('Media')
  const [adjuntos, setAdjuntos] = useState<File[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (): boolean => {
    const result = validatorChain.current.run({
      asunto,
      descripcion,
      adjuntos,
    })

    if (!result.isValid) {
      setErrors({ [result.field]: result.errors[0] })
      return false
    }

    if (!servicioId) {
      setErrors({ servicioId: 'Selecciona un servicio.' })
      return false
    }

    setErrors({})
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const ticket = await createTicket({ asunto, descripcion, servicioId, prioridad, adjuntos })
      onSuccess?.(ticket.id)
      // Reset form on success
      setAsunto('')
      setDescripcion('')
      setServicioId('')
      setPrioridad('Media')
      setAdjuntos([])
      setErrors({})
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Error al crear el ticket.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setAdjuntos(files)
  }

  const removeFile = (index: number) => {
    setAdjuntos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Asunto */}
      <div className="space-y-2">
        <Label htmlFor="asunto">
          Asunto <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Input
          id="asunto"
          type="text"
          maxLength={80}
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          aria-describedby={errors.asunto ? 'asunto-error' : undefined}
          aria-invalid={!!errors.asunto}
          placeholder="Describe brevemente el problema"
        />
        <div className="flex justify-between">
          {errors.asunto && (
            <p id="asunto-error" role="alert" className="text-xs text-destructive">
              {errors.asunto}
            </p>
          )}
          <p className="text-xs text-muted-foreground ml-auto tabular-nums">{asunto.length}/80</p>
        </div>
      </div>

      {/* Servicio */}
      <div className="space-y-2">
        <Label htmlFor="servicio">
          Servicio <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Select value={servicioId} onValueChange={setServicioId}>
          <SelectTrigger
            id="servicio"
            aria-invalid={!!errors.servicioId}
            className="w-full aria-invalid:border-destructive"
          >
            <SelectValue placeholder="Selecciona un servicio…" />
          </SelectTrigger>
          <SelectContent>
            {services.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.nombre}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.servicioId && (
          <p role="alert" className="text-xs text-destructive">{errors.servicioId}</p>
        )}
      </div>

      {/* Prioridad */}
      <div className="space-y-2">
        <span className="block text-sm font-medium">Prioridad</span>
        <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Prioridad del ticket">
          {PRIORIDADES.map((p) => (
            <label
              key={p}
              className={`flex items-center gap-1.5 cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium border transition-colors ${
                prioridad === p
                  ? 'bg-brand-navy text-white border-brand-navy'
                  : 'bg-card text-muted-foreground border-border hover:border-brand-cyan-dark hover:text-foreground'
              }`}
            >
              <input
                type="radio"
                name="prioridad"
                value={p}
                checked={prioridad === p}
                onChange={() => setPrioridad(p)}
                className="sr-only"
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor="descripcion">
          Descripción <span aria-hidden className="text-destructive">*</span>
        </Label>
        <Textarea
          id="descripcion"
          rows={5}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          aria-describedby={errors.descripcion ? 'descripcion-error' : undefined}
          aria-invalid={!!errors.descripcion}
          className="resize-none"
          placeholder="Describe el problema con el mayor detalle posible (mínimo 10 caracteres)"
        />
        {errors.descripcion && (
          <p id="descripcion-error" role="alert" className="text-xs text-destructive">
            {errors.descripcion}
          </p>
        )}
      </div>

      {/* File upload */}
      <div className="space-y-2">
        <Label htmlFor="adjuntos">
          Adjuntos <span className="text-muted-foreground text-xs font-normal">(opcional, máx. 5 MB c/u)</span>
        </Label>
        <input
          id="adjuntos"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
          onChange={handleFileChange}
          className="block w-full text-sm text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-slate-100 file:text-foreground hover:file:bg-slate-200 file:cursor-pointer cursor-pointer"
        />
        {errors.adjuntos && (
          <p role="alert" className="text-xs text-destructive">{errors.adjuntos}</p>
        )}
        {adjuntos.length > 0 && (
          <ul className="mt-1 space-y-1">
            {adjuntos.map((file, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground bg-slate-50 border border-border rounded-md px-2.5 py-1.5">
                <Paperclip className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate text-foreground">{file.name}</span>
                <span className="text-muted-foreground shrink-0">({(file.size / 1024).toFixed(0)} KB)</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="ml-auto shrink-0 text-muted-foreground hover:text-destructive cursor-pointer"
                  aria-label={`Eliminar ${file.name}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* General error */}
      {errors.horario && (
        <Alert className="border-amber-200 bg-amber-50 text-amber-800">
          <AlertDescription className="text-amber-800">{errors.horario}</AlertDescription>
        </Alert>
      )}
      {errors.general && (
        <Alert variant="destructive">
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      {/* Submit */}
      <Button type="submit" variant="brand" size="lg" disabled={isSubmitting || isLoading} className="w-full">
        {isSubmitting ? 'Creando ticket…' : 'Crear ticket'}
      </Button>
    </form>
  )
}
