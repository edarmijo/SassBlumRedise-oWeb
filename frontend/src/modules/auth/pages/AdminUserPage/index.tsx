import { useState, useEffect, useCallback } from 'react'
import type { FormEvent } from 'react'
import { userAdminService } from '../../services/UserAdminService'
import type { AdminUser } from '../../interfaces/IUserAdminActions'

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
        <h1 className="text-xl font-semibold text-gray-900">Gestión de usuarios</h1>
        <p className="text-sm text-gray-500 mt-0.5">Crea trabajadores/administradores y gestiona su acceso.</p>
      </header>

      <form onSubmit={create} className="bg-white border border-gray-200 rounded-xl p-4 grid grid-cols-2 gap-3">
        <input placeholder="Nombre" required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <input placeholder="Apellido" required value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <input type="email" placeholder="Correo" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <input type="password" placeholder="Contraseña" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'worker' | 'admin' })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="worker">Trabajador</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" className="rounded-lg bg-blue-600 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-700">Crear usuario</button>
        {error && <p role="alert" className="col-span-2 text-sm text-red-600">{error}</p>}
      </form>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wide text-gray-500 border-b border-gray-200">
            <th className="py-2">Email</th><th>Rol</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b border-gray-100">
              <td className="py-2">{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <span className={u.estado === 'bloqueado' ? 'text-red-600' : 'text-green-600'}>{u.estado}</span>
              </td>
              <td className="text-right">
                <button type="button" onClick={() => void toggleBlock(u)} className="text-xs text-blue-600 hover:underline">
                  {u.estado === 'bloqueado' ? 'Desbloquear' : 'Bloquear'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
