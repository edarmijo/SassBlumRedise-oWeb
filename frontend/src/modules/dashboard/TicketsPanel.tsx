import { useNavigate } from 'react-router-dom'
import { Plus, Ticket as TicketIcon, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../core/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../core/ui/card'
import { Skeleton } from '../../core/ui/skeleton'
import { useTicketsList } from '../tickets/hooks/useTickets'
import { TicketsTable } from '../tickets/components/TicketsTable'
import { CreateTicketPage } from '../tickets/pages/CreateTicketPage'
import type { TicketSummary } from '../tickets/interfaces/ITicketService'

function StatCard({ label, value, icon: Icon, chip }: { label: string; value: number; icon: LucideIcon; chip: string }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <div className="flex items-center gap-4 p-5">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${chip}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-muted-foreground truncate">{label}</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
        </div>
      </div>
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
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-21 rounded-xl" />)
          ) : (
            <>
              <StatCard label="Total de Tickets" value={stats.total} icon={TicketIcon} chip="bg-brand-navy/8 text-brand-navy" />
              <StatCard label="Activos" value={stats.activos} icon={Clock} chip="bg-warning/10 text-warning" />
              <StatCard label="Resueltos" value={stats.resueltos} icon={CheckCircle2} chip="bg-success/10 text-success" />
              <StatCard label="En Proceso" value={stats.enProceso} icon={Loader2} chip="bg-brand-cyan/10 text-brand-cyan-dark" />
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
                {error && <p className="text-destructive mb-4">{error}</p>}
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
