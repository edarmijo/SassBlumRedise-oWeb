import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { useTicketsList } from '../../hooks/useTickets'
import { TicketValidatorChain } from '../../validators/TicketValidatorChain'
import type { TicketPrioridad } from '../../interfaces/ITicketService'

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
      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
          Asunto <span aria-hidden className="text-red-500">*</span>
        </label>
        <input
          id="asunto"
          type="text"
          maxLength={80}
          value={asunto}
          onChange={(e) => setAsunto(e.target.value)}
          aria-describedby={errors.asunto ? 'asunto-error' : undefined}
          aria-invalid={!!errors.asunto}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.asunto ? 'border-red-400 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Describe brevemente el problema"
        />
        <div className="flex justify-between mt-1">
          {errors.asunto && (
            <p id="asunto-error" role="alert" className="text-xs text-red-600">
              {errors.asunto}
            </p>
          )}
          <p className="text-xs text-gray-400 ml-auto">{asunto.length}/80</p>
        </div>
      </div>

      {/* Servicio */}
      <div>
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 mb-1">
          Servicio <span aria-hidden className="text-red-500">*</span>
        </label>
        <select
          id="servicio"
          value={servicioId}
          onChange={(e) => setServicioId(e.target.value)}
          aria-invalid={!!errors.servicioId}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.servicioId ? 'border-red-400 bg-red-50' : 'border-gray-300'
          }`}
        >
          <option value="">Selecciona un servicio...</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
        {errors.servicioId && (
          <p role="alert" className="text-xs text-red-600 mt-1">{errors.servicioId}</p>
        )}
      </div>

      {/* Prioridad */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">Prioridad</span>
        <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label="Prioridad del ticket">
          {PRIORIDADES.map((p) => (
            <label
              key={p}
              className={`flex items-center gap-1.5 cursor-pointer rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                prioridad === p
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
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
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción <span aria-hidden className="text-red-500">*</span>
        </label>
        <textarea
          id="descripcion"
          rows={5}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          aria-describedby={errors.descripcion ? 'descripcion-error' : undefined}
          aria-invalid={!!errors.descripcion}
          className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
            errors.descripcion ? 'border-red-400 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="Describe el problema con el mayor detalle posible (mínimo 10 caracteres)"
        />
        {errors.descripcion && (
          <p id="descripcion-error" role="alert" className="text-xs text-red-600 mt-1">
            {errors.descripcion}
          </p>
        )}
      </div>

      {/* File upload */}
      <div>
        <label htmlFor="adjuntos" className="block text-sm font-medium text-gray-700 mb-1">
          Adjuntos <span className="text-gray-400 text-xs">(opcional, máx. 5 MB c/u)</span>
        </label>
        <input
          id="adjuntos"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.adjuntos && (
          <p role="alert" className="text-xs text-red-600 mt-1">{errors.adjuntos}</p>
        )}
        {adjuntos.length > 0 && (
          <ul className="mt-2 space-y-1">
            {adjuntos.map((file, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                <span>📎 {file.name}</span>
                <span className="text-gray-400">({(file.size / 1024).toFixed(0)} KB)</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-red-500 hover:text-red-700 ml-auto"
                  aria-label={`Eliminar ${file.name}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* General error */}
      {errors.horario && (
        <p role="alert" className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          {errors.horario}
        </p>
      )}
      {errors.general && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errors.general}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? 'Creando ticket…' : 'Crear ticket'}
      </button>
    </form>
  )
}
