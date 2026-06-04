import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onSuccess: () => void;
  onRegisterClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onRegisterClick }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor complete todos los campos');
      return;
    }

    const success = login(email, password);
    
    if (success) {
      onSuccess();
    } else {
      setError('Credenciales incorrectas o cuenta bloqueada');
    }
  };

  const fillDemoCredentials = (role: 'admin' | 'worker' | 'client') => {
    const credentials = {
      admin: { email: 'admin@sassblum.com', password: 'admin123' },
      worker: { email: 'trabajador@sassblum.com', password: 'trabajador123' },
      client: { email: 'cliente@example.com', password: 'cliente123' }
    };

    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Ingresar
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-3">Credenciales de prueba:</p>
            <div className="grid grid-cols-1 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('admin')}
              >
                Administrador
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('worker')}
              >
                Trabajador
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('client')}
              >
                Cliente
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="link"
            onClick={onRegisterClick}
            className="w-full"
          >
            ¿No tienes cuenta? Regístrate aquí
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
