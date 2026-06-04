import { render, screen } from '@testing-library/react'
import { TicketStatusBadge } from './index'
import type { TicketEstado } from '../../interfaces/ITicketService'

const STATES: TicketEstado[] = ['Nuevo', 'EnProceso', 'EnEspera', 'Resuelto', 'Cerrado']

describe('TicketStatusBadge', () => {
  it.each(STATES)('renders label for estado "%s"', (estado) => {
    render(<TicketStatusBadge estado={estado} />)
    const badge = screen.getByRole('generic', { name: new RegExp(estado, 'i') })
    // aria-label is set on the span
    expect(badge).toBeInTheDocument()
  })

  it('renders "Nuevo" with blue styling', () => {
    const { container } = render(<TicketStatusBadge estado="Nuevo" />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-blue-100')
    expect(badge).toHaveClass('text-blue-800')
  })

  it('renders "Cerrado" with gray styling', () => {
    const { container } = render(<TicketStatusBadge estado="Cerrado" />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-gray-100')
  })

  it('renders "EnProceso" with yellow styling', () => {
    const { container } = render(<TicketStatusBadge estado="EnProceso" />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-yellow-100')
  })

  it('renders "Resuelto" with green styling', () => {
    const { container } = render(<TicketStatusBadge estado="Resuelto" />)
    const badge = container.firstChild as HTMLElement
    expect(badge).toHaveClass('bg-green-100')
  })

  it('includes aria-label with estado', () => {
    render(<TicketStatusBadge estado="EnEspera" />)
    expect(screen.getByLabelText(/en espera/i)).toBeInTheDocument()
  })
})
