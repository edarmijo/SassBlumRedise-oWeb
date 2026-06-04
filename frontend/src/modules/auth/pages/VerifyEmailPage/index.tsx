import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuthService } from '../../hooks/useAuthService'
import { apiError } from '../../../../infrastructure/http/apiError'

interface VerifyEmailPageProps {
  token: string
}

/**
 * SRP: confirms an email using the token from the verification link (?token=...).
 * DIP: calls IAuthService.verifyEmail via useAuthService. Runs once on mount.
 */
export function VerifyEmailPage({ token }: VerifyEmailPageProps) {
  const auth = useAuthService()
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    if (!token) {
      setStatus('error')
      setMessage('Falta el token de verificación en el enlace.')
      return
    }
    void auth
      .verifyEmail(token)
      .then((res) => { setStatus('ok'); setMessage(res.message) })
      .catch((err) => { setStatus('error'); setMessage(apiError(err, 'No se pudo verificar el correo.')) })
  }, [auth, token])

  return (
    <div className="max-w-sm mx-auto text-center space-y-3 py-12">
      {status === 'loading' && <p className="text-sm text-gray-500">Verificando tu correo…</p>}
      {status === 'ok' && (
        <>
          <span className="text-4xl" aria-hidden>✅</span>
          <h1 className="text-lg font-semibold text-gray-900">Correo verificado</h1>
          <p className="text-sm text-gray-600">{message}</p>
          <Link to="/login" className="inline-block text-sm text-blue-600 hover:underline">Iniciar sesión</Link>
        </>
      )}
      {status === 'error' && (
        <>
          <span className="text-4xl" aria-hidden>⚠️</span>
          <h1 className="text-lg font-semibold text-gray-900">No se pudo verificar</h1>
          <p className="text-sm text-red-600">{message}</p>
          <Link to="/login" className="inline-block text-sm text-blue-600 hover:underline">Volver a iniciar sesión</Link>
        </>
      )}
    </div>
  )
}
