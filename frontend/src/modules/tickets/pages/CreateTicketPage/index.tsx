import { useCatalog } from '../../../catalog/hooks/useCatalog'
import { CreateTicketForm } from '../../components/CreateTicketForm'

interface CreateTicketPageProps {
  onCreated?: (ticketId: string) => void
}

/**
 * SRP: page wrapper that supplies the service options to CreateTicketForm.
 * DIP: services loaded via useCatalog (ICatalogClientView); creation via the form's
 * useTicketsList (ITicketClientActions). Must render inside both providers.
 */
export function CreateTicketPage({ onCreated }: CreateTicketPageProps) {
  const { services, isLoading } = useCatalog()

  if (isLoading) {
    return <p className="text-sm text-gray-400 py-8">Cargando servicios…</p>
  }

  return (
    <section className="max-w-xl mx-auto">
      <header className="mb-5">
        <h1 className="text-xl font-semibold text-gray-900">Crear ticket</h1>
        <p className="text-sm text-gray-500 mt-0.5">Describe tu solicitud de soporte.</p>
      </header>
      <CreateTicketForm
        services={services.map((s) => ({ id: s.id, nombre: s.nombre }))}
        onSuccess={onCreated}
      />
    </section>
  )
}
