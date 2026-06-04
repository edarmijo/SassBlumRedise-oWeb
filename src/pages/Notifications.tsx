import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Bell, BellOff, CheckCheck, Ticket as TicketIcon } from 'lucide-react';

interface NotificationsProps {
  onNavigate: (page: string, ticketId?: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const { notifications, markNotificationAsRead } = useData();
  const { currentUser } = useAuth();

  if (!currentUser) return null;

  const myNotifications = notifications
    .filter(n => n.usuarioId === currentUser.id)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const unreadCount = myNotifications.filter(n => !n.leida).length;

  const handleNotificationClick = (notificationId: string, ticketId?: string) => {
    markNotificationAsRead(notificationId);
    
    if (ticketId) {
      // Navigate to appropriate dashboard based on user role
      if (currentUser.rol === 'cliente') {
        onNavigate('client-dashboard');
      } else if (currentUser.rol === 'trabajador') {
        onNavigate('worker-dashboard');
      } else {
        onNavigate('admin-dashboard');
      }
    }
  };

  const handleMarkAllAsRead = () => {
    myNotifications.forEach(n => {
      if (!n.leida) {
        markNotificationAsRead(n.id);
      }
    });
  };

  const getNotificationIcon = (tipo: string) => {
    switch (tipo) {
      case 'ticket-creado':
      case 'ticket-actualizado':
      case 'ticket-asignado':
        return <TicketIcon className="h-5 w-5" />;
      case 'solicitud-reasignacion':
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-6 w-6" />
                  Notificaciones
                  {unreadCount > 0 && (
                    <Badge className="bg-red-500">{unreadCount}</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Mantente al día con las actualizaciones de tus tickets
                </CardDescription>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Marcar todas como leídas
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {myNotifications.length === 0 ? (
              <div className="text-center py-12">
                <BellOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl mb-2">No tienes notificaciones</h3>
                <p className="text-gray-600">
                  Las notificaciones sobre tus tickets aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {myNotifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      notification.leida
                        ? 'bg-white hover:bg-gray-50'
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                    onClick={() => handleNotificationClick(notification.id, notification.ticketId)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        notification.leida ? 'bg-gray-100' : 'bg-blue-100'
                      }`}>
                        {getNotificationIcon(notification.tipo)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={notification.leida ? '' : 'font-semibold'}>
                            {notification.titulo}
                          </h4>
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {notification.mensaje}
                        </p>
                        {!notification.leida && (
                          <Badge variant="default" className="mt-2 bg-blue-500">
                            Nueva
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
