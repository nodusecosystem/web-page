# Onboarding form — machine spec

Spec generada desde el código fuente. El formulario vive en `/{locale}/onboarding` (`/es/onboarding`, `/en/onboarding`).

## 1. Funcionamiento interno

- **Pasos (wizard por estado):** 3 — `brand` (marca y oferta) → `web` (sitio) → `automation` (bot). Total: **68 campos**, **28 obligatorios**.
- **Navegación:** stepper + barra de progreso; `Continuar` valida el paso actual, `Atrás` no valida; `Enviar` (paso 3) valida los 3 pasos y salta al primero con errores.
- **Bloqueo con aviso:** si el paso tiene errores, toast `role="alert"` con `validation.blocked` (incluye `{count}`) + foco automático al primer campo inválido del paso.
- **Borrador:** `Guardar borrador` persiste TODO el formulario (los 68 campos, válidos o no) en `localStorage` bajo la clave `nodus-onboarding-draft`; se restaura al montar (post-hidratación) y `Descartar borrador` lo borra y resetea.
- **Envío:** Server Action `submitOnboarding` (`src/app/[lang]/onboarding/actions.ts`) → `POST` JSON al webhook `N8N_ONBOARDING_WEBHOOK_URL` (n8n, ver `.env.example`). Éxito: limpia el borrador y muestra `success.*`. Fallo: toast con `navigation.submitError`, conserva datos y borrador.
- **Tipos de dato:** TODOS los valores son `string` (`Record<OnboardingField, string>`). Los `select` guardan el `value` (código), NO la etiqueta. Vacío = `""`. No hay números, booleanos ni fechas tipadas.
- **Validación:** `validateOnboardingStep(step, form, messages)` y `validateOnboardingForm` en `src/lib/validation.ts`. Reglas: obligatorio = `trim().length > 0`; `emailContacto` además pasa `EMAIL_REGEX` (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). Mensajes desde i18n (`validation.required`, `validation.emailInvalid`, `validation.blocked`).
- **IDs DOM:** cada campo usa `id="onboarding-{field}"` (`aria-describedby` a `{id}-hint` / `{id}-error`).
- **Etiqueta de obligatorio:** se añade `" *"` al final del `label` (`aria-required` no se usa; el formulario lleva `noValidate` implícito al no ser submit nativo).
- **Ruta oculta:** `noindex,nofollow`, fuera de `sitemap.xml`, sin enlaces en nav/footer. Layout propio sin menú ni footer, con toggle ES/EN y `ScrollToTop`.

## 2. Archivos

| Archivo | Rol |
|---|---|
| `src/components/onboarding/OnboardingWizard.tsx` | Wizard cliente: pasos, estado, validación, toast, borrador, envío, éxito |
| `src/app/[lang]/onboarding/actions.ts` | Server Action `submitOnboarding`: puente a n8n vía `N8N_ONBOARDING_WEBHOOK_URL` |
| `src/lib/constants/onboarding.ts` | Grupos, campos por paso, obligatorios, `EMPTY_ONBOARDING_FORM`, `ONBOARDING_STORAGE_KEY` |
| `src/lib/validation.ts` | `validateOnboardingStep` / `validateOnboardingForm` |
| `src/lib/types.ts` | `OnboardingField` (unión de 68 literales), `OnboardingSelectField` (13), `OnboardingFormData/Errors`, `OnboardingStepId` |
| `src/components/ui/Select.tsx` | Select accesible del design system |
| `src/lib/i18n/es.json → `onboarding.*`` | Copy ES: hero, steps, groups, fields, selectOptions, navigation, validation, success |
| `src/lib/i18n/en.json → `onboarding.*`` | Copy EN espejo (mismas claves) |
| `src/app/[lang]/onboarding/page.tsx` | Página + `generateMetadata` noindex |
| `src/app/[lang]/onboarding/layout.tsx` | Layout mínimo: marca + toggle idioma + `ScrollToTop` |
| `src/views/OnboardingHero.tsx` | Hero oscuro con `hero.*` |
| `src/views/OnboardingView.tsx` | Vista server que inyecta el diccionario al wizard |

