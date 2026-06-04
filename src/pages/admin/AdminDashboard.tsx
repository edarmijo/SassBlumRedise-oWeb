import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { TicketTable } from '../../components/tickets/TicketTable';
import { TicketDetail } from '../../components/tickets/TicketDetail';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ticket, UserRole } from '../../types';
import { 
  Ticket as TicketIcon, 
  Download, 
  Users, 
  AlertCircle, 
  CheckCircle2,
  Clock,
  Plus,
  Lock,
  Unlock,
  Trash2
} from 'lucide-react';
import { exportTicketsToCSV, exportUsersToCSV, exportTicketHistoryToCSV } from '../../utils/exportUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../components/ui/dialog';
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';

export const AdminDashboard: React.FC = () => {
  const { tickets, reassignmentRequests, approveReassignmentRequest, rejectReassignmentRequest, ticketUpdates } = useData();
  const { users, createUser, toggleUserBlock, deleteUser } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCreateUserDialog, setShowCreateUserDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [newUserData, setNewUserData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'cliente' as UserRole,
    empresa: '',
    telefono: ''
  });

  const activeTickets = tickets.filter(t => t.estado !== 'resuelto');
  const resolvedTickets = tickets.filter(t => t.estado === 'resuelto');
  const newTickets = tickets.filter(t => t.estado === 'nuevo');
  const pendingRequests = reassignmentRequests.filter(r => r.estado === 'pendiente');

  const clientCount = users.filter(u => u.rol === 'cliente').length;
  const workerCount = users.filter(u => u.rol === 'trabajador').length;

  const handleCreateUser = () => {
    if (!newUserData.nombre || !newUserData.email || !newUserData.password) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    if (users.some(u => u.email === newUserData.email)) {
      toast.error('Este correo electrónico ya está registrado');
      return;
    }

    createUser({
      ...newUserData,
      bloqueado: false
    });

    toast.success('Usuario creado exitosamente');
    setShowCreateUserDialog(false);
    setNewUserData({
      nombre: '',
      email: '',
      password: '',
      rol: 'cliente',
      empresa: '',
      telefono: ''
    });
  };

  const handleApproveRequest = (requestId: string) => {
    approveReassignmentRequest(requestId);
    toast.success('Solicitud aprobada');
  };

  const handleRejectRequest = (requestId: string) => {
    rejectReassignmentRequest(requestId);
    toast.success('Solicitud rechazada');
  };

  const handleToggleBlock = (userId: string, isBlocked: boolean) => {
    toggleUserBlock(userId);
    toast.success(isBlocked ? 'Usuario desbloqueado' : 'Usuario bloqueado');
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    deleteUser(userToDelete);
    toast.success('Usuario eliminado');
    setUserToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Panel de Administración</h1>
          <p className="text-gray-600">
            Gestiona tickets y usuarios del sistema
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Tickets</CardDescription>
              <CardTitle className="text-3xl">{tickets.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Nuevos</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{newTickets.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Activos</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">{activeTickets.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Resueltos</CardDescription>
              <CardTitle className="text-3xl text-green-600">{resolvedTickets.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Clientes</CardDescription>
              <CardTitle className="text-3xl">{clientCount}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Trabajadores</CardDescription>
              <CardTitle className="text-3xl">{workerCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tickets">
              <TicketIcon className="h-4 w-4 mr-2" />
              Tickets
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Usuarios
            </TabsTrigger>
            <TabsTrigger value="requests">
              Solicitudes ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="reports">
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestión de Tickets</CardTitle>
                    <CardDescription>
                      Administra todos los tickets del sistema
                    </CardDescription>
                  </div>
                  <Button onClick={() => exportTicketsToCSV(tickets)} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TicketTable
                  tickets={tickets}
                  onViewTicket={setSelectedTicket}
                  showClient={true}
                  showAssignee={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestión de Usuarios</CardTitle>
                    <CardDescription>
                      Administra los usuarios del sistema
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => exportUsersToCSV(users)} variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Exportar
                    </Button>
                    <Button onClick={() => setShowCreateUserDialog(true)} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Usuario
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map(user => (
                      <TableRow key={user.id}>
                        <TableCell>{user.nombre}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge className="capitalize">
                            {user.rol}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.empresa || '-'}</TableCell>
                        <TableCell>
                          {user.bloqueado ? (
                            <Badge variant="destructive">Bloqueado</Badge>
                          ) : (
                            <Badge className="bg-green-500">Activo</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleBlock(user.id, user.bloqueado)}
                            >
                              {user.bloqueado ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setUserToDelete(user.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes de Reasignación</CardTitle>
                <CardDescription>
                  Aprueba o rechaza solicitudes de reasignación de tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reassignmentRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No hay solicitudes</h3>
                    <p className="text-gray-600">
                      Las solicitudes de reasignación aparecerán aquí
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket</TableHead>
                        <TableHead>Solicitante</TableHead>
                        <TableHead>Nuevo Responsable</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {reassignmentRequests.map(request => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono">{request.ticketNumero}</TableCell>
                          <TableCell>{request.solicitanteNombre}</TableCell>
                          <TableCell>{request.nuevoResponsableNombre}</TableCell>
                          <TableCell className="max-w-xs truncate">{request.motivo}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                request.estado === 'pendiente' ? 'bg-yellow-500' :
                                request.estado === 'aprobada' ? 'bg-green-500' :
                                'bg-red-500'
                              }
                            >
                              {request.estado === 'pendiente' && <Clock className="h-3 w-3 mr-1" />}
                              {request.estado === 'aprobada' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {request.estado === 'rechazada' && <AlertCircle className="h-3 w-3 mr-1" />}
                              {request.estado.charAt(0).toUpperCase() + request.estado.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(request.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {request.estado === 'pendiente' && (
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="text-green-600 hover:bg-green-50"
                                >
                                  Aprobar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRejectRequest(request.id)}
                                  className="text-red-600 hover:bg-red-50"
                                >
                                  Rechazar
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reportes y Estadísticas</CardTitle>
                  <CardDescription>
                    Exporta datos para análisis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="mb-1">Reporte de Tickets</h3>
                      <p className="text-sm text-gray-600">
                        Exporta todos los tickets en formato CSV
                      </p>
                    </div>
                    <Button onClick={() => exportTicketsToCSV(tickets)}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="mb-1">Reporte de Usuarios</h3>
                      <p className="text-sm text-gray-600">
                        Exporta todos los usuarios en formato CSV
                      </p>
                    </div>
                    <Button onClick={() => exportUsersToCSV(users)}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="mb-1">Historial de Actualizaciones</h3>
                      <p className="text-sm text-gray-600">
                        Exporta el historial de cambios en tickets
                      </p>
                    </div>
                    <Button onClick={() => exportTicketHistoryToCSV(ticketUpdates)}>
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas Generales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl text-[#00d4ff] mb-2">
                        {tickets.length > 0 ? Math.round((resolvedTickets.length / tickets.length) * 100) : 0}%
                      </div>
                      <p className="text-sm text-gray-600">Tasa de resolución</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl text-[#00d4ff] mb-2">
                        {tickets.filter(t => t.prioridad === 'alta').length}
                      </div>
                      <p className="text-sm text-gray-600">Tickets alta prioridad</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl text-[#00d4ff] mb-2">
                        {tickets.filter(t => !t.asignadoA).length}
                      </div>
                      <p className="text-sm text-gray-600">Sin asignar</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl text-[#00d4ff] mb-2">
                        {users.filter(u => !u.bloqueado).length}
                      </div>
                      <p className="text-sm text-gray-600">Usuarios activos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Ticket Detail Dialog */}
        <TicketDetail
          ticket={selectedTicket}
          open={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />

        {/* Create User Dialog */}
        <Dialog open={showCreateUserDialog} onOpenChange={setShowCreateUserDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Usuario</DialogTitle>
              <DialogDescription>
                Completa la información del nuevo usuario
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-nombre">Nombre *</Label>
                <Input
                  id="new-nombre"
                  value={newUserData.nombre}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, nombre: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-email">Email *</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Contraseña *</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newUserData.password}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-rol">Rol *</Label>
                <Select
                  value={newUserData.rol}
                  onValueChange={(value) => setNewUserData(prev => ({ ...prev, rol: value as UserRole }))}
                >
                  <SelectTrigger id="new-rol">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="trabajador">Trabajador</SelectItem>
                    <SelectItem value="administrador">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-empresa">Empresa</Label>
                <Input
                  id="new-empresa"
                  value={newUserData.empresa}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, empresa: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-telefono">Teléfono</Label>
                <Input
                  id="new-telefono"
                  value={newUserData.telefono}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, telefono: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateUserDialog(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateUser}>
                Crear Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete User Confirmation */}
        <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. El usuario será eliminado permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
