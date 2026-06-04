import { Ticket, User, TicketUpdate } from '../types';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header];
        if (value instanceof Date) {
          return `"${value.toLocaleDateString()}"`;
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportTicketsToCSV = (tickets: Ticket[]) => {
  const ticketsForExport = tickets.map(ticket => ({
    'Número': ticket.numero,
    'Cliente': ticket.clienteNombre,
    'Email': ticket.clienteEmail,
    'Servicio': ticket.servicio,
    'Asunto': ticket.asunto,
    'Estado': ticket.estado,
    'Prioridad': ticket.prioridad,
    'Asignado a': ticket.asignadoNombre || 'Sin asignar',
    'Fecha creación': ticket.createdAt,
    'Última actualización': ticket.updatedAt
  }));

  exportToCSV(ticketsForExport, 'tickets');
};

export const exportUsersToCSV = (users: User[]) => {
  const usersForExport = users.map(user => ({
    'ID': user.id,
    'Nombre': user.nombre,
    'Email': user.email,
    'Rol': user.rol,
    'Empresa': user.empresa || '',
    'Teléfono': user.telefono || '',
    'Bloqueado': user.bloqueado ? 'Sí' : 'No',
    'Fecha registro': user.createdAt
  }));

  exportToCSV(usersForExport, 'usuarios');
};

export const exportTicketHistoryToCSV = (updates: TicketUpdate[]) => {
  const updatesForExport = updates.map(update => ({
    'Ticket': update.ticketId,
    'Usuario': update.usuarioNombre,
    'Acción': update.accion,
    'Comentario': update.comentario || '',
    'Estado anterior': update.estadoAnterior || '',
    'Estado nuevo': update.estadoNuevo || '',
    'Fecha': update.createdAt
  }));

  exportToCSV(updatesForExport, 'historial_tickets');
};

// Generar número de ticket único
export const generateTicketNumber = (): string => {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `TK-${year}-${random}`;
};

// Generar ID único
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