## 3. Campos por grupo

### Paso `brand` · grupo `contact` — Antes de empezar — ¿cómo te contactamos?
_Para enviarte el diagnóstico en 24h._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `nombreContacto` | input | text | SÍ | Nombre y apellido | Full name |
| `emailContacto` | input | email | SÍ | Email | Email |
| `telefonoContacto` | input | tel | SÍ | WhatsApp | WhatsApp |

### Paso `brand` · grupo `identidad` — ¿Quién eres? — tu marca
_Para que el bot se presente como tú y no como un asistente genérico._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `marca` | input | text | SÍ | Nombre legal y marca comercial | Legal name and commercial brand |
| `frase` | input | text | SÍ | En una frase: ¿qué haces por tus clientes? | In one sentence: what do you do for clients? |
| `web` | input | text | SÍ | Página web y redes principales | Website and main socials |
| `historia` | textarea | — | — | Historia corta de la marca (2-3 líneas) | Short brand story (2-3 lines) |
| `ubicacionZona` | input | text | SÍ | ¿Dónde atiendes y en qué zona horaria? | Where do you serve and in which timezone? |

### Paso `brand` · grupo `oferta` — ¿Qué vendes?
_Solo lo que el bot puede ofrecer. Si no está aquí, el bot no lo promete._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `servicios` | textarea | — | — | Lista todos tus servicios o productos | List all your services or products |
| `servicioEstrella` | select | — | SÍ | ¿Cuál es el servicio estrella para el bot? (uno solo) | Which is the star service for the bot? (just one) |
| `incluyeNoIncluye` | textarea | — | SÍ | ¿Qué incluye y qué no incluye? | What does it include — and not include? |
| `precio` | input | text | SÍ | Inversión / precio y forma de pago | Investment / price and payment terms |
| `duracion` | input | text | — | Duración / contrato mínimo | Duration / minimum contract |
| `casosLink` | input | text | SÍ | Link de casos de éxito o testimonios | Link to success stories or testimonials |
| `metrica` | input | text | — | Métrica real que sí podemos decir | Real metric we are allowed to quote |

### Paso `brand` · grupo `clienteIdeal` — ¿A quién le vendes?

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `clienteIdeal` | textarea | — | SÍ | Describe a tu cliente ideal en 2 líneas | Describe your ideal client in 2 lines |
| `aptos` | textarea | — | SÍ | Perfiles aptos (a los que sí les vendes) | Good-fit profiles (who you do sell to) |
| `noAptos` | textarea | — | SÍ | Perfiles no aptos (el bot los descalifica) | Bad-fit profiles (the bot disqualifies them) |
| `ticket` | input | text | — | Ticket promedio y volumen típico | Average ticket and typical volume |
| `referidores` | input | text | — | ¿Tienes referidores B2B? | Do you have B2B referrers? |

### Paso `web` · grupo `webBase` — Objetivo y alcance
_Qué debe conseguir la web y qué incluirá._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `webObjetivo` | input | text | SÍ | Objetivo de la web en una frase | Website goal in one sentence |
| `webTipo` | select | — | SÍ | Tipo de sitio | Site type |
| `webPaginas` | textarea | — | — | Páginas o secciones necesarias | Required pages or sections |

### Paso `web` · grupo `webContenido` — Identidad y contenidos
_Marca, materiales y referencias visuales._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `webDominio` | input | text | — | Dominio y hosting | Domain and hosting |
| `webIdentidad` | input | text | — | Identidad visual (logo, colores, tipografías) | Visual identity (logo, colors, fonts) |
| `webContenidos` | textarea | — | — | Contenidos: textos, fotos, videos | Content: copy, photos, videos |
| `webReferencias` | textarea | — | — | 3 webs que te gusten y por qué | 3 websites you like and why |

