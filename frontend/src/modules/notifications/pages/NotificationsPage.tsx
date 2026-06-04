import { Bell, CheckCheck, Circle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../core/ui/card'
import { Button } from '../../../core/ui/button'
import { Badge } from '../../../core/ui/badge'
import { Skeleton } from '../../../core/ui/skeleton'
import { useNotifications } from '../hooks/useNotifications'

export function NotificationsPage() {
  const { notifications, unreadCount, isLoading, error, markAsRead, markAllAsRead } = useNotifications()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2 font-semibold flex items-center gap-2">
              <Bell className="h-7 w-7 text-brand-cyan" /> Notificaciones
            </h1>
            <p className="text-gray-600">{unreadCount > 0 ? `Tienes ${unreadCount} sin leer` : 'Estás al día'}</p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => void markAllAsRead()}>
              <CheckCheck className="h-4 w-4 mr-2" /> Marcar todas
            </Button>
          )}
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {isLoading ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-xl" />)}</div>
        ) : notifications.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              No tienes notificaciones todavía.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((n) => (
              <Card key={n.id} className={n.leida ? '' : 'border-brand-cyan/50 bg-brand-cyan/5'}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      {!n.leida && <Circle className="h-2.5 w-2.5 mt-1.5 fill-brand-cyan text-brand-cyan flex-shrink-0" />}
                      <div>
                        <CardTitle className="text-base">{n.titulo}</CardTitle>
                        <CardDescription>{new Date(n.creadoEn).toLocaleString()}</CardDescription>
                      </div>
                    </div>
                    {!n.leida ? (
                      <Button variant="ghost" size="sm" onClick={() => void markAsRead(n.id)}>Marcar leída</Button>
                    ) : (
                      <Badge variant="secondary">Leída</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pl-7 text-sm text-gray-700">{n.cuerpo}</CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
