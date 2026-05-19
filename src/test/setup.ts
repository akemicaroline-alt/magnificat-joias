import "@testing-library/jest-dom/vitest";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";

afterEach(() => {
  cleanup();
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    onError,
    width,
    height,
    ...rest
  }: {
    src: string;
    alt: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    width?: number;
    height?: number;
  } & React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement("img", {
      src,
      alt,
      onError,
      width,
      height,
      ...rest,
    });
  },
}));

vi.mock("next/font/google", () => {
  const fontStub = () => ({
    className: "",
    style: { fontFamily: "stub" },
    variable: "--font-stub",
  });
  return {
    Cormorant_Garamond: fontStub,
    Montserrat: fontStub,
    Geist: fontStub,
    Geist_Mono: fontStub,
  };
});

vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", { href, ...rest }, children),
}));

class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe() {
    // immediately trigger inView so framer-motion whileInView fires
    this.callback(
      [
        {
          isIntersecting: true,
          intersectionRatio: 1,
          target: document.createElement("div"),
          time: 0,
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
        } as IntersectionObserverEntry,
      ],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  root = null;
  rootMargin = "";
  thresholds = [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  }),
});

if (!window.HTMLCanvasElement.prototype.getContext) {
  // jsdom doesn't implement canvas; provide a stub.
  Object.defineProperty(window.HTMLCanvasElement.prototype, "getContext", {
    value: () => null,
  });
}

if (typeof window.ResizeObserver === "undefined") {
  class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  Object.defineProperty(window, "ResizeObserver", {
    writable: true,
    configurable: true,
    value: MockResizeObserver,
  });
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(performance.now()), 16) as unknown as number) as typeof window.requestAnimationFrame;
  window.cancelAnimationFrame = ((id: number) => clearTimeout(id)) as typeof window.cancelAnimationFrame;
}

Object.defineProperty(window, "scrollTo", {
  writable: true,
  configurable: true,
  value: vi.fn(),
});