### Paso `web` · grupo `webTech` — Funcionalidad y técnica
_Lo que la web debe hacer por dentro._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `webFuncionalidades` | textarea | — | — | Funcionalidades necesarias | Required features |
| `webIntegraciones` | input | text | — | Integraciones (CRM, analítica, WhatsApp...) | Integrations (CRM, analytics, WhatsApp...) |
| `webMantenimiento` | select | — | — | ¿Quieres mantenimiento mensual? | Do you want monthly maintenance? |
| `webFechaObjetivo` | input | text | — | Fecha objetivo de lanzamiento | Target launch date |

### Paso `automation` · grupo `filtro` — ¿Cuándo el bot agenda y cuándo no?
_Reglas binarias: si no se cumplen, el bot no agenda y deriva con respeto._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `requisitoMinimo` | input | text | SÍ | Facturación o requisito mínimo para calificar | Minimum revenue or requirement to qualify |
| `inversionMinima` | input | text | — | Inversión mínima disponible | Minimum available investment |
| `datosObligatorios` | input | text | — | Datos obligatorios antes de agendar | Required data before booking |
| `noCalificaDerivacion` | textarea | — | — | Si no califica, ¿qué le dice el bot? | If they don't qualify, what does the bot say? |
| `muyCalificado` | input | text | — | Señal de cliente muy calificado | Sign of a highly qualified client |

### Paso `automation` · grupo `voz` — ¿Cómo quieres sonar?
_De aquí clonamos tu voz. Mientras más real, más humano suena el bot._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `nombreBot` | input | text | SÍ | ¿Cómo se presenta el bot? | How does the bot introduce itself? |
| `tono` | input | text | SÍ | Tono en 3 adjetivos | Tone in 3 adjectives |
| `frasesReales` | textarea | — | SÍ | 3 frases reales que tú usas con clientes | 3 real phrases you use with clients |
| `frasesNunca` | input | text | — | Frases que nunca debe decir | Phrases it must never say |
| `emojis` | select | — | — | Uso de emojis | Emoji usage |
| `tuteoIdiomas` | input | text | — | ¿Tuteo o usteo? ¿En qué idiomas atiende? | Formal or informal? Which languages? |

### Paso `automation` · grupo `proceso` — Cómo vendes hoy

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `origenLeads` | input | text | SÍ | ¿De dónde te llegan los leads hoy? | Where do your leads come from today? |
| `automaticoAntes` | textarea | — | — | ¿Hay algo automático antes del bot? | Is there anything automated before the bot? |
| `quienHaceLlamada` | input | text | SÍ | ¿Quién hace la llamada? | Who takes the call? |
| `queHaceSesion` | input | text | — | ¿Qué haces en esa sesión? | What do you do in that session? |
| `objeciones` | input | text | — | Objeciones que más escuchas | Objections you hear most |

### Paso `automation` · grupo `agenda` — ¿Cuándo agendamos?
_Sin esto no podemos agendar. Es lo más crítico del bot._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `duracionSesion` | select | — | SÍ | Duración de la sesión | Session duration |
| `calendario` | input | text | SÍ | Calendario donde se agenda | Calendar used for booking |
| `horarioZona` | input | text | SÍ | Horario de atención y zona horaria | Availability and timezone |
| `asignacion` | input | text | — | ¿Quién atiende qué tipo de lead? | Who handles which lead type? |
| `reagendar` | select | — | — | Si pide reagendar o cancelar, ¿qué hace el bot? | If they ask to reschedule or cancel, what does the bot do? |
| `briefing` | textarea | — | — | Briefing que necesita el closer | Briefing the closer needs |

### Paso `automation` · grupo `conexiones` — ¿Qué necesitamos para conectar?
_Sin estos accesos no podemos construir. Lo sensible se comparte en la reunión, no aquí._

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `crm` | select | — | SÍ | ¿Qué CRM usas? | Which CRM do you use? |
| `tokenCRM` | input | text | — | Token / acceso del CRM | CRM token / access |
| `canalBot` | select | — | SÍ | ¿Por dónde hablará el bot con tus leads? | Where will the bot talk to your leads? |
| `whatsappEquipo` | input | text | — | WhatsApp / email del equipo para avisos | Team WhatsApp / email for alerts |
| `pipelineEtiquetas` | input | text | — | Pipeline y etiquetas en el CRM | CRM pipeline and tags |

