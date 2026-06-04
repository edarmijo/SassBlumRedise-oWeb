import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { TicketTable } from '../../components/tickets/TicketTable';
import { TicketDetail } from '../../components/tickets/TicketDetail';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ticket } from '../../types';
import { Ticket as TicketIcon, Download, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { exportTicketsToCSV } from '../../utils/exportUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

export const WorkerDashboard: React.FC = () => {
  const { tickets, getTicketsByAssignee, reassignmentRequests } = useData();
  const { currentUser } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  if (!currentUser) return null;

  const myTickets = getTicketsByAssignee(currentUser.id);
  const allTickets = tickets;
  const activeTickets = myTickets.filter(t => t.estado !== 'resuelto');
  const resolvedTickets = myTickets.filter(t => t.estado === 'resuelto');
  const newTickets = tickets.filter(t => t.estado === 'nuevo' && !t.asignadoA);

  const myRequests = reassignmentRequests.filter(r => r.solicitanteId === currentUser.id);
  const pendingRequests = myRequests.filter(r => r.estado === 'pendiente');

  const handleExportMyTickets = () => {
    exportTicketsToCSV(myTickets);
  };

  const handleExportAllTickets = () => {
    exportTicketsToCSV(allTickets);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Panel de Trabajador</h1>
          <p className="text-gray-600">
            Gestiona los tickets asignados y visualiza el estado general
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Mis Tickets</CardDescription>
              <CardTitle className="text-3xl">{myTickets.length}</CardTitle>
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
              <CardDescription>Sin Asignar</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{newTickets.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Solicitudes Pendientes</CardDescription>
              <CardTitle className="text-3xl text-orange-600">{pendingRequests.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="my-tickets" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="my-tickets">
                <TicketIcon className="h-4 w-4 mr-2" />
                Mis Tickets
              </TabsTrigger>
              <TabsTrigger value="all-tickets">
                Todos los Tickets
              </TabsTrigger>
              <TabsTrigger value="requests">
                Solicitudes ({pendingRequests.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="my-tickets">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tickets Asignados a Mí</CardTitle>
                    <CardDescription>
                      Gestiona tus tickets asignados
                    </CardDescription>
                  </div>
                  <Button onClick={handleExportMyTickets} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {myTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <TicketIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No tienes tickets asignados</h3>
                    <p className="text-gray-600">
                      Los tickets aparecerán aquí cuando te sean asignados
                    </p>
                  </div>
                ) : (
                  <TicketTable
                    tickets={myTickets}
                    onViewTicket={setSelectedTicket}
                    showClient={true}
                    showAssignee={false}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all-tickets">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Todos los Tickets</CardTitle>
                    <CardDescription>
                      Visualiza todos los tickets del sistema
                    </CardDescription>
                  </div>
                  <Button onClick={handleExportAllTickets} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TicketTable
                  tickets={allTickets}
                  onViewTicket={setSelectedTicket}
                  showClient={true}
                  showAssignee={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Mis Solicitudes de Reasignación</CardTitle>
                <CardDescription>
                  Estado de las solicitudes de reasignación que has enviado
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No has enviado solicitudes</h3>
                    <p className="text-gray-600">
                      Las solicitudes de reasignación aparecerán aquí
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ticket</TableHead>
                        <TableHead>Nuevo Responsable</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Fecha</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRequests.map(request => (
                        <TableRow key={request.id}>
                          <TableCell className="font-mono">{request.ticketNumero}</TableCell>
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ticket Detail Dialog */}
        <TicketDetail
          ticket={selectedTicket}
          open={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      </div>
    </div>
  );
};
