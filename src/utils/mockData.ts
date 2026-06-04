import { User, Ticket, Service, TicketUpdate, ReassignmentRequest, Notification } from '../types';

// Servicios disponibles
export const servicios: Service[] = [
  {
    id: 'soporte-tecnico',
    nombre: 'Soporte Técnico',
    descripcion: 'Asistencia técnica especializada para resolver problemas informáticos',
    icon: 'Headphones'
  },
  {
    id: 'wi-fi',
    nombre: 'Wi-Fi',
    descripcion: 'Instalación y configuración de redes inalámbricas',
    icon: 'Wifi'
  },
  {
    id: 'taller-impresoras',
    nombre: 'Taller de Impresoras',
    descripcion: 'Mantenimiento y reparación de equipos de impresión',
    icon: 'Printer'
  },
  {
    id: 'infraestructura-it',
    nombre: 'Infraestructura IT',
    descripcion: 'Diseño e implementación de infraestructura tecnológica',
    icon: 'Server'
  },
  {
    id: 'cctv',
    nombre: 'CCTV',
    descripcion: 'Sistemas de videovigilancia y seguridad',
    icon: 'Camera'
  },
  {
    id: 'domotica',
    nombre: 'Domótica',
    descripcion: 'Automatización inteligente para hogares y negocios',
    icon: 'Home'
  }
];

// Usuarios iniciales
export const usuariosIniciales: User[] = [
  {
    id: '1',
    nombre: 'Admin Principal',
    email: 'admin@sassblum.com',
    password: 'admin123',
    rol: 'administrador',
    empresa: 'Sass Blum',
    telefono: '+593 9 9999 9999',
    bloqueado: false,
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    nombre: 'Juan Pérez',
    email: 'trabajador@sassblum.com',
    password: 'trabajador123',
    rol: 'trabajador',
    empresa: 'Sass Blum',
    telefono: '+593 9 8888 8888',
    bloqueado: false,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '3',
    nombre: 'María García',
    email: 'cliente@example.com',
    password: 'cliente123',
    rol: 'cliente',
    empresa: 'Empresa XYZ',
    telefono: '+593 9 7777 7777',
    bloqueado: false,
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    nombre: 'Carlos López',
    email: 'trabajador2@sassblum.com',
    password: 'trabajador123',
    rol: 'trabajador',
    empresa: 'Sass Blum',
    telefono: '+593 9 6666 6666',
    bloqueado: false,
    createdAt: new Date('2024-02-15')
  },
  {
    id: '5',
    nombre: 'Ana Martínez',
    email: 'cliente2@example.com',
    password: 'cliente123',
    rol: 'cliente',
    empresa: 'TechCorp',
    telefono: '+593 9 5555 5555',
    bloqueado: false,
    createdAt: new Date('2024-03-01')
  }
];

