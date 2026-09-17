import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  id: string
  label: string
  hint?: string
  error?: string
}

export function Input({ id, label, hint, error, className, ...rest }: InputProps) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-dark">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          'h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-dark transition-colors placeholder:text-dark/40 focus:outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-dark/15 focus:border-teal-light focus:ring-teal-light/20',
          className,
        )}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="text-xs text-dark/50">
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
