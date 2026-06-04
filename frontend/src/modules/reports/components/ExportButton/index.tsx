import { useState } from 'react'
import type { ReportFormat } from '../../interfaces/IReportsService'

interface ExportButtonProps {
  onExport: (formato: ReportFormat) => Promise<void>
}

const FORMATS: { value: ReportFormat; label: string }[] = [
  { value: 'csv', label: 'CSV' },
  { value: 'excel', label: 'Excel' },
  { value: 'pdf', label: 'PDF' },
]

/** SRP: triggers a report export in the chosen format. */
export function ExportButton({ onExport }: ExportButtonProps) {
  const [busy, setBusy] = useState<ReportFormat | null>(null)

  const handle = async (fmt: ReportFormat) => {
    setBusy(fmt)
    try { await onExport(fmt) } finally { setBusy(null) }
  }

  return (
    <div className="flex gap-2">
      {FORMATS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          disabled={busy !== null}
          onClick={() => void handle(value)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          {busy === value ? '…' : `Exportar ${label}`}
        </button>
      ))}
    </div>
  )
}
