import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/cn'

type TextareaProps = ComponentPropsWithoutRef<'textarea'> & {
  id: string
  label: string
  error?: string
}

export function Textarea({ id, label, error, className, ...rest }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-dark">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'min-h-32 w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-dark transition-colors placeholder:text-dark/40 focus:outline-none focus:ring-2',
          error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-dark/15 focus:border-teal-light focus:ring-teal-light/20',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
