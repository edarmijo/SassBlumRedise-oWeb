import { TicketDetail } from '../../components/TicketDetail'

interface TicketDetailPageProps {
  ticketId: string
  onBack?: () => void
}

/**
 * SRP: page wrapper around the TicketDetail component (S17), which already loads
 * the ticket + event timeline via useTicketDetail (DIP). This page only adds
 * page-level chrome (back navigation).
 */
export function TicketDetailPage({ ticketId, onBack }: TicketDetailPageProps) {
  return (
    <section className="max-w-3xl mx-auto space-y-4">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <span aria-hidden>←</span> Volver al historial
        </button>
      )}
      <TicketDetail ticketId={ticketId} />
    </section>
  )
}
