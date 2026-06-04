import { useState } from 'react'
import { useNotifications } from '../../hooks/useNotifications'
import { NotificationPanel } from '../NotificationPanel'

/**
 * SRP: renders the bell icon + unread badge and toggles the panel.
 * DIP: reads unreadCount from useNotifications (INotificationService via Context).
 * Observer (FE): the badge updates live because useNotifications subscribes to SocketClient.
 */
export function NotificationBell() {
  const { unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Notificaciones${unreadCount > 0 ? ` (${unreadCount} sin leer)` : ''}`}
        aria-expanded={open}
      >
        <span className="text-xl" aria-hidden>🔔</span>
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full"
            aria-hidden
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && <NotificationPanel onClose={() => setOpen(false)} />}
    </div>
  )
}
