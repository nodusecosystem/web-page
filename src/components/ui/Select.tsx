import { ChevronDown } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

export type SelectOption = {
  value: string
  label: string
}

type SelectProps = Omit<ComponentPropsWithoutRef<'select'>, 'children'> & {
  id: string
  label: string
  options: SelectOption[]
  placeholder?: string
  hint?: string
  error?: string
}

export function Select({
  id,
  label,
  options,
  placeholder,
  hint,
  error,
  className,
  ...rest
}: SelectProps) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-dark">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border bg-white pr-10 pl-3.5 text-sm text-dark transition-colors focus:outline-none focus:ring-2',
            error
              ? 'border-red-500 focus:ring-red-200'
              : 'border-dark/15 focus:border-teal-light focus:ring-teal-light/20',
            className,
          )}
          {...rest}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-dark/40"
        />
      </div>
      {hint ? (
        <p id={hintId} className="text-xs text-dark/60">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
