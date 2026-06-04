import { useReports } from '../../hooks/useReports'
import { ExportButton } from '../ExportButton'

/**
 * SRP: renders KPI cards + breakdowns + export. DIP: data via useReports (IReportsService).
 * Admin-only page. A real chart lib (Recharts) can replace the bars without touching this.
 */
export function ReportsDashboard() {
  const { summary, isLoading, error, exportReport } = useReports()

  if (isLoading) return <p className="text-sm text-gray-400 py-8">Cargando reporte…</p>
  if (error) return <p className="text-sm text-red-600">{error}</p>
  if (!summary) return null

  const maxEstado = Math.max(1, ...Object.values(summary.porEstado))

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Reportes</h1>
          <p className="text-sm text-gray-500 mt-0.5">Resumen de tickets del sistema.</p>
        </div>
        <ExportButton onExport={exportReport} />
      </header>

      <div className="grid grid-cols-3 gap-3">
        <Kpi label="Total" value={summary.total} />
        <Kpi label="Abiertos" value={summary.abiertos} accent="text-yellow-600" />
        <Kpi label="Cerrados" value={summary.cerrados} accent="text-green-600" />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Por estado</h2>
        <div className="space-y-2">
          {Object.entries(summary.porEstado).map(([estado, n]) => (
            <div key={estado} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-24">{estado}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(n / maxEstado) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Kpi({ label, value, accent = 'text-gray-900' }: { label: string; value: number; accent?: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${accent}`}>{value}</p>
    </div>
  )
}
