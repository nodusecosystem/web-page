import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Select } from '@/components/ui/Select'

const OPTIONS = [
  { value: 'ghl', label: 'GoHighLevel (GHL)' },
  { value: 'hubspot', label: 'HubSpot' },
]

describe('Select', () => {
  it('associates the label with the select and renders the placeholder', () => {
    render(
      <Select id="crm" label="¿Qué CRM usas?" options={OPTIONS} placeholder="Selecciona una opción" />,
    )

    const select = screen.getByLabelText('¿Qué CRM usas?')
    expect(select).toHaveAttribute('id', 'crm')
    expect(screen.getByRole('option', { name: 'Selecciona una opción' })).toHaveValue('')
    expect(screen.getByRole('option', { name: 'GoHighLevel (GHL)' })).toBeInTheDocument()
  })

  it('selects the given value', () => {
    render(<Select id="crm" label="¿Qué CRM usas?" options={OPTIONS} value="ghl" onChange={() => undefined} />)
    expect(screen.getByLabelText('¿Qué CRM usas?')).toHaveValue('ghl')
  })

  it('marks the field as invalid and announces the error', () => {
    render(<Select id="crm" label="¿Qué CRM usas?" options={OPTIONS} error="Este campo es obligatorio" />)

    const select = screen.getByLabelText('¿Qué CRM usas?')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAttribute('aria-describedby', 'crm-error')

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Este campo es obligatorio')
    expect(alert).toHaveAttribute('id', 'crm-error')
  })

  it('renders the hint and links it with aria-describedby', () => {
    render(
      <Select
        id="crm"
        label="¿Qué CRM usas?"
        options={OPTIONS}
        hint="Si usas GoHighLevel necesitamos el Calendar ID."
      />,
    )

    expect(screen.getByLabelText('¿Qué CRM usas?')).toHaveAttribute(
      'aria-describedby',
      'crm-hint',
    )
    expect(screen.getByText('Si usas GoHighLevel necesitamos el Calendar ID.')).toHaveAttribute(
      'id',
      'crm-hint',
    )
  })

  it('updates the value on change', () => {
    render(<Select id="crm" label="¿Qué CRM usas?" options={OPTIONS} />)
    const select = screen.getByLabelText('¿Qué CRM usas?') as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'hubspot' } })
    expect(select.value).toBe('hubspot')
  })
})
