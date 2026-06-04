import React, { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { Card, CardContent } from '../components/ui/card';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const featuredProjects = [
    {
      url: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2VydmVyJTIwcm9vbXxlbnwxfHx8fDE3NjI2MzY2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Centro de Datos Corporativo',
      description: 'Instalación completa de infraestructura IT para empresa líder del sector',
      category: 'Infraestructura IT'
    },
    {
      url: 'https://images.unsplash.com/photo-1758514474995-390bfe57c5be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJ2ZWlsbGFuY2UlMjBjYW1lcmElMjBzeXN0ZW18ZW58MXx8fHwxNzYyNjM2NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Sistema CCTV de Alta Seguridad',
      description: 'Implementación de videovigilancia con tecnología 4K y análisis inteligente',
      category: 'Seguridad'
    },
    {
      url: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBuZXR3b3JrJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzYyNjM2NTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Red Corporativa Enterprise',
      description: 'Diseño e implementación de red de fibra óptica de alta velocidad',
      category: 'Redes'
    },
    {
      url: 'https://images.unsplash.com/photo-1753039495488-434a2fe53e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBkZXZpY2V8ZW58MXx8fHwxNzYyNjM2NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Automatización Inteligente',
      description: 'Soluciones de domótica para oficinas modernas y espacios residenciales',
      category: 'Automatización'
    },
    {
      url: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyNjI4MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Espacios de Trabajo Modernos',
      description: 'Integración tecnológica completa para ambientes corporativos',
      category: 'Infraestructura'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-[#0a1628] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl mb-4">Galería</h1>
          <p className="text-xl text-gray-300">
            Conoce algunos de nuestros proyectos y servicios
          </p>
        </div>
      </div>

      {/* Featured Projects Carousel */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-[#0a1628]">Proyectos Destacados</h2>
            <p className="text-lg text-gray-600">
              Descubre nuestros trabajos más recientes e innovadores
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProjects.map((project, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-none shadow-lg overflow-hidden group">
                      <CardContent className="p-0">
                        <div 
                          className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                          onClick={() => setSelectedImage(project.url)}
                        >
                          <ImageWithFallback
                            src={project.url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-transparent opacity-90" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="inline-block px-3 py-1 bg-[#00d4ff] text-[#0a1628] rounded-full text-sm mb-3">
                              {project.category}
                            </div>
                            <h3 className="text-2xl mb-2">{project.title}</h3>
                            <p className="text-gray-200 text-sm">{project.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-[#00d4ff] text-[#0a1628] hover:bg-[#00d4ff]/90 border-none" />
            <CarouselNext className="hidden md:flex -right-12 bg-[#00d4ff] text-[#0a1628] hover:bg-[#00d4ff]/90 border-none" />
          </Carousel>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <ImageWithFallback
            src={selectedImage}
            alt="Vista ampliada"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
