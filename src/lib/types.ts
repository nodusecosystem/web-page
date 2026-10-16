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

export type OnboardingStepId = 'brand' | 'web' | 'automation'

export type OnboardingGroupKey =
  | 'contact'
  | 'identidad'
  | 'oferta'
  | 'clienteIdeal'
  | 'webBase'
  | 'webContenido'
  | 'webTech'
  | 'filtro'
  | 'voz'
  | 'proceso'
  | 'agenda'
  | 'conexiones'
  | 'prueba'
  | 'reglas'

export type OnboardingField =
  | 'nombreContacto'
  | 'emailContacto'
  | 'telefonoContacto'
  | 'marca'
  | 'frase'
  | 'web'
  | 'historia'
  | 'ubicacionZona'
  | 'servicios'
  | 'servicioEstrella'
  | 'incluyeNoIncluye'
  | 'precio'
  | 'duracion'
  | 'casosLink'
  | 'metrica'
  | 'clienteIdeal'
  | 'aptos'
  | 'noAptos'
  | 'ticket'
  | 'referidores'
  | 'webObjetivo'
  | 'webTipo'
  | 'webPaginas'
  | 'webDominio'
  | 'webIdentidad'
  | 'webContenidos'
  | 'webReferencias'
  | 'webFuncionalidades'
  | 'webIntegraciones'
  | 'webMantenimiento'
  | 'webFechaObjetivo'
  | 'requisitoMinimo'
  | 'inversionMinima'
  | 'datosObligatorios'
  | 'noCalificaDerivacion'
  | 'muyCalificado'
  | 'nombreBot'
  | 'tono'
  | 'frasesReales'
  | 'frasesNunca'
  | 'emojis'
  | 'tuteoIdiomas'
  | 'origenLeads'
  | 'automaticoAntes'
  | 'quienHaceLlamada'
  | 'queHaceSesion'
  | 'objeciones'
  | 'duracionSesion'
  | 'calendario'
  | 'horarioZona'
  | 'asignacion'
  | 'reagendar'
  | 'briefing'
  | 'crm'
  | 'tokenCRM'
  | 'canalBot'
  | 'whatsappEquipo'
  | 'pipelineEtiquetas'
  | 'driveMarca'
  | 'conversacionesReales'
  | 'audios'
  | 'vslLink'
  | 'precioChatOLlamada'
  | 'prometeResultados'
  | 'descuentos'
  | 'pideHumano'
  | 'leadsConCita'
  | 'algoMas'

export type OnboardingSelectField =
  | 'servicioEstrella'
  | 'emojis'
  | 'duracionSesion'
  | 'reagendar'
  | 'crm'
  | 'canalBot'
  | 'conversacionesReales'
  | 'audios'
  | 'precioChatOLlamada'
  | 'prometeResultados'
  | 'descuentos'
  | 'webTipo'
  | 'webMantenimiento'

export type OnboardingFormData = Record<OnboardingField, string>

export type OnboardingFormErrors = Partial<Record<OnboardingField, string>>