### Paso `automation` · grupo `prueba` — ¿Qué mostramos para generar confianza?

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `driveMarca` | input | text | — | Link a tu Drive con logo y material de marca | Link to your Drive with logo and brand material |
| `conversacionesReales` | select | — | — | ¿Puedes compartir 10-20 conversaciones reales? | Can you share 10-20 real conversations? |
| `audios` | select | — | — | ¿Tienes audios de llamadas reales? (3-5) | Do you have real call recordings? (3-5) |
| `vslLink` | input | text | — | Link a tu VSL / landing / formulario | Link to your VSL / landing / form |

### Paso `automation` · grupo `reglas` — ¿Qué nunca hace el bot?

| field | control | html type | required | ES label | EN label |
|---|---|---|---|---|---|
| `precioChatOLlamada` | select | — | SÍ | ¿El bot puede decir el precio por chat? | Can the bot share pricing by chat? |
| `prometeResultados` | select | — | — | ¿Puede prometer resultados garantizados? | Can it promise guaranteed results? |
| `descuentos` | select | — | — | ¿Puede ofrecer descuentos? | Can it offer discounts? |
| `pideHumano` | input | text | — | Si pide hablar con humano, ¿qué hace? | If they ask for a human, what happens? |
| `leadsConCita` | input | text | — | ¿Hay leads que ya llegan con cita? ¿Qué hace el bot? | Do any leads arrive pre-booked? What should the bot do? |
| `algoMas` | textarea | — | — | ¿Algo más que el bot debe saber? | Anything else the bot should know? |

## 4. Opciones de los select (value → etiqueta)

### `servicioEstrella` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `estrella1` | El #1 — el que quiero que el bot venda | #1 — the one I want the bot to sell |
| `estrella2` | El #2 | #2 |
| `estrella3` | El #3 | #3 |
| `todos` | Todos por igual | All equally |

### `emojis` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `max1` | Máx 1 por mensaje, solo en momentos cálidos (recomendado) | Max 1 per message, warm moments only (recommended) |
| `uno-dos` | 1-2 por mensaje | 1-2 per message |
| `sin` | Sin emojis | No emojis |
| `libre` | Como yo los uso, sin límite | As I use them, no limit |

### `duracionSesion` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `30` | 30 minutos | 30 minutes |
| `45` | 45 minutos | 45 minutes |
| `60` | 60 minutos | 60 minutes |
| `otro` | Otro | Other |

### `reagendar` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `avisa` | Avisa al equipo, no reagenda solo (recomendado) | Alerts the team, doesn't reschedule alone (recommended) |
| `auto` | Reagenda automático si hay hueco | Auto-reschedules when there is room |
| `otro` | Otro | Other |

### `crm` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `ghl` | GoHighLevel (GHL) | GoHighLevel (GHL) |
| `hubspot` | HubSpot | HubSpot |
| `otro` | Otro | Other |
| `ninguno` | No uso CRM aún | No CRM yet |

### `canalBot` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `ig-whatsapp` | Instagram DM + WhatsApp vía GHL (recomendado) | Instagram DM + WhatsApp via GHL (recommended) |
| `whatsapp` | Solo WhatsApp | WhatsApp only |
| `instagram` | Solo Instagram | Instagram only |
| `telegram` | Telegram | Telegram |
| `webchat` | Webchat en tu web | Website webchat |

### `conversacionesReales` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `ghl` | Sí, exporto de GHL / CRM | Yes, I export from GHL / CRM |
| `capturas` | Sí, envío capturas | Yes, I send screenshots |
| `no` | No tengo aún | Not yet |

### `audios` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `si` | Sí, los subo al Drive | Yes, I upload them to the Drive |
| `no` | No | No |

### `precioChatOLlamada` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `solo-llamada` | Solo en la llamada, por chat da encuadre sin cifras (recomendado) | Only on the call, chat gives context without figures (recommended) |
| `con-precio` | Sí, puede dar precio por chat | Yes, it can share pricing by chat |
| `depende` | Depende del caso | Depends on the case |

