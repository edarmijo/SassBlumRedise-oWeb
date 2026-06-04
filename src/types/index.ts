export type UserRole = 'cliente' | 'trabajador' | 'administrador';

export type TicketStatus = 'nuevo' | 'en-proceso' | 'en-espera' | 'resuelto';

export type ServiceType = 
  | 'soporte-tecnico'
  | 'wi-fi'
  | 'taller-impresoras'
  | 'infraestructura-it'
  | 'cctv'
  | 'domotica';

export interface User {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: UserRole;
  empresa?: string;
  telefono?: string;
  bloqueado: boolean;
  createdAt: Date;
}

export interface Service {
  id: ServiceType;
  nombre: string;
  descripcion: string;
  icon: string;
}

export interface Ticket {
  id: string;
  numero: string;
  clienteId: string;
  clienteNombre: string;
  clienteEmail: string;
  servicio: ServiceType;
  asunto: string;
  descripcion: string;
  estado: TicketStatus;
  prioridad: 'baja' | 'media' | 'alta';
  asignadoA?: string;
  asignadoNombre?: string;
  archivo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketUpdate {
  id: string;
  ticketId: string;
  usuarioId: string;
  usuarioNombre: string;
  accion: string;
  comentario?: string;
  estadoAnterior?: TicketStatus;
  estadoNuevo?: TicketStatus;
  createdAt: Date;
}

export interface ReassignmentRequest {
  id: string;
  ticketId: string;
  ticketNumero: string;
  solicitanteId: string;
  solicitanteNombre: string;
  nuevoResponsableId: string;
  nuevoResponsableNombre: string;
  motivo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Notification {
  id: string;
  usuarioId: string;
  tipo: 'ticket-creado' | 'ticket-actualizado' | 'ticket-asignado' | 'solicitud-reasignacion';
  titulo: string;
  mensaje: string;
  leida: boolean;
  ticketId?: string;
  createdAt: Date;
}
