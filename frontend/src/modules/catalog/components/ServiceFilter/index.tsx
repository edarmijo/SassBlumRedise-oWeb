import { useState } from 'react'
import type { ServiceFilterOptions } from '../../interfaces/ICatalogService'

interface ServiceFilterProps {
  onChange: (filters: ServiceFilterOptions) => void
}

/** SRP: a single responsibility — emit catalog filter changes (categoría + búsqueda). */
export function ServiceFilter({ onChange }: ServiceFilterProps) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')

  const emit = (next: Partial<{ busqueda: string; categoria: string }>) => {
    const merged = { busqueda, categoria, ...next }
    onChange({
      busqueda: merged.busqueda || undefined,
      categoria: merged.categoria || undefined,
    })
  }

  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="search"
        placeholder="Buscar servicio…"
        value={busqueda}
        onChange={(e) => { setBusqueda(e.target.value); emit({ busqueda: e.target.value }) }}
        className="flex-1 min-w-[200px] rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => { setCategoria(e.target.value); emit({ categoria: e.target.value }) }}
        className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
