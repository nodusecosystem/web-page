import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createSpringAnimator, stepSpring, type SpringConfig } from '@/lib/spring'

const CONFIG: SpringConfig = { stiffness: 100, damping: 30, mass: 2 }

describe('stepSpring', () => {
  it('moves towards the target without overshooting (overdamped config)', () => {
    const spring = { value: 0, velocity: 0, target: 10 }
    let previous = 0
    for (let i = 0; i < 200; i++) {
      stepSpring(spring, CONFIG, 16)
      expect(spring.value).toBeGreaterThanOrEqual(previous)
      expect(spring.value).toBeLessThanOrEqual(10)
      previous = spring.value
    }
    expect(spring.value).toBe(10)
  })

  it('keeps its velocity when the target changes mid-flight', () => {
    const spring = { value: 0, velocity: 0, target: 10 }
    stepSpring(spring, CONFIG, 200)
    const velocity = spring.velocity
    spring.target = -10
    stepSpring(spring, CONFIG, 1)
    expect(Math.sign(spring.velocity)).toBe(Math.sign(velocity))
  })

  it('snaps to the target and reports rest once settled', () => {
    const spring = { value: 9.9995, velocity: 0, target: 10 }
    expect(stepSpring(spring, CONFIG, 16)).toBe(true)
    expect(spring).toEqual({ value: 10, velocity: 0, target: 10 })
  })
})

describe('createSpringAnimator', () => {
  let frames: FrameRequestCallback[] = []
  let now = 0

  const flushFrame = () => {
    now += 16
    const pending = frames
    frames = []
    for (const callback of pending) callback(now)
  }

  beforeEach(() => {
    frames = []
    now = 0
    vi.spyOn(performance, 'now').mockImplementation(() => now)
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      frames.push(callback)
      return frames.length
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {
      frames = []
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not schedule frames until a target changes, and stops once at rest', () => {
    const onFrame = vi.fn()
    const animator = createSpringAnimator([0], CONFIG, onFrame)
    expect(frames).toHaveLength(0)

    animator.set(0, 5)
    for (let i = 0; i < 300 && frames.length; i++) flushFrame()

    expect(frames).toHaveLength(0)
    expect(onFrame).toHaveBeenLastCalledWith([5])
  })

  it('cancels the pending frame on stop', () => {
    const animator = createSpringAnimator([0], CONFIG, vi.fn())
    animator.set(0, 5)
    expect(frames).toHaveLength(1)
    animator.stop()
    expect(frames).toHaveLength(0)
  })
})
