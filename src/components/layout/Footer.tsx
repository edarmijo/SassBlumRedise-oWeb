import React from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a1628] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dirección */}
          <div>
            <h3 className="text-[#00d4ff] uppercase mb-4">Dirección</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <p>Guayaquil - Ecuador</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <h3 className="text-[#00d4ff] uppercase mb-4">Email</h3>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <a href="mailto:info@sassblum.com" className="hover:text-[#00d4ff] transition-colors">
                info@sassblum.com
              </a>
            </div>
          </div>

          {/* Teléfonos */}
          <div>
            <h3 className="text-[#00d4ff] uppercase mb-4">Teléfonos</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+593 9 9999 9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+593 9 3030 8319</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1e3a5f]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              Puedes conocernos a través de nuestras redes sociales
            </p>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00d4ff] transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} sassblum.com. All Rights reserved. Designed by XandTech
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Productos */}
      <div className="bg-[#050d1a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-[#00d4ff] uppercase mb-4 text-center">Nuestros Productos</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
            <span>• Mantenimiento IT</span>
            <span>• Soporte Técnico</span>
            <span>• Cableado Estructurado</span>
            <span>• Sistema de Vigilancia CCTV</span>
            <span>• Domótica</span>
            <span>• Venta de Tóner y más</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
