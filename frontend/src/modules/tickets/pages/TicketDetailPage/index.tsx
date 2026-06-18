import { ArrowLeft } from 'lucide-react'
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
    <section className="max-w-3xl mx-auto px-4 py-8 space-y-5">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-brand-cyan-dark transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al historial
        </button>
      )}
      <div className="bg-card border border-border rounded-xl shadow-sm p-6">
        <TicketDetail ticketId={ticketId} />
      </div>
    </section>
  )
}
