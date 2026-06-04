import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { NotificationServiceContext } from '../../hooks/useNotifications'
import type { NotificationPreferences as Prefs } from '../../interfaces/types'

const CHANNELS: { key: keyof Prefs; label: string; desc: string }[] = [
  { key: 'emailActivo', label: 'Email', desc: 'Recibe un correo por cada actualización.' },
  { key: 'inAppActivo', label: 'En la app', desc: 'Muestra notificaciones dentro de la plataforma.' },
  { key: 'wsActivo', label: 'Tiempo real', desc: 'Avisos instantáneos mientras usas la app.' },
]

/**
 * SRP: renders the preference toggles and persists changes.
 * DIP: uses INotificationService via Context (getPreferences / setPreferences).
 */
export function NotificationPreferences() {
  const service = useContext(NotificationServiceContext)
  const [prefs, setPrefs] = useState<Prefs | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!service) return
    let cancelled = false
    void service.getPreferences().then((p) => {
      if (!cancelled) setPrefs(p)
    })
    return () => { cancelled = true }
  }, [service])

  const toggle = async (key: keyof Prefs) => {
    if (!service || !prefs) return
    const next = { ...prefs, [key]: !prefs[key] }
    setPrefs(next)
    setSaving(true)
    try {
      await service.setPreferences({ [key]: next[key] })
    } finally {
      setSaving(false)
    }
  }

  if (!prefs) {
    return <p className="text-sm text-gray-400">Cargando preferencias…</p>
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900">Preferencias de notificación</h3>
      {CHANNELS.map(({ key, label, desc }) => (
        <label
          key={key}
          className="flex items-start justify-between gap-4 p-3 rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300"
        >
          <span>
            <span className="block text-sm font-medium text-gray-800">{label}</span>
            <span className="block text-xs text-gray-500 mt-0.5">{desc}</span>
          </span>
          <input
            type="checkbox"
            checked={prefs[key]}
            disabled={saving}
            onChange={() => void toggle(key)}
            className="mt-1 h-4 w-4 accent-blue-600 cursor-pointer"
            aria-label={label}
          />
        </label>
      ))}
    </div>
  )
}
