import {
  BarChart3,
  Bot,
  Cloud,
  Code2,
  Database,
  Globe,
  Megaphone,
  MessageCircle,
  ShoppingBag,
  Triangle,
  Users,
  Video,
  Workflow,
} from 'lucide-react'
import type { TechItem } from '@/lib/types'

export const TECH_STACK: TechItem[] = [
  { id: 'meta-ads', name: 'Meta Ads', icon: Megaphone },
  { id: 'tiktok-ads', name: 'TikTok Ads', icon: Video },
  { id: 'nextjs', name: 'Next.js', icon: Code2 },
  { id: 'vercel', name: 'Vercel', icon: Triangle },
  { id: 'shopify', name: 'Shopify', icon: ShoppingBag },
  { id: 'manychat', name: 'ManyChat', icon: MessageCircle },
  { id: 'n8n', name: 'n8n', icon: Workflow },
  { id: 'supabase', name: 'Supabase', icon: Database },
  { id: 'gcp', name: 'GCP', icon: Cloud },
  { id: 'wordpress', name: 'WordPress', icon: Globe },
  { id: 'ghl', name: 'GHL', icon: Users },
  { id: 'fathom', name: 'Fathom', icon: BarChart3 },
  { id: 'claude', name: 'Claude', icon: Bot },
]
