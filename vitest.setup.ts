import '@testing-library/jest-dom/vitest'

class IntersectionObserverMock {
  observe = (): void => undefined
  unobserve = (): void => undefined
  disconnect = (): void => undefined
}

class ResizeObserverMock {
  observe = (): void => undefined
  unobserve = (): void => undefined
  disconnect = (): void => undefined
}

const matchMediaMock = (query: string): MediaQueryList =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    dispatchEvent: () => false,
  }) as MediaQueryList

globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
window.matchMedia = matchMediaMock
