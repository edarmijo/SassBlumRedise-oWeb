import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Ticket, TicketUpdate, ReassignmentRequest, Notification, TicketStatus, ServiceType } from '../types';
import { 
  ticketsIniciales, 
  ticketUpdatesIniciales, 
  reassignmentRequestsIniciales,
  notificacionesIniciales 
} from '../utils/mockData';
import { generateTicketNumber, generateId } from '../utils/exportUtils';
import { useAuth } from './AuthContext';

interface DataContextType {
  tickets: Ticket[];
  ticketUpdates: TicketUpdate[];
  reassignmentRequests: ReassignmentRequest[];
  notifications: Notification[];
  createTicket: (ticketData: Omit<Ticket, 'id' | 'numero' | 'createdAt' | 'updatedAt' | 'clienteNombre' | 'clienteEmail'>) => Ticket;
  updateTicket: (ticketId: string, updates: Partial<Ticket>, comentario?: string) => void;
  addTicketUpdate: (update: Omit<TicketUpdate, 'id' | 'createdAt'>) => void;
  createReassignmentRequest: (request: Omit<ReassignmentRequest, 'id' | 'createdAt' | 'estado'>) => void;
  approveReassignmentRequest: (requestId: string) => void;
  rejectReassignmentRequest: (requestId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'leida'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getTicketsByUser: (userId: string) => Ticket[];
  getTicketsByAssignee: (userId: string) => Ticket[];
  getTicketUpdates: (ticketId: string) => TicketUpdate[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, users } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketUpdates, setTicketUpdates] = useState<TicketUpdate[]>([]);
  const [reassignmentRequests, setReassignmentRequests] = useState<ReassignmentRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Cargar datos del localStorage
  useEffect(() => {
    const storedTickets = localStorage.getItem('sassblum_tickets');
    const storedUpdates = localStorage.getItem('sassblum_ticket_updates');
    const storedRequests = localStorage.getItem('sassblum_reassignment_requests');
    const storedNotifications = localStorage.getItem('sassblum_notifications');

    if (storedTickets) {
      const parsed = JSON.parse(storedTickets);
      setTickets(parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt)
      })));
    } else {
      setTickets(ticketsIniciales);
      localStorage.setItem('sassblum_tickets', JSON.stringify(ticketsIniciales));
    }

    if (storedUpdates) {
      const parsed = JSON.parse(storedUpdates);
      setTicketUpdates(parsed.map((u: any) => ({
        ...u,
        createdAt: new Date(u.createdAt)
      })));
    } else {
      setTicketUpdates(ticketUpdatesIniciales);
      localStorage.setItem('sassblum_ticket_updates', JSON.stringify(ticketUpdatesIniciales));
    }

    if (storedRequests) {
      const parsed = JSON.parse(storedRequests);
      setReassignmentRequests(parsed.map((r: any) => ({
        ...r,
        createdAt: new Date(r.createdAt),
        resolvedAt: r.resolvedAt ? new Date(r.resolvedAt) : undefined
      })));
    } else {
      setReassignmentRequests(reassignmentRequestsIniciales);
      localStorage.setItem('sassblum_reassignment_requests', JSON.stringify(reassignmentRequestsIniciales));
    }

    if (storedNotifications) {
      const parsed = JSON.parse(storedNotifications);
      setNotifications(parsed.map((n: any) => ({
        ...n,
        createdAt: new Date(n.createdAt)
      })));
    } else {
      setNotifications(notificacionesIniciales);
      localStorage.setItem('sassblum_notifications', JSON.stringify(notificacionesIniciales));
    }
  }, []);

  // Guardar en localStorage cuando cambian
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem('sassblum_tickets', JSON.stringify(tickets));
    }
  }, [tickets]);

  useEffect(() => {
    if (ticketUpdates.length > 0) {
      localStorage.setItem('sassblum_ticket_updates', JSON.stringify(ticketUpdates));
    }
  }, [ticketUpdates]);

  useEffect(() => {
    if (reassignmentRequests.length > 0) {
      localStorage.setItem('sassblum_reassignment_requests', JSON.stringify(reassignmentRequests));
    }
  }, [reassignmentRequests]);

  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('sassblum_notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'numero' | 'createdAt' | 'updatedAt' | 'clienteNombre' | 'clienteEmail'>): Ticket => {
    if (!currentUser) throw new Error('Usuario no autenticado');

    const newTicket: Ticket = {
      ...ticketData,
      id: generateId(),
      numero: generateTicketNumber(),
      clienteNombre: currentUser.nombre,
      clienteEmail: currentUser.email,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setTickets(prev => [newTicket, ...prev]);

    // Crear actualización inicial
    addTicketUpdate({
      ticketId: newTicket.id,
      usuarioId: currentUser.id,
      usuarioNombre: currentUser.nombre,
      accion: 'Creación',
      comentario: 'Ticket creado'
    });

    // Notificar a administradores
    const admins = users.filter(u => u.rol === 'administrador');
    admins.forEach(admin => {
      addNotification({
        usuarioId: admin.id,
        tipo: 'ticket-creado',
        titulo: 'Nuevo ticket',
        mensaje: `${currentUser.nombre} ha creado el ticket ${newTicket.numero}`,
        ticketId: newTicket.id
      });
    });

    return newTicket;
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>, comentario?: string) => {
    if (!currentUser) return;

    const ticket = tickets.find(t => t.id === ticketId);
    if (!ticket) return;

    const updatedTicket = {
      ...ticket,
      ...updates,
      updatedAt: new Date()
    };

    setTickets(prev => prev.map(t => t.id === ticketId ? updatedTicket : t));

    // Registrar la actualización
    if (updates.estado && updates.estado !== ticket.estado) {
      addTicketUpdate({
        ticketId,
        usuarioId: currentUser.id,
        usuarioNombre: currentUser.nombre,
        accion: 'Cambio de estado',
        comentario: comentario || `Estado actualizado a ${updates.estado}`,
        estadoAnterior: ticket.estado,
        estadoNuevo: updates.estado
      });

      // Notificar al cliente
      addNotification({
        usuarioId: ticket.clienteId,
        tipo: 'ticket-actualizado',
        titulo: 'Ticket actualizado',
        mensaje: `Tu ticket ${ticket.numero} ha sido actualizado a estado: ${updates.estado}`,
        ticketId
      });
    }

    if (updates.asignadoA && updates.asignadoA !== ticket.asignadoA) {
      const assignedUser = users.find(u => u.id === updates.asignadoA);
      
      addTicketUpdate({
        ticketId,
        usuarioId: currentUser.id,
        usuarioNombre: currentUser.nombre,
        accion: 'Reasignación',
        comentario: comentario || `Ticket asignado a ${assignedUser?.nombre}`
      });

      // Notificar al nuevo asignado
      if (assignedUser) {
        addNotification({
          usuarioId: assignedUser.id,
          tipo: 'ticket-asignado',
          titulo: 'Ticket asignado',
          mensaje: `Se te ha asignado el ticket ${ticket.numero}`,
          ticketId
        });
      }
    }
  };

  const addTicketUpdate = (update: Omit<TicketUpdate, 'id' | 'createdAt'>) => {
    const newUpdate: TicketUpdate = {
      ...update,
      id: generateId(),
      createdAt: new Date()
    };

    setTicketUpdates(prev => [newUpdate, ...prev]);
  };

  const createReassignmentRequest = (request: Omit<ReassignmentRequest, 'id' | 'createdAt' | 'estado'>) => {
    const newRequest: ReassignmentRequest = {
      ...request,
      id: generateId(),
      estado: 'pendiente',
      createdAt: new Date()
    };

    setReassignmentRequests(prev => [newRequest, ...prev]);

    // Notificar a administradores
    const admins = users.filter(u => u.rol === 'administrador');
    admins.forEach(admin => {
      addNotification({
        usuarioId: admin.id,
        tipo: 'solicitud-reasignacion',
        titulo: 'Nueva solicitud de reasignación',
        mensaje: `${request.solicitanteNombre} solicita reasignar el ticket ${request.ticketNumero}`,
        ticketId: request.ticketId
      });
    });
  };

  const approveReassignmentRequest = (requestId: string) => {
    const request = reassignmentRequests.find(r => r.id === requestId);
    if (!request) return;

    // Actualizar el ticket
    updateTicket(request.ticketId, {
      asignadoA: request.nuevoResponsableId,
      asignadoNombre: request.nuevoResponsableNombre
    }, `Reasignación aprobada: ${request.motivo}`);

    // Actualizar la solicitud
    setReassignmentRequests(prev => prev.map(r =>
      r.id === requestId ? { ...r, estado: 'aprobada' as const, resolvedAt: new Date() } : r
    ));

    // Notificar al solicitante
    addNotification({
      usuarioId: request.solicitanteId,
      tipo: 'ticket-actualizado',
      titulo: 'Solicitud aprobada',
      mensaje: `Tu solicitud de reasignación del ticket ${request.ticketNumero} ha sido aprobada`,
      ticketId: request.ticketId
    });
  };

  const rejectReassignmentRequest = (requestId: string) => {
    const request = reassignmentRequests.find(r => r.id === requestId);
    if (!request) return;

    setReassignmentRequests(prev => prev.map(r =>
      r.id === requestId ? { ...r, estado: 'rechazada' as const, resolvedAt: new Date() } : r
    ));

    // Notificar al solicitante
    addNotification({
      usuarioId: request.solicitanteId,
      tipo: 'ticket-actualizado',
      titulo: 'Solicitud rechazada',
      mensaje: `Tu solicitud de reasignación del ticket ${request.ticketNumero} ha sido rechazada`,
      ticketId: request.ticketId
    });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'leida'>) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId(),
      leida: false,
      createdAt: new Date()
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, leida: true } : n
    ));
  };

  const getTicketsByUser = (userId: string): Ticket[] => {
    return tickets.filter(t => t.clienteId === userId);
  };

  const getTicketsByAssignee = (userId: string): Ticket[] => {
    return tickets.filter(t => t.asignadoA === userId);
  };

  const getTicketUpdates = (ticketId: string): TicketUpdate[] => {
    return ticketUpdates.filter(u => u.ticketId === ticketId).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  };

  return (
    <DataContext.Provider value={{
      tickets,
      ticketUpdates,
      reassignmentRequests,
      notifications,
      createTicket,
      updateTicket,
      addTicketUpdate,
      createReassignmentRequest,
      approveReassignmentRequest,
      rejectReassignmentRequest,
      addNotification,
      markNotificationAsRead,
      getTicketsByUser,
      getTicketsByAssignee,
      getTicketUpdates
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de DataProvider');
  }
  return context;
};