### `prometeResultados` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `no` | No, nunca | No, never |
| `si` | Sí | Yes |

### `descuentos` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `no` | No, nunca | No, never |
| `si` | Sí | Yes |

### `webTipo` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `corporativa` | Corporativa | Corporate |
| `landing` | Landing page | Landing page |
| `catalogo` | Catálogo | Catalog |
| `ecommerce` | E-commerce | E-commerce |
| `blog` | Blog | Blog |
| `otro` | Otro | Other |

### `webMantenimiento` (placeholder ES: "Selecciona una opción" / EN: "Select an option")

| value | ES | EN |
|---|---|---|
| `si` | Sí | Yes |
| `no` | No | No |
| `nose` | Aún no lo sé | Not sure yet |

## 5. Placeholders, hints y copy relevante

| field | ES placeholder | ES hint | EN placeholder | EN hint |
|---|---|---|---|---|
| `nombreContacto` | Ej: Johan Bedoya | — | E.g.: Jane Smith | — |
| `emailContacto` | tu@empresa.com | — | you@company.com | — |
| `telefonoContacto` | +57 310 6769289 | — | +57 310 6769289 | — |
| `marca` | Ej: Inversiones Nodus S.A.S. → Nodus Ecosystem | — | E.g.: Nodus Investments LLC → Nodus Ecosystem | — |
| `frase` | Ej: Ayudamos a empresas a conseguir clientes con pauta y automatización | — | E.g.: We help companies win clients with ads and automation | — |
| `web` | Ej: nodusecosystem.com — IG @tu_marca | — | E.g.: nodusecosystem.com — IG @your_brand | — |
| `historia` | Ej: Llevamos 5 años ayudando a negocios locales a escalar... | — | E.g.: 5 years helping local businesses scale... | — |
| `ubicacionZona` | Ej: Colombia y LATAM — Hora Bogotá (COT) | — | E.g.: Colombia and LATAM — Bogotá time (COT) | — |
| `servicios` | 1. Servicio principal (el que más vendes) ⏎ 2. Servicio secundario ⏎ 3. Producto / asesoría / programa | — | 1. Main service (your best seller) ⏎ 2. Secondary service ⏎ 3. Product / consulting / program | — |
| `servicioEstrella` | — | — | — | — |
| `incluyeNoIncluye` | Incluye: estrategia, pauta, dashboard... ⏎ No incluye: community diario, ventas garantizadas... | Sé específico: «4 semanas de acompañamiento y dashboard» es mejor que «acompañamiento completo». | Includes: strategy, ads, dashboard... ⏎ Excludes: daily community management, guaranteed sales... | Be specific: “4 weeks of support plus dashboard” beats “full support”. |
| `precio` | Ej: 2.000 USD — pago anticipado — o «solo en la llamada» | Si prefieres no dar precio por chat, escribe: «el precio se define en la llamada». | E.g.: 2,000 USD — upfront — or “only on the call” | If you'd rather not share pricing by chat, write: “pricing is defined on the call”. |
| `duracion` | Ej: 30 días / 3 meses mínimo / sin permanencia | — | E.g.: 30 days / 3-month minimum / no lock-in | — |
| `casosLink` | Ej: https://drive.google.com/... o https://tuweb.com/casos | — | E.g.: https://drive.google.com/... or https://yourweb.com/cases | — |
| `metrica` | Ej: +120 clientes / 4.8★ en Google | — | E.g.: +120 clients served / 4.8★ on Google | — |
| `clienteIdeal` | Ej: Dueños de negocios locales que ya venden pero dependen del voz a voz | — | E.g.: Local business owners who already sell but rely on referrals | — |
| `aptos` | Ej: Servicios profesionales, e-commerce con tracción, academias... | — | E.g.: Professional services, e-commerce with traction, academies... | — |
| `noAptos` | Ej: Proyectos sin ventas, rifas/apuestas... | El bot los descalifica con cariño y no agenda. | E.g.: Projects with no sales, raffles/betting... | The bot disqualifies them kindly and doesn't book. |
| `ticket` | Ej: Ticket $800.000 COP, 40 clientes/mes | — | E.g.: $800 COP ticket, 40 clients/month | — |
| `referidores` | Ej: Contadores, agencias aliadas — o «No aplica» | — | E.g.: Accountants, partner agencies — or “N/A” | — |
| `webObjetivo` | Ej: Captar leads calificados para el servicio estrella | — | E.g.: Capture qualified leads for the star service | — |
| `webTipo` | — | — | — | — |
| `webPaginas` | Ej: Inicio, servicios, casos, contacto, aviso legal | — | E.g.: Home, services, cases, contact, legal notice | — |
| `webDominio` | Ej: Ya tengo midominio.com en Hostinger — o «No tengo aún» | — | E.g.: I own mydomain.com on Hostinger — or “Not yet” | — |
| `webIdentidad` | Ej: Link al Drive con logo y manual de marca | — | E.g.: Drive link with logo and brand manual | — |
| `webContenidos` | Ej: Tengo fotos y textos — me faltan videos | — | E.g.: I have photos and copy — missing videos | — |
| `webReferencias` | Ej: tuweb.com — me gusta su hero directo... | — | E.g.: yourweb.com — I like its direct hero... | — |
| `webFuncionalidades` | Ej: Blog, reservas, pagos, formularios, chat | — | E.g.: Blog, bookings, payments, forms, chat | — |
| `webIntegraciones` | Ej: GHL, GA4, WhatsApp — o «No aplica» | — | E.g.: GHL, GA4, WhatsApp — or “N/A” | — |
| `webMantenimiento` | — | — | — | — |
| `webFechaObjetivo` | Ej: 15 de diciembre de 2026 — o «Sin fecha» | — | E.g.: December 15, 2026 — or “No date” | — |
| `requisitoMinimo` | Ej: Que facture +3.000 USD/mes — o «No aplica» | — | E.g.: Must bill +3,000 USD/month — or “N/A” | — |
| `inversionMinima` | Ej: 1.500 USD para iniciar | — | E.g.: 1,500 USD to start | — |
| `datosObligatorios` | Ej: Nombre, teléfono, correo, ciudad, Instagram/web | — | E.g.: Name, phone, email, city, Instagram/website | — |
| `noCalificaDerivacion` | Ej: Agradece, explica que cuidan su inversión y lo invita a seguir en @tu_ig | — | E.g.: Thanks them, explains we protect their investment, invites them to follow @your_ig | — |
| `muyCalificado` | Ej: Factura muy por encima, marca reconocida — o «No aplica» | — | E.g.: Bills far above, big team, known brand — or “N/A” | — |
| `nombreBot` | Ej: Soy Ana de Nodus | — | E.g.: I'm Ana from Nodus | — |
| `tono` | Ej: Cálido, directo, experto | — | E.g.: Warm, direct, expert | — |
| `frasesReales` | Ej: ¡Hola! Qué bueno que escribiste 🙌 Cuéntame de tu negocio | La parte más importante: de aquí clonamos tu voz. | E.g.: Hi! Great to hear from you 🙌 Tell me about your business | The most important part: we clone your voice from here. |
| `frasesNunca` | Ej: No decir «Estimado usuario», no prometer resultados garantizados | — | E.g.: Never say “Dear user”, never promise guaranteed results | — |
| `emojis` | — | — | — | — |
| `tuteoIdiomas` | Ej: Siempre tuteo, atiendo ES y EN | — | E.g.: Always informal, I serve EN and ES | — |
| `origenLeads` | Ej: IG DM, WhatsApp, pauta en Meta, voz a voz | — | E.g.: IG DMs, WhatsApp, Meta ads, referrals | — |
| `automaticoAntes` | Ej: Si comentan «INFO» les pido nombre y correo — o «No» | — | E.g.: If they comment “INFO” we ask name and email — or “No” | — |
| `quienHaceLlamada` | Ej: Yo hago la sesión de diagnóstico | — | E.g.: I run the diagnostic session | — |
| `queHaceSesion` | Ej: Reviso su presencia digital y armo el plan a medida | — | E.g.: I review their digital presence and build a tailored plan | — |
| `objeciones` | Ej: Precio, «lo pienso», tiempo, desconfianza | — | E.g.: Price, “I'll think about it”, time, distrust | — |
| `duracionSesion` | — | — | — | — |
| `calendario` | Ej: https://... o GHL Calendar ID: abc123 | Si usas GoHighLevel necesitamos el Calendar ID; si usas Calendly o Google, pega el link. | E.g.: https://... or GHL Calendar ID: abc123 | With GoHighLevel we need the Calendar ID; with Calendly or Google, paste the link. |
| `horarioZona` | Ej: Lun-Vie 9am-6pm — Hora Colombia (COT) | — | E.g.: Mon-Fri 9am-6pm — Colombia time (COT) | — |
| `asignacion` | Ej: Yo atiendo todos / Ana los normales, yo los muy calificados | — | E.g.: I handle all / Ana the standard ones, me the top ones | — |
| `reagendar` | — | — | — | — |
| `briefing` | Ej: Nombre, teléfono, correo, ciudad, nicho, facturación, problema principal | — | E.g.: Name, phone, email, city, niche, revenue, main problem | — |
| `crm` | — | — | — | — |
| `tokenCRM` | Si es sensible, escribe «Lo comparto en la reunión» | Nunca dejes tokens en un formulario: lo vemos por privado. | If sensitive, write “I'll share it on the call” | Never leave tokens in a form: we handle it privately. |
| `canalBot` | — | — | — | — |
| `whatsappEquipo` | Ej: +57 310 0000000 — equipo@tuempresa.com | — | E.g.: +57 310 0000000 — team@yourcompany.com | — |
| `pipelineEtiquetas` | Ej: Pipeline «Oportunidades»: Nuevo → Calificado → Agendado → Ganado | — | E.g.: “Opportunities” pipeline: New → Qualified → Booked → Won | — |
| `driveMarca` | Ej: https://drive.google.com/... | — | E.g.: https://drive.google.com/... | — |
| `conversacionesReales` | — | De aquí clonamos tu voz real. | — | We clone your real voice from here. |
| `audios` | — | — | — | — |
| `vslLink` | Ej: https://tuweb.com/diagnostico | — | E.g.: https://yourweb.com/diagnosis | — |
| `precioChatOLlamada` | — | — | — | — |
| `prometeResultados` | — | — | — | — |
| `descuentos` | — | — | — | — |
| `pideHumano` | Ej: Avisa al equipo y le dice que ya le avisamos 🙌 | — | E.g.: Alerts the team and says we'll reach out right away 🙌 | — |
| `leadsConCita` | Ej: No, todos pasan por el bot / Sí, que avise al equipo | — | E.g.: No, all go through the bot / Yes, alert the team | — |
| `algoMas` | Cuéntanos lo importante que no preguntamos... | — | Tell us anything important we didn't ask... | — |

## 6. Payload de ejemplo (lo que recibirá n8n)

```json
{
  "nombreContacto": "Ana Pérez",
  "emailContacto": "ana@empresa.com",
  "telefonoContacto": "+57 310 0000000",
  "marca": "Nodus S.A.S.",
  "servicioEstrella": "estrella1",
  "webTipo": "corporativa",
  "duracionSesion": "30",
  "crm": "ghl",
  "canalBot": "whatsapp",
  "precioChatOLlamada": "solo-llamada",
  "...": "(los 68 campos siempre presentes como string, vacíos = \"\")"
}
```

## 7. Notas para la IA consumidora

- Los `value` de los selects son estables entre idiomas; las etiquetas cambian. Para mostrar respuestas, resolver `value → label` con `selectOptions` del locale correspondiente.
- "PENDIENTE" / "PENDING" y "No aplica" / "N/A" son valores libres que el usuario escribe como texto: no son estados del sistema, llegan como string normal.
- El borrador de `localStorage` puede traer formulario parcial: cualquier integración debe tolerar `""` en cualquier campo.
- `steps[].id` del JSON (`brand|web|automation`) está alineado por índice con `ONBOARDING_STEPS` (hay test que lo fija).
