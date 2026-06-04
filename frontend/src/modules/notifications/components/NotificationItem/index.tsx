import type { Notification } from '../../interfaces/types'

interface NotificationItemProps {
  notification: Notification
  onMarkRead?: (id: string) => void
}

const TIPO_ICON: Record<string, string> = {
  creacion:      '🎫',
  asignacion:    '👤',
  cambio_estado: '🔄',
  comentario:    '💬',
  reasignacion:  '↪️',
  informacion:   'ℹ️',
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'ahora'
  if (mins < 60) return `hace ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.floor(hours / 24)
  return `hace ${days} d`
}

/**
 * SRP: renders one notification row. No data fetching.
 * OCP: new tipo → add an icon entry; component logic unchanged.
 */
export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  return (
    <li
      className={`flex gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors ${
        notification.leida ? 'bg-white' : 'bg-blue-50/60'
      }`}
    >
      <span className="text-lg leading-none mt-0.5" aria-hidden>
        {TIPO_ICON[notification.tipo] ?? 'ℹ️'}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900 truncate">{notification.titulo}</p>
        <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{notification.cuerpo}</p>
        <time className="text-[11px] text-gray-400 mt-1 block">
          {relativeTime(notification.creadoEn)}
        </time>
      </div>

      {!notification.leida && (
        <button
          type="button"
          onClick={() => onMarkRead?.(notification.id)}
          className="self-start text-[11px] text-blue-600 hover:text-blue-800 hover:underline whitespace-nowrap"
          aria-label={`Marcar "${notification.titulo}" como leída`}
        >
          Marcar leída
        </button>
      )}
    </li>
  )
}
