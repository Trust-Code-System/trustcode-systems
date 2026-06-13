import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Layout(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  );
}
export function Cart(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
      <path d="M2 3h2l2.4 12.3a1 1 0 0 0 1 .7h9.2a1 1 0 0 0 1-.8L21 8H6" />
    </svg>
  );
}
export function Cloud(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M17.5 19a4.5 4.5 0 0 0 .5-9 6 6 0 0 0-11.7 1.5A3.5 3.5 0 0 0 7 19h10.5Z" />
    </svg>
  );
}
export function Spark(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}
export function Shield(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
export function Wrench(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M14.5 6a3.5 3.5 0 0 0-4.8 4.3L3 17v4h4l6.7-6.7A3.5 3.5 0 0 0 18 9.5" />
    </svg>
  );
}
export function Book(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 19a2 2 0 0 1 2-2h12" />
    </svg>
  );
}
export function ArrowRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function ArrowUpRight(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
export function Check(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12l5 5 9-10" />
    </svg>
  );
}
export function Menu(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function Close(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
export function Sun(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </svg>
  );
}
export function Moon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M21 12.8A8 8 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function ChevronDown(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
export function ArrowUp(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}
export function Mail(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
export function GitHub(p: IconProps) {
  return (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
export function LinkedIn(p: IconProps) {
  return (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.45h3.06V21H3.4V8.45Zm5.1 0h2.93v1.71h.04c.41-.77 1.4-1.58 2.89-1.58 3.09 0 3.66 2.03 3.66 4.67V21h-3.05v-5.55c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.13 1.44-2.13 2.93V21H8.5V8.45Z" />
    </svg>
  );
}
export function Globe(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />
    </svg>
  );
}

export function WhatsApp(p: IconProps) {
  return (
    <svg {...base} {...p} fill="currentColor" stroke="none">
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-7A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.38-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01a.92.92 0 0 0-.67.31c-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.44.53.6.2 1.15.17 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export const socialIcons = {
  GitHub: GitHub,
  LinkedIn: LinkedIn,
  Website: Globe,
} as const;

export const serviceIcons = {
  layout: Layout,
  cart: Cart,
  cloud: Cloud,
  spark: Spark,
  shield: Shield,
  wrench: Wrench,
  book: Book,
} as const;
