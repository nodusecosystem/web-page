import type { LucideIcon } from 'lucide-react'

export type NavLink = {
  label: string
  href: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  deliverables: string[]
}

export type MethodologyStep = {
  id: string
  step: string
  title: string
  description: string
  duration: string
  icon: LucideIcon
}

export type Stat = {
  value: string
  label: string
}

export type CaseStudy = {
  id: string
  client: string
  industry: string
  description: string
  testimonial: string
  metrics: Stat[]
}

export type FeatureItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}

export type TechItem = {
  id: string
  name: string
  icon: LucideIcon
}

export type BusinessHours = {
  day: string
  hours: string
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
