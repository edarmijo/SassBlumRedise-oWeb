import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuthService } from '../../hooks/useAuthService'

/**
 * SRP: collects the email and requests a reset link.
 * DIP: calls IAuthService.forgotPassword via useAuthService — never the concrete class.
 * Security: shows the same generic confirmation regardless of whether the email exists.
 */
export function ForgotPasswordPage() {
  const auth = useAuthService()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await auth.forgotPassword(email)
      setMessage(res.message)
    } catch {
      // Generic message even on error — no enumeration / no leakage
      setMessage('Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.')
    } finally {
      setStatus('done')
    }
  }

  if (status === 'done') {
    return (
      <div className="max-w-sm mx-auto text-center space-y-3 py-12">
        <span className="text-4xl" aria-hidden>📧</span>
        <h1 className="text-lg font-semibold text-gray-900">Revisa tu correo</h1>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4 py-8">
      <header>
        <h1 className="text-lg font-semibold text-gray-900">Recuperar contraseña</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Ingresa tu correo y te enviaremos un enlace para restablecerla.
        </p>
      </header>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="tucorreo@ejemplo.com"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar enlace'}
      </button>
    </form>
  )
}
