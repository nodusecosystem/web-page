export type SpringConfig = {
  stiffness: number
  damping: number
  mass: number
}

type Spring = {
  value: number
  velocity: number
  target: number
}

const STEP_S = 0.001
const MAX_FRAME_MS = 40
const REST_DELTA = 0.001
const REST_SPEED = 0.01

/**
 * Avanza un muelle masa-resorte `elapsedMs` (integración en pasos de 1 ms) y
 * devuelve si quedó en reposo. Cambiar `target` a mitad conserva la
 * velocidad, como `useSpring` de framer-motion.
 */
export function stepSpring(spring: Spring, config: SpringConfig, elapsedMs: number): boolean {
  const steps = Math.round(elapsedMs / (STEP_S * 1000))
  for (let i = 0; i < steps; i++) {
    const force = -config.stiffness * (spring.value - spring.target) - config.damping * spring.velocity
    spring.velocity += (force / config.mass) * STEP_S
    spring.value += spring.velocity * STEP_S
  }

  const atRest =
    Math.abs(spring.value - spring.target) < REST_DELTA && Math.abs(spring.velocity) < REST_SPEED
  if (atRest) {
    spring.value = spring.target
    spring.velocity = 0
  }
  return atRest
}

/**
 * Anima varios muelles con un único requestAnimationFrame que se detiene en
 * cuanto todos reposan (nada corre mientras no hay interacción).
 */
export function createSpringAnimator(
  initial: readonly number[],
  config: SpringConfig,
  onFrame: (values: readonly number[]) => void,
) {
  const springs: Spring[] = initial.map((value) => ({ value, velocity: 0, target: value }))
  let frame = 0
  let lastTime = 0

  const tick = (now: number) => {
    const elapsed = Math.min(now - lastTime, MAX_FRAME_MS)
    lastTime = now
    let resting = true
    for (const spring of springs) {
      if (!stepSpring(spring, config, elapsed)) resting = false
    }
    onFrame(springs.map((spring) => spring.value))
    frame = resting ? 0 : requestAnimationFrame(tick)
  }

  return {
    set(index: number, target: number) {
      springs[index].target = target
      if (frame) return
      lastTime = performance.now()
      frame = requestAnimationFrame(tick)
    },
    stop() {
      cancelAnimationFrame(frame)
      frame = 0
    },
  }
}
