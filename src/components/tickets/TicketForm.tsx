import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { servicios } from '../../utils/mockData';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';
import { ServiceType } from '../../types';

interface TicketFormProps {
  onSuccess?: () => void;
}

export const TicketForm: React.FC<TicketFormProps> = ({ onSuccess }) => {
  const { createTicket } = useData();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    servicio: '' as ServiceType | '',
    asunto: '',
    descripcion: '',
    prioridad: 'media' as 'baja' | 'media' | 'alta'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.servicio) {
      setError('Por favor selecciona un tipo de servicio');
      return;
    }

    if (!formData.asunto || formData.asunto.trim() === '') {
      setError('Por favor ingresa un asunto');
      return;
    }

    if (formData.asunto.length > 80) {
      setError('El asunto no puede exceder 80 caracteres');
      return;
    }

    if (!formData.descripcion || formData.descripcion.trim() === '') {
      setError('Por favor ingresa una descripción');
      return;
    }

    if (!currentUser) return;

    try {
      const newTicket = createTicket({
        clienteId: currentUser.id,
        servicio: formData.servicio as ServiceType,
        asunto: formData.asunto.trim(),
        descripcion: formData.descripcion.trim(),
        estado: 'nuevo',
        prioridad: formData.prioridad
      });

      toast.success('Ticket creado exitosamente', {
        description: `Número de ticket: ${newTicket.numero}`
      });

      // Reset form
      setFormData({
        servicio: '' as ServiceType | '',
        asunto: '',
        descripcion: '',
        prioridad: 'media'
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('Error al crear el ticket. Por favor intenta de nuevo.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nuevo Ticket</CardTitle>
        <CardDescription>
          Completa el formulario para solicitar un servicio
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
            <Label htmlFor="servicio">Tipo de servicio *</Label>
            <Select
              value={formData.servicio}
              onValueChange={(value) => setFormData(prev => ({ ...prev, servicio: value as ServiceType }))}
            >
              <SelectTrigger id="servicio">
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {servicios.map(servicio => (
                  <SelectItem key={servicio.id} value={servicio.id}>
                    {servicio.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="asunto">Asunto * (máx. 80 caracteres)</Label>
            <Input
              id="asunto"
              type="text"
              placeholder="Describe brevemente tu solicitud"
              value={formData.asunto}
              onChange={(e) => setFormData(prev => ({ ...prev, asunto: e.target.value }))}
              maxLength={80}
            />
            <p className="text-xs text-gray-500">
              {formData.asunto.length}/80 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prioridad">Prioridad</Label>
            <Select
              value={formData.prioridad}
              onValueChange={(value) => setFormData(prev => ({ ...prev, prioridad: value as 'baja' | 'media' | 'alta' }))}
            >
              <SelectTrigger id="prioridad">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baja">Baja</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="alta">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              placeholder="Proporciona todos los detalles necesarios sobre tu solicitud"
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              rows={5}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full bg-[#00d4ff] hover:bg-[#00b8dd]"
        >
          Crear Ticket
        </Button>
      </CardFooter>
    </Card>
  );
};
