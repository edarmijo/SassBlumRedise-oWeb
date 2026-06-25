import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Bell, User, LogOut } from 'lucide-react'
import { Button } from '../button'
import { Badge } from '../badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { useAuth } from '../../../modules/auth/hooks/useAuth'
import { useNotifications } from '../../../modules/notifications/hooks/useNotifications'
import type { UserRole } from '../../../modules/auth/interfaces/IAuthService'

interface NavItem {
  to: string
  label: string
}

const PUBLIC_ITEMS: NavItem[] = [
  { to: '/', label: 'INICIO' },
  { to: '/nosotros', label: 'NOSOTROS' },
  { to: '/servicios', label: 'SERVICIOS' },
  { to: '/galeria', label: 'GALERÍA' },
  { to: '/clientes', label: 'CLIENTES' },
]

const DASHBOARD_BY_ROLE: Record<UserRole, NavItem> = {
  CLIENTE: { to: '/mis-tickets', label: 'MIS TICKETS' },
  TRABAJADOR: { to: '/panel', label: 'PANEL' },
  ADMINISTRADOR: { to: '/admin', label: 'ADMIN' },
}

/** Notification bell + user menu — only mounted when authenticated (inside providers). */
function AuthedActions() {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  if (!user) return null
  return (
    <>
      <Link to="/notificaciones" className="relative hover:text-brand-cyan transition-colors" aria-label="Notificaciones">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 bg-red-500 text-white">
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-brand-cyan hover:bg-brand-border/40">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span>{user.nombre} {user.apellido}</span>
              <span className="text-xs text-muted-foreground capitalize">{user.rol.toLowerCase()}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { void logout(); navigate('/') }}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export function Navbar() {
  const { user } = useAuth()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const items: NavItem[] = [...PUBLIC_ITEMS]
  if (!user) items.push({ to: '/login', label: 'INGRESAR' })
  else items.push(DASHBOARD_BY_ROLE[user.rol])

  const isActive = (to: string) => location.pathname === to

  return (
    <nav
      className={`text-white sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled
          ? 'bg-brand-navy/95 border-b border-brand-border shadow-lg shadow-brand-navy/30'
          : 'bg-brand-navy border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center group">
            <div className="border-2 border-brand-cyan rounded-full px-4 py-1 transition-all duration-300 group-hover:bg-brand-cyan/10 group-hover:shadow-[0_0_20px_-4px_var(--brand-cyan)]">
              <span className="text-brand-cyan tracking-wider font-medium">SASS BLUM</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-7">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative text-sm transition-colors hover:text-brand-cyan ${isActive(item.to) ? 'text-brand-cyan' : ''}`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-cyan transition-all duration-300 ${
                    isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            {user && <AuthedActions />}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileOpen((o) => !o)}>
              {mobileOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 space-y-1">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`block w-full px-4 py-2 rounded hover:bg-brand-border ${isActive(item.to) ? 'text-brand-cyan bg-brand-border' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            {user && (
              <Link to="/notificaciones" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-2 rounded hover:bg-brand-border">
                <Bell className="h-5 w-5 mr-2" /> Notificaciones
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
