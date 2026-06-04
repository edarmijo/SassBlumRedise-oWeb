import { useNavigate } from 'react-router-dom'
import { Plus, Ticket as TicketIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../core/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../core/ui/card'
import { Skeleton } from '../../core/ui/skeleton'
import { useTicketsList } from '../tickets/hooks/useTickets'
import { TicketsTable } from '../tickets/components/TicketsTable'
import { CreateTicketPage } from '../tickets/pages/CreateTicketPage'
import type { TicketSummary } from '../tickets/interfaces/ITicketService'

function StatCard({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardDescription>{label}</CardDescription>
        <CardTitle className={`text-3xl ${accent ?? ''}`}>{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}

function computeStats(tickets: TicketSummary[]) {
  const cerrados = (e: TicketSummary['estado']) => e === 'Resuelto' || e === 'Cerrado'
  return {
    total: tickets.length,
    activos: tickets.filter((t) => !cerrados(t.estado)).length,
    resueltos: tickets.filter((t) => cerrados(t.estado)).length,
    enProceso: tickets.filter((t) => t.estado === 'EnProceso').length,
  }
}

interface TicketsPanelProps {
  title: string
  subtitle: string
  showCreate?: boolean
}

/** Reusable role dashboard body: stat cards + tickets table (+ optional create tab). */
export function TicketsPanel({ title, subtitle, showCreate = false }: TicketsPanelProps) {
  const { tickets, isLoading, error } = useTicketsList()
  const navigate = useNavigate()
  const stats = computeStats(tickets)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2 font-semibold">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl" />)
          ) : (
            <>
              <StatCard label="Total de Tickets" value={stats.total} />
              <StatCard label="Activos" value={stats.activos} accent="text-yellow-600" />
              <StatCard label="Resueltos" value={stats.resueltos} accent="text-green-600" />
              <StatCard label="En Proceso" value={stats.enProceso} accent="text-blue-600" />
            </>
          )}
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list"><TicketIcon className="h-4 w-4 mr-2" />Tickets</TabsTrigger>
            {showCreate && <TabsTrigger value="create"><Plus className="h-4 w-4 mr-2" />Crear Ticket</TabsTrigger>}
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>Listado de Tickets</CardTitle>
                <CardDescription>Historial completo de solicitudes</CardDescription>
              </CardHeader>
              <CardContent>
                {error && <p className="text-red-600 mb-4">{error}</p>}
                {isLoading ? (
                  <Skeleton className="h-48 w-full rounded-lg" />
                ) : (
                  <TicketsTable tickets={tickets} onView={(id) => navigate(`/tickets/${id}`)} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {showCreate && (
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Nuevo Ticket</CardTitle>
                  <CardDescription>Completa el formulario para solicitar un servicio</CardDescription>
                </CardHeader>
                <CardContent>
                  <CreateTicketPage onCreated={(id) => navigate(`/tickets/${id}`)} />
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
