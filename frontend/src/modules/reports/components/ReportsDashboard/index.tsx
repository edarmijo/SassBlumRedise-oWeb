import { useReports } from '../../hooks/useReports'
import { ExportButton } from '../ExportButton'

/**
 * SRP: renders KPI cards + breakdowns + export. DIP: data via useReports (IReportsService).
 * Admin-only page. A real chart lib (Recharts) can replace the bars without touching this.
 */
export function ReportsDashboard() {
  const { summary, isLoading, error, exportReport } = useReports()

  if (isLoading) return <p className="text-sm text-muted-foreground py-8">Cargando reporte…</p>
  if (error) return <p className="text-sm text-destructive">{error}</p>
  if (!summary) return null

  const maxEstado = Math.max(1, ...Object.values(summary.porEstado))

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-foreground">Reportes</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Resumen de tickets del sistema.</p>
        </div>
        <ExportButton onExport={exportReport} />
      </header>

      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Kpi label="Total" value={summary.total} accent="text-foreground" />
        <Kpi label="Abiertos" value={summary.abiertos} accent="text-amber-600" />
        <Kpi label="Cerrados" value={summary.cerrados} accent="text-green-600" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Por estado</h3>
        <div className="space-y-2.5">
          {Object.entries(summary.porEstado).map(([estado, n]) => (
            <div key={estado} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-24 shrink-0">{estado}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-brand-cyan-dark h-full rounded-full transition-[width] duration-500" style={{ width: `${(n / maxEstado) * 100}%` }} />
              </div>
              <span className="text-xs font-medium text-foreground w-8 text-right tabular-nums">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Kpi({ label, value, accent = 'text-foreground' }: { label: string; value: number; accent?: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`text-2xl font-bold mt-1 tabular-nums ${accent}`}>{value}</p>
    </div>
  )
}
