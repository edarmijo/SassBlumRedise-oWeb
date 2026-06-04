import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuthService } from '../../hooks/useAuthService'

interface ResetPasswordPageProps {
  /** Token from the email link (?token=...). The app router extracts and passes it. */
  token: string
  onSuccess?: () => void
}

/**
 * SRP: collects + validates a new password and submits the reset.
 * DIP: calls IAuthService.resetPassword via useAuthService.
 * Validation: minimum length + match (the S5 PasswordValidator chain plugs in here later).
 */
export function ResetPasswordPage({ token, onSuccess }: ResetPasswordPageProps) {
  const auth = useAuthService()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const validate = (): string | null => {
    if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
    if (password !== confirm) return 'Las contraseñas no coinciden.'
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    setError(null)
    setLoading(true)
    try {
      await auth.resetPassword(token, password, confirm)
      setDone(true)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo restablecer la contraseña.')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto text-center space-y-3 py-12">
        <span className="text-4xl" aria-hidden>✅</span>
        <h1 className="text-lg font-semibold text-gray-900">Contraseña actualizada</h1>
        <p className="text-sm text-gray-600">Ya puedes iniciar sesión con tu nueva contraseña.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-sm mx-auto space-y-4 py-8">
      <header>
        <h1 className="text-lg font-semibold text-gray-900">Nueva contraseña</h1>
        <p className="text-sm text-gray-500 mt-0.5">Define una contraseña segura para tu cuenta.</p>
      </header>

      <div>
        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
          Nueva contraseña
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mínimo 8 caracteres"
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar contraseña
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Guardando…' : 'Restablecer contraseña'}
      </button>
    </form>
  )
}
