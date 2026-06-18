import { useState, useEffect, useCallback } from 'react'
import type { FormEvent } from 'react'
import { userAdminService } from '../../services/UserAdminService'
import type { AdminUser } from '../../interfaces/IUserAdminActions'
import { Button } from '../../../../core/ui/button'
import { Input } from '../../../../core/ui/input'

/**
 * SRP: admin page to list/create/block users. DIP: uses IUserAdminActions (userAdminService).
 * Admin-only (route guarded by ProtectedRoute roles).
 */
export function AdminUserPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', password: '', role: 'worker' as 'worker' | 'admin' })
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setUsers(await userAdminService.listUsers())
  }, [])

  useEffect(() => { void load() }, [load])

  const create = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await userAdminService.createUser(form)
      setForm({ nombre: '', apellido: '', email: '', password: '', role: 'worker' })
      await load()
    } catch (err: unknown) {
      const d = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setError(d ?? 'No se pudo crear el usuario.')
    }
  }

  const toggleBlock = async (u: AdminUser) => {
    if (u.estado === 'bloqueado') await userAdminService.unblockUser(u.id)
    else await userAdminService.blockUser(u.id)
    await load()
  }

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-bold text-foreground">Gestión de usuarios</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Crea trabajadores/administradores y gestiona su acceso.</p>
      </header>

      <form onSubmit={create} className="bg-card border border-border rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input placeholder="Nombre" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <Input placeholder="Apellido" required value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
        <Input type="email" placeholder="Correo" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" placeholder="Contraseña" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value as 'worker' | 'admin' })}
          className="h-9 rounded-md border border-input bg-input-background text-foreground px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50 cursor-pointer"
        >
          <option value="worker">Trabajador</option>
          <option value="admin">Administrador</option>
        </select>
        <Button type="submit" variant="brand">Crear usuario</Button>
        {error && <p role="alert" className="sm:col-span-2 text-sm text-destructive">{error}</p>}
      </form>

      <div className="border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground bg-muted/50 border-b border-border">
              <th className="py-2.5 px-4 font-semibold">Email</th>
              <th className="font-semibold">Rol</th>
              <th className="font-semibold">Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                <td className="py-2.5 px-4 text-foreground">{u.email}</td>
                <td className="capitalize text-muted-foreground">{u.rol.toLowerCase()}</td>
                <td>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    u.estado === 'bloqueado'
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
                    {u.estado}
                  </span>
                </td>
                <td className="text-right pr-4">
                  <button
                    type="button"
                    onClick={() => void toggleBlock(u)}
                    className="text-xs text-brand-cyan-dark font-medium hover:underline cursor-pointer"
                  >
                    {u.estado === 'bloqueado' ? 'Desbloquear' : 'Bloquear'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
