import React from 'react';
import { Users, Award, Target, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0a1628] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Nosotros</h1>
          <p className="text-xl text-gray-300">
            Conoce más sobre Sass Blum y nuestro compromiso con la innovación
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <p className="text-[#00d4ff] uppercase mb-2">ACERCA DE NOSOTROS</p>
              <h2 className="text-3xl md:text-4xl mb-4">
                20+ Años de experiencia
              </h2>
              <p className="text-lg mb-6">
                En innovación tecnológica
              </p>
              <p className="text-gray-700 mb-4">
                SASS BLUM se especializa en soluciones IT integrales, ofreciendo servicios innovadores a empresas e 
                industrias. Con más de 20 años en el mercado, lideramos proyectos y brindamos servicios para distintos 
                proveedores de tecnología.
              </p>
              <p className="text-gray-700">
                Nuestro equipo de expertos trabaja con las últimas tecnologías para ofrecer soluciones personalizadas 
                que se adaptan a las necesidades específicas de cada cliente, garantizando eficiencia, seguridad y 
                escalabilidad en todos nuestros servicios.
              </p>
            </div>
            <div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbWVldGluZyUyMG9mZmljZXxlbnwxfHx8fDE3NjI1Mzg5NjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Equipo Sass Blum"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Valores */}
          <div className="mb-20">
            <h2 className="text-3xl text-center mb-12">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                  <Users className="h-8 w-8 text-[#00d4ff]" />
                </div>
                <h3 className="text-xl mb-2">Trabajo en Equipo</h3>
                <p className="text-gray-600">
                  Colaboración y comunicación efectiva en cada proyecto
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                  <Award className="h-8 w-8 text-[#00d4ff]" />
                </div>
                <h3 className="text-xl mb-2">Excelencia</h3>
                <p className="text-gray-600">
                  Compromiso con la calidad y mejora continua
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                  <Target className="h-8 w-8 text-[#00d4ff]" />
                </div>
                <h3 className="text-xl mb-2">Innovación</h3>
                <p className="text-gray-600">
                  Soluciones tecnológicas de vanguardia
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00d4ff] bg-opacity-10 mb-4">
                  <Heart className="h-8 w-8 text-[#00d4ff]" />
                </div>
                <h3 className="text-xl mb-2">Compromiso</h3>
                <p className="text-gray-600">
                  Dedicación total con nuestros clientes
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#0a1628] text-white rounded-lg p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl text-[#00d4ff] mb-2">20+</div>
                <p className="text-gray-300">Años de experiencia</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl text-[#00d4ff] mb-2">500+</div>
                <p className="text-gray-300">Proyectos completados</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl text-[#00d4ff] mb-2">200+</div>
                <p className="text-gray-300">Clientes satisfechos</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl text-[#00d4ff] mb-2">24/7</div>
                <p className="text-gray-300">Soporte técnico</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-[#00d4ff]">Nuestra Misión</h2>
              <p className="text-gray-700">
                Proveer soluciones tecnológicas innovadoras y de alta calidad que impulsen el crecimiento y la 
                eficiencia de nuestros clientes, mediante un equipo comprometido con la excelencia y el servicio 
                personalizado.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4 text-[#00d4ff]">Nuestra Visión</h2>
              <p className="text-gray-700">
                Ser la empresa líder en soluciones IT en Ecuador y la región, reconocida por nuestra innovación, 
                calidad de servicio y compromiso con la transformación digital de las organizaciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
