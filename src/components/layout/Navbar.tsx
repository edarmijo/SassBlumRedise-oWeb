import React, { useState } from 'react';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const { notifications } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadNotifications = notifications.filter(
    n => n.usuarioId === currentUser?.id && !n.leida
  ).length;

  const getNavItems = () => {
    const publicItems = [
      { id: 'home', label: 'INICIO' },
      { id: 'about', label: 'NOSOTROS' },
      { id: 'services', label: 'SERVICIOS' },
      { id: 'gallery', label: 'GALERÍA' },
      { id: 'clients', label: 'CLIENTES' }
    ];

    if (!currentUser) {
      return [...publicItems, { id: 'login', label: 'INGRESAR' }];
    }

    if (currentUser.rol === 'cliente') {
      return [
        ...publicItems,
        { id: 'client-dashboard', label: 'MIS TICKETS' }
      ];
    }

    if (currentUser.rol === 'trabajador') {
      return [
        ...publicItems,
        { id: 'worker-dashboard', label: 'PANEL TRABAJADOR' }
      ];
    }

    if (currentUser.rol === 'administrador') {
      return [
        ...publicItems,
        { id: 'admin-dashboard', label: 'ADMIN' }
      ];
    }

    return publicItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-[#0a1628] text-white sticky top-0 z-50 border-b border-[#1e3a5f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="border-2 border-[#00d4ff] rounded-full px-4 py-1">
              <span className="text-[#00d4ff] tracking-wider">SASS BLUM</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`hover:text-[#00d4ff] transition-colors ${
                  currentPage === item.id ? 'text-[#00d4ff]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser && (
              <>
                {/* Notifications */}
                <button
                  onClick={() => onNavigate('notifications')}
                  className="relative hover:text-[#00d4ff] transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                      {unreadNotifications}
                    </Badge>
                  )}
                </button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{currentUser.nombre}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          {currentUser.rol}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-[#1e3a5f] rounded ${
                  currentPage === item.id ? 'text-[#00d4ff] bg-[#1e3a5f]' : ''
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser && (
              <>
                <button
                  onClick={() => {
                    onNavigate('notifications');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-[#1e3a5f] rounded"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notificaciones
                  {unreadNotifications > 0 && (
                    <Badge className="ml-2 bg-red-500">{unreadNotifications}</Badge>
                  )}
                </button>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 hover:bg-[#1e3a5f] rounded text-red-400"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
