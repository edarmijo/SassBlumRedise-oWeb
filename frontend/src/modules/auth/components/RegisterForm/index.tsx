import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { EmailValidator } from '../../validators/EmailValidator'
import { PasswordValidator } from '../../validators/PasswordValidator'
import { apiError } from '../../../../infrastructure/http/apiError'
import { Button } from '../../../../core/ui/button'
import { Input } from '../../../../core/ui/input'
import { Label } from '../../../../core/ui/label'
import { Alert, AlertDescription } from '../../../../core/ui/alert'

interface RegisterFormProps {
  onSuccess?: (message: string) => void
}

/**
 * SRP: captures registration input, runs the FE validator chain, submits via useAuth.
 * Chain of Responsibility: EmailValidator → PasswordValidator before the API call.
 */
export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register } = useAuth()
  const [form, setForm] = useState({
    nombre: '', apellido: '', email: '', password: '', confirmPassword: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = (): string | null => {
    const email = new EmailValidator()
    email.addValidator(new PasswordValidator())
    const result = email.run(form)
    if (!result.isValid) return result.errors[0]
    if (form.password !== form.confirmPassword) return 'Las contraseñas no coinciden.'
    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError(null)
    setLoading(true)
    try {
      const res = await register(form)
      onSuccess?.(res.message)
    } catch (err: unknown) {
      setError(apiError(err, 'No se pudo crear la cuenta.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" required value={form.nombre} onChange={set('nombre')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apellido">Apellido</Label>
          <Input id="apellido" required value={form.apellido} onChange={set('apellido')} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">Correo electrónico</Label>
        <Input id="reg-email" type="email" required value={form.email} onChange={set('email')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-password">Contraseña</Label>
        <Input id="reg-password" type="password" required value={form.password} onChange={set('password')} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-confirm">Confirmar contraseña</Label>
        <Input id="reg-confirm" type="password" required value={form.confirmPassword} onChange={set('confirmPassword')} />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button type="submit" disabled={loading} className="w-full bg-brand-cyan hover:bg-brand-cyan-dark text-brand-navy font-semibold">
        {loading ? 'Creando…' : 'Crear cuenta'}
      </Button>
    </form>
  )
}
