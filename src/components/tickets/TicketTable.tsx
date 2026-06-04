import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Eye, Download } from 'lucide-react';
import { Ticket } from '../../types';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface TicketTableProps {
  tickets: Ticket[];
  onViewTicket: (ticket: Ticket) => void;
  showClient?: boolean;
  showAssignee?: boolean;
}

export const TicketTable: React.FC<TicketTableProps> = ({ 
  tickets, 
  onViewTicket,
  showClient = true,
  showAssignee = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      'nuevo': { variant: 'default', label: 'Nuevo' },
      'en-proceso': { variant: 'secondary', label: 'En Proceso' },
      'en-espera': { variant: 'outline', label: 'En Espera' },
      'resuelto': { variant: 'default', label: 'Resuelto' }
    };

    const config = variants[status] || { variant: 'default', label: status };
    
    return (
      <Badge 
        variant={config.variant}
        className={
          status === 'nuevo' ? 'bg-blue-500' :
          status === 'en-proceso' ? 'bg-yellow-500' :
          status === 'en-espera' ? 'bg-orange-500' :
          status === 'resuelto' ? 'bg-green-500' : ''
        }
      >
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      'baja': 'bg-gray-500',
      'media': 'bg-blue-500',
      'alta': 'bg-red-500'
    };

    return (
      <Badge className={colors[priority] || 'bg-gray-500'}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.asunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.estado === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar por número, asunto o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="nuevo">Nuevo</SelectItem>
            <SelectItem value="en-proceso">En Proceso</SelectItem>
            <SelectItem value="en-espera">En Espera</SelectItem>
            <SelectItem value="resuelto">Resuelto</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                {showClient && <TableHead>Cliente</TableHead>}
                <TableHead>Servicio</TableHead>
                <TableHead>Asunto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                {showAssignee && <TableHead>Asignado a</TableHead>}
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={showClient && showAssignee ? 9 : 8} className="text-center py-8 text-gray-500">
                    No se encontraron tickets
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map(ticket => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono">{ticket.numero}</TableCell>
                    {showClient && <TableCell>{ticket.clienteNombre}</TableCell>}
                    <TableCell className="capitalize">
                      {ticket.servicio.replace('-', ' ')}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{ticket.asunto}</TableCell>
                    <TableCell>{getStatusBadge(ticket.estado)}</TableCell>
                    <TableCell>{getPriorityBadge(ticket.prioridad)}</TableCell>
                    {showAssignee && (
                      <TableCell>
                        {ticket.asignadoNombre || <span className="text-gray-400">Sin asignar</span>}
                      </TableCell>
                    )}
                    <TableCell>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewTicket(ticket)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredTickets.length} de {tickets.length} tickets
      </div>
    </div>
  );
};
