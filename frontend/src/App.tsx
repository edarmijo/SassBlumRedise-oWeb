/**
 * App — composition root + router.
 *
 * The ONE place where concrete services are wired into their interface providers
 * (DIP boundary). Everything below depends only on interfaces.
 *
 * Layout: public marketing site + auth + role dashboards share <SiteLayout/>
 * (Navbar + Footer + Toaster). Authenticated areas additionally receive the
 * Notification/Ticket providers (mounted only when a session exists).
 */

import { BrowserRouter, Routes, Route, Outlet, Navigate, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import type { ReactNode } from 'react'

// Concrete services (injected here only)
import { authService } from './modules/auth/services/AuthService'
import { catalogService } from './modules/catalog/services/CatalogService'
import { ticketService } from './modules/tickets/services/TicketService'
import { notificationService } from './modules/notifications/services/NotificationService'

// Providers (DIP seams)
import { AuthProvider, useAuth } from './modules/auth/hooks/useAuth'
import { AuthServiceProvider } from './modules/auth/hooks/useAuthService'
import { CatalogProvider } from './modules/catalog/hooks/useCatalog'
import { TicketClientProvider } from './modules/tickets/hooks/useTickets'
import { NotificationProvider } from './modules/notifications/hooks/useNotifications'

// Layout
import { Navbar } from './core/ui/layout/Navbar'
import { Footer } from './core/ui/layout/Footer'
import { Toaster } from './core/ui/sonner'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './core/ui/card'

// Public pages
import { Home } from './modules/public/pages/Home'
import { About } from './modules/public/pages/About'
import { Services } from './modules/public/pages/Services'
import { Gallery } from './modules/public/pages/Gallery'
import { Clients } from './modules/public/pages/Clients'

// Auth
import { ProtectedRoute } from './modules/auth/components/ProtectedRoute'
import { LoginForm } from './modules/auth/components/LoginForm'
import { RegisterForm } from './modules/auth/components/RegisterForm'
import { ForgotPasswordPage } from './modules/auth/pages/ForgotPasswordPage'
import { ResetPasswordPage } from './modules/auth/pages/ResetPasswordPage'
import { VerifyEmailPage } from './modules/auth/pages/VerifyEmailPage'

// Dashboards + app pages
import { ClientDashboard } from './modules/dashboard/ClientDashboard'
import { WorkerDashboard } from './modules/dashboard/WorkerDashboard'
import { AdminDashboard } from './modules/dashboard/AdminDashboard'
import { TicketDetailPage } from './modules/tickets/pages/TicketDetailPage'
import { NotificationsPage } from './modules/notifications/pages/NotificationsPage'

// ── Shared layout ─────────────────────────────────────────────────────────────

function SiteLayout() {
  const { user } = useAuth()
  const tree = (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="grow"><Outlet /></main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
  // Authenticated areas (incl. the Navbar bell) need the notification + ticket providers.
  return user ? (
    <NotificationProvider service={notificationService}>
      <TicketClientProvider service={ticketService}>{tree}</TicketClientProvider>
    </NotificationProvider>
  ) : tree
}

function AuthCard({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <AuthServiceProvider service={authService}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
            {footer && <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">{footer}</div>}
          </CardContent>
        </Card>
      </div>
    </AuthServiceProvider>
  )
}

// ── Auth routes ───────────────────────────────────────────────────────────────

function LoginRoute() {
  const navigate = useNavigate()
  return (
    <AuthCard
      title="Iniciar sesión"
      subtitle="Accede a tu cuenta de SassBlum"
      footer={<>¿No tienes cuenta? <Link to="/register" className="text-brand-cyan hover:underline">Regístrate</Link>{' · '}<Link to="/forgot-password" className="text-brand-cyan hover:underline">Olvidé mi contraseña</Link></>}
    >
      <LoginForm onSuccess={() => navigate('/app')} />
    </AuthCard>
  )
}

function RegisterRoute() {
  const navigate = useNavigate()
  return (
    <AuthCard
      title="Crear cuenta"
      subtitle="Regístrate como cliente de SassBlum"
      footer={<>¿Ya tienes cuenta? <Link to="/login" className="text-brand-cyan hover:underline">Inicia sesión</Link></>}
    >
      <RegisterForm onSuccess={() => navigate('/login')} />
    </AuthCard>
  )
}

function ForgotRoute() {
  return <AuthCard title="Recuperar contraseña" subtitle="Te enviaremos un enlace a tu correo"><ForgotPasswordPage /></AuthCard>
}

function ResetRoute() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  return (
    <AuthCard title="Nueva contraseña" subtitle="Define una contraseña nueva para tu cuenta">
      <ResetPasswordPage token={params.get('token') ?? ''} onSuccess={() => navigate('/login')} />
    </AuthCard>
  )
}

function VerifyRoute() {
  const [params] = useSearchParams()
  return <AuthCard title="Verificación de correo" subtitle="Confirmando tu dirección de correo"><VerifyEmailPage token={params.get('token') ?? ''} /></AuthCard>
}

// ── Authenticated helpers ─────────────────────────────────────────────────────

function AppRedirect() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.rol === 'ADMINISTRADOR') return <Navigate to="/admin" replace />
  if (user.rol === 'TRABAJADOR') return <Navigate to="/panel" replace />
  return <Navigate to="/mis-tickets" replace />
}

function DetailRoute() {
  const { id } = useParams()
  const navigate = useNavigate()
  return <TicketDetailPage ticketId={id ?? ''} onBack={() => navigate('/app')} />
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider service={authService}>
        <CatalogProvider service={catalogService}>
          <Routes>
            <Route element={<SiteLayout />}>
              {/* Public marketing site */}
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/clientes" element={<Clients />} />

              {/* Auth */}
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/register" element={<RegisterRoute />} />
              <Route path="/forgot-password" element={<ForgotRoute />} />
              <Route path="/reset-password" element={<ResetRoute />} />
              <Route path="/verify-email" element={<VerifyRoute />} />

              {/* Authenticated app */}
              <Route path="/app" element={<ProtectedRoute><AppRedirect /></ProtectedRoute>} />
              <Route path="/mis-tickets" element={<ProtectedRoute roles={['CLIENTE']}><ClientDashboard /></ProtectedRoute>} />
              <Route path="/panel" element={<ProtectedRoute roles={['TRABAJADOR']}><WorkerDashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute roles={['ADMINISTRADOR']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/tickets/:id" element={<ProtectedRoute><DetailRoute /></ProtectedRoute>} />
              <Route path="/notificaciones" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </CatalogProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
