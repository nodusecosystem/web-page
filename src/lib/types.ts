import type { LucideIcon } from 'lucide-react'

export type TechItem = {
  id: string
  name: string
  icon: LucideIcon
}

export type ContactFormData = {
  name: string
  email: string
  website: string
  challenge: string
  message: string
  consent: boolean
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