// Tickets iniciales
export const ticketsIniciales: Ticket[] = [
  {
    id: 't1',
    numero: 'TK-2024-001',
    clienteId: '3',
    clienteNombre: 'María García',
    clienteEmail: 'cliente@example.com',
    servicio: 'soporte-tecnico',
    asunto: 'Problema con computadora de oficina',
    descripcion: 'La computadora de recepción no enciende desde esta mañana. Necesitamos soporte urgente.',
    estado: 'en-proceso',
    prioridad: 'alta',
    asignadoA: '2',
    asignadoNombre: 'Juan Pérez',
    createdAt: new Date('2024-11-01'),
    updatedAt: new Date('2024-11-02')
  },
  {
    id: 't2',
    numero: 'TK-2024-002',
    clienteId: '5',
    clienteNombre: 'Ana Martínez',
    clienteEmail: 'cliente2@example.com',
    servicio: 'wi-fi',
    asunto: 'Instalación de red Wi-Fi en nueva oficina',
    descripcion: 'Necesitamos instalar red Wi-Fi en nuestra nueva oficina de 200m2. Requerimos cobertura completa.',
    estado: 'nuevo',
    prioridad: 'media',
    createdAt: new Date('2024-11-05'),
    updatedAt: new Date('2024-11-05')
  },
  {
    id: 't3',
    numero: 'TK-2024-003',
    clienteId: '3',
    clienteNombre: 'María García',
    clienteEmail: 'cliente@example.com',
    servicio: 'taller-impresoras',
    asunto: 'Impresora no imprime correctamente',
    descripcion: 'La impresora HP LaserJet está imprimiendo con líneas horizontales. Ya cambiamos el tóner.',
    estado: 'resuelto',
    prioridad: 'baja',
    asignadoA: '4',
    asignadoNombre: 'Carlos López',
    createdAt: new Date('2024-10-20'),
    updatedAt: new Date('2024-10-25')
  },
  {
    id: 't4',
    numero: 'TK-2024-004',
    clienteId: '5',
    clienteNombre: 'Ana Martínez',
    clienteEmail: 'cliente2@example.com',
    servicio: 'cctv',
    asunto: 'Instalación de cámaras de seguridad',
    descripcion: 'Cotización para instalar 8 cámaras de seguridad en puntos estratégicos de la empresa.',
    estado: 'en-espera',
    prioridad: 'media',
    asignadoA: '2',
    asignadoNombre: 'Juan Pérez',
    createdAt: new Date('2024-11-03'),
    updatedAt: new Date('2024-11-04')
  }
];

// Actualizaciones de tickets
export const ticketUpdatesIniciales: TicketUpdate[] = [
  {
    id: 'tu1',
    ticketId: 't1',
    usuarioId: '2',
    usuarioNombre: 'Juan Pérez',
    accion: 'Asignación',
    comentario: 'Ticket asignado para revisión',
    estadoAnterior: 'nuevo',
    estadoNuevo: 'en-proceso',
    createdAt: new Date('2024-11-02T09:00:00')
  },
  {
    id: 'tu2',
    ticketId: 't3',
    usuarioId: '4',
    usuarioNombre: 'Carlos López',
    accion: 'Resolución',
    comentario: 'Se limpió el fusor de la impresora. Problema resuelto.',
    estadoAnterior: 'en-proceso',
    estadoNuevo: 'resuelto',
    createdAt: new Date('2024-10-25T14:30:00')
  },
  {
    id: 'tu3',
    ticketId: 't4',
    usuarioId: '2',
    usuarioNombre: 'Juan Pérez',
    accion: 'Actualización',
    comentario: 'Esperando aprobación de cotización por parte del cliente',
    estadoAnterior: 'nuevo',
    estadoNuevo: 'en-espera',
    createdAt: new Date('2024-11-04T11:00:00')
  }
];

// Solicitudes de reasignación iniciales
export const reassignmentRequestsIniciales: ReassignmentRequest[] = [];

// Notificaciones iniciales
export const notificacionesIniciales: Notification[] = [
  {
    id: 'n1',
    usuarioId: '3',
    tipo: 'ticket-actualizado',
    titulo: 'Ticket actualizado',
    mensaje: 'Tu ticket TK-2024-001 ha sido actualizado a estado: En proceso',
    leida: false,
    ticketId: 't1',
    createdAt: new Date('2024-11-02T09:00:00')
  },
  {
    id: 'n2',
    usuarioId: '2',
    tipo: 'ticket-asignado',
    titulo: 'Nuevo ticket asignado',
    mensaje: 'Se te ha asignado el ticket TK-2024-001',
    leida: true,
    ticketId: 't1',
    createdAt: new Date('2024-11-02T09:00:00')
  }
];

// Clientes destacados
export const clientesDestacados = [
  { nombre: 'Empresa XYZ', logo: 'Building2' },
  { nombre: 'TechCorp', logo: 'Laptop' },
  { nombre: 'Innovatech', logo: 'Lightbulb' },
  { nombre: 'Global Solutions', logo: 'Globe' },
  { nombre: 'Digital Systems', logo: 'Monitor' },
  { nombre: 'Smart Business', logo: 'BriefcaseBusiness' }
];
