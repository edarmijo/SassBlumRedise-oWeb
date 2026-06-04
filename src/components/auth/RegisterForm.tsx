import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterFormProps {
  onSuccess: () => void;
  onLoginClick: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onLoginClick }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    empresa: '',
    telefono: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validaciones
    if (!formData.nombre || !formData.email || !formData.password) {
      setError('Por favor complete todos los campos obligatorios');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor ingrese un correo electrónico válido');
      return;
    }

    const registered = register({
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      rol: 'cliente',
      empresa: formData.empresa,
      telefono: formData.telefono
    });

    if (registered) {
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setError('Este correo electrónico ya está registrado');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>
            Regístrate para acceder al sistema de tickets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-900 border-green-200">
                <AlertDescription>
                  ¡Registro exitoso! Redirigiendo al inicio de sesión...
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo *</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                name="empresa"
                type="text"
                placeholder="Nombre de tu empresa"
                value={formData.empresa}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="+593 9 9999 9999"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={success}>
              Crear cuenta
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            variant="link"
            onClick={onLoginClick}
            className="w-full"
          >
            ¿Ya tienes cuenta? Inicia sesión aquí
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
