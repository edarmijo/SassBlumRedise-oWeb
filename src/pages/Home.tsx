import React from 'react';
import { Button } from '../components/ui/button';
import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#0a1628] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2300d4ff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <p className="text-[#00d4ff] mb-4 uppercase tracking-wide">SASS BLUM</p>
            <h1 className="text-4xl md:text-6xl mb-6 max-w-4xl mx-auto">
              Innovación tecnológica para tu negocio
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Soluciones integrales en tecnología con más de 20 años de experiencia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#00d4ff] hover:bg-[#00b8dd] text-white"
                onClick={() => onNavigate('services')}
              >
                Nuestros Servicios
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white"
                onClick={() => onNavigate('about')}
              >
                Conocer más
              </Button>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-[#00d4ff]" />
          </div>
        </div>
      </div>

      {/* Servicios destacados */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#00d4ff] uppercase mb-2">SERVICIOS</p>
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Áreas de experiencia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer" onClick={() => onNavigate('services')}>
              <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBuZXR3b3JrJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzYyNjM2NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Infraestructura IT"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl mb-2">Infraestructura IT</h3>
              <p className="text-gray-600">Diseño e implementación de soluciones tecnológicas robustas</p>
            </div>

            <div className="group cursor-pointer" onClick={() => onNavigate('services')}>
              <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1566060475410-1159300f046f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMGNhbWVyYSUyMENDVFZ8ZW58MXx8fHwxNzYyNjM2NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="CCTV"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl mb-2">CCTV</h3>
              <p className="text-gray-600">Sistemas de videovigilancia y seguridad avanzados</p>
            </div>

            <div className="group cursor-pointer" onClick={() => onNavigate('services')}>
              <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1679356505858-bf4129177392?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9ufGVufDF8fHx8MTc2MjU5OTE4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Domótica"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl mb-2">Domótica</h3>
              <p className="text-gray-600">Automatización inteligente para espacios modernos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sobre nosotros preview */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NjI1Mzg5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Equipo Sass Blum"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <p className="text-[#00d4ff] uppercase mb-2">ACERCA DE NOSOTROS</p>
              <h2 className="text-3xl md:text-4xl mb-4">
                20+ Años de experiencia
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                En innovación tecnológica
              </p>
              <p className="text-gray-700 mb-6">
                SASS BLUM se especializa en soluciones IT integrales, ofreciendo servicios innovadores a empresas e 
                industrias, liderando proyectos y venta de servicios para distintos proveedores de tecnología.
              </p>
              <Button
                onClick={() => onNavigate('about')}
                className="bg-[#00d4ff] hover:bg-[#00b8dd]"
              >
                Conocer más
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#0a1628] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-4">
            ¿Necesitas ayuda con un proyecto?
          </h2>
          <p className="text-gray-300 mb-8">
            Nuestro equipo está listo para ayudarte con soluciones tecnológicas personalizadas
          </p>
          <Button
            size="lg"
            className="bg-[#00d4ff] hover:bg-[#00b8dd]"
            onClick={() => onNavigate('login')}
          >
            Crear un ticket
          </Button>
        </div>
      </div>
    </div>
  );
};
