import {
  Atom,
  Braces,
  Cloud,
  Code2,
  Layout,
  Megaphone,
  Palette,
  ShoppingBag,
  Target,
  Users,
  Workflow,
  Zap,
} from 'lucide-react'
import type { TechItem } from '@/lib/types'

export const TECH_STACK: TechItem[] = [
  { id: 'meta-ads', name: 'Meta Ads', icon: Megaphone },
  { id: 'google-ads', name: 'Google Ads', icon: Target },
  { id: 'nextjs', name: 'Next.js', icon: Code2 },
  { id: 'react', name: 'React', icon: Atom },
  { id: 'tailwind', name: 'Tailwind CSS', icon: Palette },
  { id: 'typescript', name: 'TypeScript', icon: Braces },
  { id: 'make', name: 'Make', icon: Workflow },
  { id: 'zapier', name: 'Zapier', icon: Zap },
  { id: 'shopify', name: 'Shopify', icon: ShoppingBag },
  { id: 'vercel', name: 'Vercel', icon: Cloud },
  { id: 'webflow', name: 'Webflow', icon: Layout },
  { id: 'hubspot', name: 'HubSpot', icon: Users },
]
