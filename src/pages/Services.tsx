import React from 'react';
import { Headphones, Wifi, Printer, Server, Camera, Home } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '../contexts/AuthContext';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, any> = {
  Headphones,
  Wifi,
  Printer,
  Server,
  Camera,
  Home
};

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();

  const services = [
    {
      icon: 'Headphones',
      title: 'Soporte Técnico',
      description: 'Asistencia técnica especializada para resolver problemas informáticos de manera rápida y efectiva.',
      details: [
        'Soporte remoto y presencial',
        'Diagnóstico y resolución de problemas',
        'Mantenimiento preventivo y correctivo',
        'Asesoría tecnológica personalizada'
      ]
    },
    {
      icon: 'Wifi',
      title: 'Wi-Fi',
      description: 'Instalación y configuración de redes inalámbricas de alta velocidad y cobertura completa.',
      details: [
        'Diseño de redes inalámbricas',
        'Instalación de access points',
        'Optimización de señal y velocidad',
        'Seguridad de red Wi-Fi'
      ]
    },
    {
      icon: 'Printer',
      title: 'Taller de Impresoras',
      description: 'Mantenimiento y reparación especializada de equipos de impresión de todas las marcas.',
      details: [
        'Mantenimiento preventivo',
        'Reparación de impresoras',
        'Venta de consumibles y repuestos',
        'Servicio técnico certificado'
      ]
    },
    {
      icon: 'Server',
      title: 'Infraestructura IT',
      description: 'Diseño e implementación de infraestructura tecnológica robusta y escalable.',
      details: [
        'Cableado estructurado',
        'Servidores y almacenamiento',
        'Virtualización',
        'Respaldo y recuperación de datos'
      ]
    },
    {
      icon: 'Camera',
      title: 'CCTV',
      description: 'Sistemas de videovigilancia y seguridad con tecnología de punta.',
      details: [
        'Instalación de cámaras IP',
        'Sistemas de grabación',
        'Monitoreo remoto',
        'Análisis de video inteligente'
      ]
    },
    {
      icon: 'Home',
      title: 'Domótica',
      description: 'Automatización inteligente para hogares y negocios modernos.',
      details: [
        'Control de iluminación',
        'Automatización de climatización',
        'Seguridad inteligente',
        'Control por voz y aplicaciones'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0a1628] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Servicios</h1>
          <p className="text-xl text-gray-300">
            Soluciones tecnológicas integrales para tu empresa
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon];
              
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                      <Icon className="h-8 w-8 text-[#00d4ff]" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-[#00d4ff] mr-2">•</span>
                          <span className="text-sm text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">
            ¿Necesitas alguno de estos servicios?
          </h2>
          <p className="text-gray-600 mb-8">
            {currentUser 
              ? 'Crea un ticket y nuestro equipo te contactará pronto'
              : 'Regístrate para crear un ticket y nuestro equipo te contactará pronto'
            }
          </p>
          <Button
            size="lg"
            className="bg-[#00d4ff] hover:bg-[#00b8dd]"
            onClick={() => onNavigate(currentUser ? 'client-dashboard' : 'login')}
          >
            {currentUser ? 'Crear ticket' : 'Registrarse ahora'}
          </Button>
        </div>
      </div>
    </div>
  );
};
