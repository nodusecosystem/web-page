import type { LucideIcon } from 'lucide-react'

export type TechItem = {
  id: string
  name: string
  icon: LucideIcon
}

export type ContactFormData = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
