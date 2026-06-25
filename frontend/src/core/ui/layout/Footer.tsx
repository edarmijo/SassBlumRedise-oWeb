import { Mail, Phone, MapPin, AtSign } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-brand-cyan uppercase mb-4">Dirección</h3>
            <div className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 mt-1 shrink-0" />
              <p>Guayaquil - Ecuador</p>
            </div>
          </div>
          <div>
            <h3 className="text-brand-cyan uppercase mb-4">Email</h3>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <a href="mailto:info@sassblum.com" className="hover:text-brand-cyan transition-colors">info@sassblum.com</a>
            </div>
          </div>
          <div>
            <h3 className="text-brand-cyan uppercase mb-4">Teléfonos</h3>
            <div className="space-y-2">
              <a href="tel:+59396999090" className="flex items-center space-x-2 hover:text-brand-cyan transition-colors"><Phone className="h-5 w-5" /><span>+593 9 6999 0990</span></a>
              <a href="tel:+593995286319" className="flex items-center space-x-2 hover:text-brand-cyan transition-colors"><Phone className="h-5 w-5" /><span>+593 9 9528 6319</span></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">Puedes conocernos a través de nuestras redes sociales</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="https://instagram.com/sassblum" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand-cyan transition-colors" aria-label="Instagram @sassblum">
                <AtSign className="h-6 w-6" />
                <span className="text-sm">@sassblum</span>
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} sassblum.com. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>

      <div className="bg-brand-navy-deep py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-brand-cyan uppercase mb-4 text-center">Nuestros Productos</h4>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
            <span>• Infraestructura IT</span>
            <span>• Soporte Técnico</span>
            <span>• Cableado Estructurado</span>
            <span>• Sistema de Vigilancia CCTV</span>
            <span>• Domótica</span>
            <span>• Venta de Servidores</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
