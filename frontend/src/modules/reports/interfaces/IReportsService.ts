/**
 * IReportsService — FE contract for the reports module (DIP anchor).
 * SOLID: DIP · OCP.
 */

export interface ReportSummary {
  total: number
  abiertos: number
  cerrados: number
  porEstado: Record<string, number>
  porPrioridad: Record<string, number>
}

export type ReportFormat = 'csv' | 'pdf' | 'excel'

export interface ReportFilters {
  estado?: string
  servicioId?: string
  fechaDesde?: string
  fechaHasta?: string
}

export interface IReportsService {
  getDashboard(filters?: ReportFilters): Promise<ReportSummary>
  exportReport(formato: ReportFormat, filters?: ReportFilters): Promise<void>
}
