<role>
Actúa como un Arquitecto de Software Full-Stack y Experto en SEO Técnico / Performance Web. Tu objetivo es generar e implementar el plan técnico completo y el código base para la página web de "[NOMBRE_DE_LA_EMPRESA]".
</role>

<project_context>
- **Empresa:** [NOMBRE_DE_LA_EMPRESA]
- **Propósito:** [DESCRIPCIÓN BREVE DEL NEGOCIO, PÚBLICO OBJETIVO Y PROPUESTA DE VALOR]
- **Servicios/Productos:** [LISTA DE SERVICIOS O PRODUCTOS CLAVE QUE OFRECE LA EMPRESA]
- **Identidad visual:** [EJEMPLO: Innovación, Tecnología, Elegancia, Cercanía, Confianza, etc.]
- **Recursos de marca:** El kit de marca (logos, paleta de colores, tipografías) está disponible en la carpeta raíz del proyecto en `[RUTA_KIT_DE_MARCA - ej: /brand-kit]`.
</project_context>

<tech_stack>
- **Framework:** Next.js (App Router) en TypeScript (Modo Strict).
- **Estilos:** Tailwind CSS v4 con tokens de diseño centralizados en `globals.css` (`@theme` — colores, tipografías y gradientes basados en el kit de marca).
- **Iconos:** `lucide-react`.
- **Animaciones:** `framer-motion` (aislado exclusivamente en componentes de cliente).
- **Testing:** Vitest + React Testing Library.
</tech_stack>

<architecture_and_rules>
1. **Estructura de Directorios:**
   src/
   ├── app/              # Rutas, layouts, sitemap, robots y metadata API
   ├── components/       # Componentes de UI reutilizables (UI kit, botones, cards)
   │   ├── ui/           # Button, Card, Container, Section, Badge, Input, Textarea, Logo
   │   ├── animations/   # Wrappers 'use client' (FadeIn, StaggerChildren)
   │   └── layout/       # Header ('use client'), Footer (server)
   ├── views/            # Vistas/Secciones complejas que componen las páginas
   ├── lib/              # cn, types, validation y constants (datos mock por sección)
   └── styles/           # Estilos globales y tokens CSS (@theme)

2. **Reglas de Rendimiento y React:**
   - Server Components por defecto. Usa la directiva 'use client' únicamente en hojas finales del árbol de componentes donde la interactividad o Framer Motion lo exijan.
   - **Aislamiento de Framer Motion:** si una vista (Hero, Services, Methodology) necesita animaciones, NUNCA la conviertas entera en 'use client'. Crea wrappers interactivos reutilizables (ej: `src/components/animations/FadeIn.tsx`) y anídalos como hijos para que la vista siga siendo un Server Component.
   - Todo el código debe seguir las mejores prácticas de TypeScript y la versión estable actual de Next.js (sin patrones legacy).
   - Componentización limpia, modular y altamente mantenible.

3. **SEO Técnico y Google Lighthouse (Meta 100/100):**
   - **Semantic HTML:** Uso estricto de <main>, <header>, <footer>, <article>, <section>, y jerarquía única de encabezados (<h1> a <h6>).
   - **Metadatos:** Implementar Next.js Metadata API (title, description, openGraph, twitter).
   - **Datos Estructurados:** Incluir JSON-LD (Schema.org de tipo [TIPO_DE_NEGOCIO - ej: ProfessionalService / LocalBusiness / Organization / Product]).
   - **Artefactos SEO:** Generar app/sitemap.ts y app/robots.ts.
   - **Media:** Uso de next/image con width/height, alt descriptivo y `sizes` explícito.
   - **Imágenes y LCP:** la imagen principal del Hero (logo/isotipo) debe incluir la prop `preload` (en Next 16 `priority` está DEPRECADO) y `sizes` ajustado para garantizar una métrica de LCP perfecta en Lighthouse. Solo añadir `unoptimized` si se usa un SVG inline que Next no deba optimizar.

4. **Política de Zero Warnings y Calidad de Código (Sonar / TypeScript):**
   - **Strict Type Checking:** Configuración de TypeScript en modo estricto (strict: true) con noUnusedLocals/noUnusedParameters. Cero uso de any (explícito o implícito), variables o imports sin usar.
   - **Sonar & ESLint Compliance:** Cumplimiento estricto de estándares de Sonar/SonarQube (baja complejidad cognitiva, accesibilidad WCAG/a11y, manejo seguro de tipos y prevención de code smells).
   - **Validación Cero Tolerancia:** Todo archivo generado debe quedar libre de errores y advertencias. Se debe validar internamente ejecutando `tsc --noEmit` y el linter (`npm run lint`) antes de dar por cerrado cada entregable.
</architecture_and_rules>

<deliverables>
1. **Instalación e Inicialización:** Setup inicial desde cero con Next.js, Tailwind CSS, TypeScript (Strict Mode), Lucide y Framer Motion.
2. **Estructura Visual & Mockups:** Implementar la página principal (Landing Page) con las siguientes secciones optimizadas para conversión:
   - Header/Navegación accesible.
   - Hero Section con CTA claro y propuesta de valor.
   - [SECCIÓN_SERVICIOS_O_PRODUCTOS]
   - [SECCIÓN_METODOLOGÍA_O_PROCESO]
   - [SECCIÓN_PRUEBA_SOCIAL_CASOS_DE_ÉXITO]
   - Formulario de Contacto / Conversión con validaciones tipadas.
   - Footer informativo y legal.
3. **Pruebas Unitarias:** Crear tests unitarios con Vitest para componentes críticos (ej. navegación, formularios, botones CTA).
4. **Documentación del Proyecto:**
   - Crear un archivo `AGENTS.md` en la raíz con las pautas de arquitectura, convenciones de código, reglas de Sonar/ESLint y guía para futuros agentes que modifiquen el proyecto.
   - Crear un archivo `PROMPT.md` en la raíz con una versión genérica y parametrizada de este prompt para reutilización futura.
</deliverables>

<instructions>
Inicia ejecutando la estructuración del proyecto, creando los archivos de configuración base y el archivo `AGENTS.md` antes de escribir la UI. Proporciona el plan de ejecución paso a paso y confirma que cada entregable pasará la validación de cero warnings antes de darlo por concluido.
</instructions>
