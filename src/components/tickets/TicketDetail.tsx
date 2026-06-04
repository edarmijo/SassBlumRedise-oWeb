import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Ticket, TicketStatus } from '../../types';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';
import { Clock, User, Calendar, FileText, ArrowRightLeft } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket | null;
  open: boolean;
  onClose: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, open, onClose }) => {
  const { updateTicket, getTicketUpdates, createReassignmentRequest } = useData();
  const { currentUser, users } = useAuth();
  const [newStatus, setNewStatus] = useState<TicketStatus | ''>('');
  const [comment, setComment] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [reassignReason, setReassignReason] = useState('');

  if (!ticket || !currentUser) return null;

  const updates = getTicketUpdates(ticket.id);
  const canEdit = currentUser.rol === 'administrador' || currentUser.rol === 'trabajador';
  const canReassign = currentUser.rol === 'administrador';
  const canRequestReassign = currentUser.rol === 'trabajador';

  const workers = users.filter(u => u.rol === 'trabajador' || u.rol === 'administrador');

  const handleStatusUpdate = () => {
    if (!newStatus) {
      toast.error('Por favor selecciona un nuevo estado');
      return;
    }

    updateTicket(ticket.id, { estado: newStatus }, comment || undefined);
    toast.success('Ticket actualizado exitosamente');
    setNewStatus('');
    setComment('');
  };

  const handleReassign = () => {
    if (!newAssignee) {
      toast.error('Por favor selecciona un responsable');
      return;
    }

    const assignedUser = users.find(u => u.id === newAssignee);
    if (!assignedUser) return;

    updateTicket(ticket.id, {
      asignadoA: newAssignee,
      asignadoNombre: assignedUser.nombre
    }, comment || undefined);

    toast.success(`Ticket asignado a ${assignedUser.nombre}`);
    setNewAssignee('');
    setComment('');
  };

  const handleRequestReassign = () => {
    if (!newAssignee) {
      toast.error('Por favor selecciona un nuevo responsable');
      return;
    }

    if (!reassignReason) {
      toast.error('Por favor indica el motivo de la reasignación');
      return;
    }

    const assignedUser = users.find(u => u.id === newAssignee);
    if (!assignedUser) return;

    createReassignmentRequest({
      ticketId: ticket.id,
      ticketNumero: ticket.numero,
      solicitanteId: currentUser.id,
      solicitanteNombre: currentUser.nombre,
      nuevoResponsableId: newAssignee,
      nuevoResponsableNombre: assignedUser.nombre,
      motivo: reassignReason
    });

    toast.success('Solicitud de reasignación enviada');
    setNewAssignee('');
    setReassignReason('');
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'nuevo': 'bg-blue-500',
      'en-proceso': 'bg-yellow-500',
      'en-espera': 'bg-orange-500',
      'resuelto': 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'nuevo': 'Nuevo',
      'en-proceso': 'En Proceso',
      'en-espera': 'En Espera',
      'resuelto': 'Resuelto'
    };
    return labels[status] || status;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Ticket {ticket.numero}
            <Badge className={getStatusColor(ticket.estado)}>
              {getStatusLabel(ticket.estado)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Detalles completos del ticket
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                Cliente
              </div>
              <p>{ticket.clienteNombre}</p>
              <p className="text-sm text-gray-600">{ticket.clienteEmail}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                Fecha de creación
              </div>
              <p>{new Date(ticket.createdAt).toLocaleString()}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                Servicio
              </div>
              <p className="capitalize">{ticket.servicio.replace('-', ' ')}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Prioridad
              </div>
              <Badge className={
                ticket.prioridad === 'alta' ? 'bg-red-500' :
                ticket.prioridad === 'media' ? 'bg-blue-500' :
                'bg-gray-500'
              }>
                {ticket.prioridad.charAt(0).toUpperCase() + ticket.prioridad.slice(1)}
              </Badge>
            </div>
          </div>

          <div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <User className="h-4 w-4 mr-2" />
              Asignado a
            </div>
            <p>{ticket.asignadoNombre || 'Sin asignar'}</p>
          </div>

          <Separator />

          {/* Asunto y descripción */}
          <div>
            <h3 className="mb-2">Asunto</h3>
            <p className="text-gray-700">{ticket.asunto}</p>
          </div>

          <div>
            <h3 className="mb-2">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{ticket.descripcion}</p>
          </div>

          {/* Historial de actualizaciones */}
          {updates.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="mb-4">Historial de Actualizaciones</h3>
                <div className="space-y-3">
                  {updates.map(update => (
                    <div key={update.id} className="border-l-2 border-[#00d4ff] pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{update.usuarioNombre}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(update.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{update.accion}</p>
                      {update.comentario && (
                        <p className="text-sm text-gray-600 mt-1">{update.comentario}</p>
                      )}
                      {update.estadoAnterior && update.estadoNuevo && (
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <Badge variant="outline">{getStatusLabel(update.estadoAnterior)}</Badge>
                          <ArrowRightLeft className="h-3 w-3" />
                          <Badge className={getStatusColor(update.estadoNuevo)}>
                            {getStatusLabel(update.estadoNuevo)}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Acciones para trabajadores/administradores */}
          {canEdit && ticket.estado !== 'resuelto' && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3>Actualizar Ticket</h3>

                {/* Cambiar estado */}
                <div className="space-y-2">
                  <label className="text-sm">Cambiar estado</label>
                  <Select value={newStatus} onValueChange={(value) => setNewStatus(value as TicketStatus)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar nuevo estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuevo">Nuevo</SelectItem>
                      <SelectItem value="en-proceso">En Proceso</SelectItem>
                      <SelectItem value="en-espera">En Espera</SelectItem>
                      <SelectItem value="resuelto">Resuelto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm">Comentario</label>
                  <Textarea
                    placeholder="Agregar comentario (opcional)"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleStatusUpdate}
                  disabled={!newStatus}
                  className="w-full"
                >
                  Actualizar Estado
                </Button>

                <Separator />

                {/* Reasignar (solo administradores) */}
                {canReassign && (
                  <div className="space-y-2">
                    <label className="text-sm">Reasignar a</label>
                    <Select value={newAssignee} onValueChange={setNewAssignee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar responsable" />
                      </SelectTrigger>
                      <SelectContent>
                        {workers.map(worker => (
                          <SelectItem key={worker.id} value={worker.id}>
                            {worker.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      onClick={handleReassign}
                      disabled={!newAssignee}
                      variant="outline"
                      className="w-full"
                    >
                      Reasignar Ticket
                    </Button>
                  </div>
                )}

                {/* Solicitar reasignación (trabajadores) */}
                {canRequestReassign && !canReassign && (
                  <div className="space-y-2">
                    <label className="text-sm">Solicitar reasignación</label>
                    <Select value={newAssignee} onValueChange={setNewAssignee}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar nuevo responsable" />
                      </SelectTrigger>
                      <SelectContent>
                        {workers.map(worker => (
                          <SelectItem key={worker.id} value={worker.id}>
                            {worker.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Motivo de la reasignación"
                      value={reassignReason}
                      onChange={(e) => setReassignReason(e.target.value)}
                      rows={2}
                    />
                    <Button
                      onClick={handleRequestReassign}
                      disabled={!newAssignee || !reassignReason}
                      variant="outline"
                      className="w-full"
                    >
                      Solicitar Reasignación
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
