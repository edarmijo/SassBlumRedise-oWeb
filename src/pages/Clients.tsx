import React from 'react';
import { Building2, Laptop, Lightbulb, Globe, Monitor, BriefcaseBusiness, CheckCircle2 } from 'lucide-react';

const iconMap: Record<string, any> = {
  Building2,
  Laptop,
  Lightbulb,
  Globe,
  Monitor,
  BriefcaseBusiness
};

export const Clients: React.FC = () => {
  const clients = [
    { nombre: 'Empresa XYZ', logo: 'Building2', sector: 'Retail' },
    { nombre: 'TechCorp', logo: 'Laptop', sector: 'Tecnología' },
    { nombre: 'Innovatech', logo: 'Lightbulb', sector: 'Innovación' },
    { nombre: 'Global Solutions', logo: 'Globe', sector: 'Consultoría' },
    { nombre: 'Digital Systems', logo: 'Monitor', sector: 'Software' },
    { nombre: 'Smart Business', logo: 'BriefcaseBusiness', sector: 'Negocios' }
  ];

  const testimonials = [
    {
      name: 'María García',
      company: 'Empresa XYZ',
      text: 'Excelente servicio. Sass Blum nos ayudó a modernizar toda nuestra infraestructura IT. El soporte técnico es excepcional.',
      rating: 5
    },
    {
      name: 'Carlos López',
      company: 'TechCorp',
      text: 'Profesionales altamente capacitados. La instalación de nuestro sistema CCTV fue impecable y en tiempo récord.',
      rating: 5
    },
    {
      name: 'Ana Martínez',
      company: 'Global Solutions',
      text: 'Confiamos en Sass Blum para todos nuestros proyectos tecnológicos. Su compromiso y calidad son inigualables.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0a1628] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Nuestros Clientes</h1>
          <p className="text-xl text-gray-300">
            Empresas que confían en nuestros servicios
          </p>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Trabajamos con las mejores empresas</h2>
            <p className="text-gray-600">
              Más de 200 clientes satisfechos en Ecuador y la región
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {clients.map((client, index) => {
              const Icon = iconMap[client.logo];
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-20 h-20 rounded-full bg-[#00d4ff] bg-opacity-10 flex items-center justify-center mb-4">
                    <Icon className="h-10 w-10 text-[#00d4ff]" />
                  </div>
                  <h3 className="text-center mb-1">{client.nombre}</h3>
                  <p className="text-xs text-gray-500">{client.sector}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-600">
              Testimonios reales de empresas satisfechas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p>{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-[#00d4ff]" />
              </div>
              <div className="text-4xl text-[#00d4ff] mb-2">200+</div>
              <p className="text-gray-600">Clientes satisfechos</p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-[#00d4ff]" />
              </div>
              <div className="text-4xl text-[#00d4ff] mb-2">500+</div>
              <p className="text-gray-600">Proyectos completados</p>
            </div>

            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-[#00d4ff]" />
              </div>
              <div className="text-4xl text-[#00d4ff] mb-2">98%</div>
              <p className="text-gray-600">Satisfacción del cliente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
