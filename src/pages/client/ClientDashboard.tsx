import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { TicketTable } from '../../components/tickets/TicketTable';
import { TicketForm } from '../../components/tickets/TicketForm';
import { TicketDetail } from '../../components/tickets/TicketDetail';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ticket } from '../../types';
import { Plus, Ticket as TicketIcon, Download } from 'lucide-react';
import { exportTicketsToCSV } from '../../utils/exportUtils';

export const ClientDashboard: React.FC = () => {
  const { tickets, getTicketsByUser } = useData();
  const { currentUser } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (!currentUser) return null;

  const myTickets = getTicketsByUser(currentUser.id);
  const activeTickets = myTickets.filter(t => t.estado !== 'resuelto');
  const resolvedTickets = myTickets.filter(t => t.estado === 'resuelto');

  const handleExport = () => {
    exportTicketsToCSV(myTickets);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Mis Tickets</h1>
          <p className="text-gray-600">
            Gestiona tus solicitudes de servicio
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total de Tickets</CardDescription>
              <CardTitle className="text-3xl">{myTickets.length}</CardTitle>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Tickets Activos</CardDescription>
              <CardTitle className="text-3xl">{activeTickets.length}</CardTitle>
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
              <CardDescription>En Proceso</CardDescription>
              <CardTitle className="text-3xl text-yellow-600">
                {myTickets.filter(t => t.estado === 'en-proceso').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tickets" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <TabsList>
              <TabsTrigger value="tickets">
                <TicketIcon className="h-4 w-4 mr-2" />
                Mis Tickets
              </TabsTrigger>
              <TabsTrigger value="create">
                <Plus className="h-4 w-4 mr-2" />
                Crear Ticket
              </TabsTrigger>
            </TabsList>

            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar a CSV
            </Button>
          </div>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Listado de Tickets</CardTitle>
                <CardDescription>
                  Historial completo de tus solicitudes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {myTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <TicketIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl mb-2">No tienes tickets aún</h3>
                    <p className="text-gray-600 mb-4">
                      Crea tu primer ticket para solicitar un servicio
                    </p>
                    <Button onClick={() => setShowCreateForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Ticket
                    </Button>
                  </div>
                ) : (
                  <TicketTable
                    tickets={myTickets}
                    onViewTicket={setSelectedTicket}
                    showClient={false}
                    showAssignee={true}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <TicketForm onSuccess={() => setShowCreateForm(false)} />
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
