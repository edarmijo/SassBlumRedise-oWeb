import { useNavigate } from 'react-router-dom'
import { Ticket as TicketIcon, Users, BarChart3, Package } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../core/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../core/ui/card'
import { Skeleton } from '../../core/ui/skeleton'
import { useTicketsList } from '../tickets/hooks/useTickets'
import { TicketsTable } from '../tickets/components/TicketsTable'
import { AdminUserPage } from '../auth/pages/AdminUserPage'
import { ReportsDashboard } from '../reports/components/ReportsDashboard'
import { ReportsProvider } from '../reports/hooks/useReports'
import { reportsService } from '../reports/services/ReportsService'
import { CatalogAdminPanel } from '../catalog/components/CatalogAdminPanel'

export function AdminDashboard() {
  const { tickets, isLoading, error } = useTicketsList()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Panel de Administración</h1>
          <p className="text-muted-foreground mt-1">Gestiona tickets, usuarios, catálogo y reportes del sistema</p>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="tickets"><TicketIcon className="h-4 w-4 mr-2" />Tickets</TabsTrigger>
            <TabsTrigger value="users"><Users className="h-4 w-4 mr-2" />Usuarios</TabsTrigger>
            <TabsTrigger value="catalog"><Package className="h-4 w-4 mr-2" />Catálogo</TabsTrigger>
            <TabsTrigger value="reports"><BarChart3 className="h-4 w-4 mr-2" />Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Tickets</CardTitle>
                <CardDescription>Todos los tickets del sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {error && <p className="text-destructive mb-4">{error}</p>}
                {isLoading ? <Skeleton className="h-48 w-full rounded-lg" /> : <TicketsTable tickets={tickets} onView={(id) => navigate(`/tickets/${id}`)} />}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users"><AdminUserPage /></TabsContent>

          <TabsContent value="catalog"><CatalogAdminPanel /></TabsContent>

          <TabsContent value="reports">
            <ReportsProvider service={reportsService}>
              <ReportsDashboard />
            </ReportsProvider>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
