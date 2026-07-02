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

import { BrowserRouter, Routes, Route, Outlet, Navigate, Link, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom'
import { lazy, Suspense, type ReactNode } from 'react'
import { AnimatePresence } from 'framer-motion'

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
import { CursorFollower } from './core/ui/CursorFollower'
import { PageTransition } from './core/ui/PageTransition'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './core/ui/card'

// Auth (eager: pequeños y compartidos por los wrappers de AuthCard)
import { ProtectedRoute } from './modules/auth/components/ProtectedRoute'
import { LoginForm } from './modules/auth/components/LoginForm'
import { RegisterForm } from './modules/auth/components/RegisterForm'

// Páginas cargadas bajo demanda (code-splitting → chunk por ruta)
const Home = lazy(() => import('./modules/public/pages/Home').then(m => ({ default: m.Home })))
const About = lazy(() => import('./modules/public/pages/About').then(m => ({ default: m.About })))
const Services = lazy(() => import('./modules/public/pages/Services').then(m => ({ default: m.Services })))
const Gallery = lazy(() => import('./modules/public/pages/Gallery').then(m => ({ default: m.Gallery })))
const Clients = lazy(() => import('./modules/public/pages/Clients').then(m => ({ default: m.Clients })))

const ForgotPasswordPage = lazy(() => import('./modules/auth/pages/ForgotPasswordPage').then(m => ({ default: m.ForgotPasswordPage })))
const ResetPasswordPage = lazy(() => import('./modules/auth/pages/ResetPasswordPage').then(m => ({ default: m.ResetPasswordPage })))
const VerifyEmailPage = lazy(() => import('./modules/auth/pages/VerifyEmailPage').then(m => ({ default: m.VerifyEmailPage })))

const ClientDashboard = lazy(() => import('./modules/dashboard/ClientDashboard').then(m => ({ default: m.ClientDashboard })))
const WorkerDashboard = lazy(() => import('./modules/dashboard/WorkerDashboard').then(m => ({ default: m.WorkerDashboard })))
const AdminDashboard = lazy(() => import('./modules/dashboard/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const TicketDetailPage = lazy(() => import('./modules/tickets/pages/TicketDetailPage').then(m => ({ default: m.TicketDetailPage })))
const NotificationsPage = lazy(() => import('./modules/notifications/pages/NotificationsPage').then(m => ({ default: m.NotificationsPage })))

// ── Shared layout ─────────────────────────────────────────────────────────────

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-brand-cyan border-t-transparent animate-spin" aria-label="Cargando" />
    </div>
  )
}

function SiteLayout() {
  const { user } = useAuth()
  const location = useLocation()
  const tree = (
    <div className="min-h-screen flex flex-col bg-white">
      <CursorFollower />
      <Navbar />
      <main className="grow">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageFallback />}>
            <PageTransition key={location.pathname} className="min-h-full">
              <Outlet />
            </PageTransition>
          </Suspense>
        </AnimatePresence>
      </main>
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
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-linear-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Brillo de marca sutil de fondo */}
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-xl rounded-full bg-brand-cyan/10 blur-3xl" />
        <div className="relative w-full max-w-md">
          <div className="mb-6 flex justify-center">
            <Link to="/" className="inline-flex items-center rounded-full border-2 border-brand-navy bg-brand-navy px-5 py-1.5">
              <span className="tracking-wider font-semibold text-brand-cyan">SASS BLUM</span>
            </Link>
          </div>
          <Card className="w-full shadow-xl shadow-slate-900/6 border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
              <CardDescription>{subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              {children}
              {footer && <div className="mt-6 pt-6 border-t text-center text-sm text-muted-foreground">{footer}</div>}
            </CardContent>
          </Card>
        </div>
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
      footer={<>¿No tienes cuenta? <Link to="/register" className="text-brand-cyan-dark font-medium hover:underline">Regístrate</Link>{' · '}<Link to="/forgot-password" className="text-brand-cyan-dark font-medium hover:underline">Olvidé mi contraseña</Link></>}
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
      footer={<>¿Ya tienes cuenta? <Link to="/login" className="text-brand-cyan-dark font-medium hover:underline">Inicia sesión</Link></>}
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
