"use client";

import { GlobeIcon, MailIcon } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  globe: (props: IconProps) => <GlobeIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  github: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <title>GitHub</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  // 1. Next.js (from SVGL)
  nextjs: (props: IconProps) => (
    <svg viewBox="0 0 180 180" fill="currentColor" className="size-8" {...props}>
      <title>Next.js</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M90 180c49.706 0 90-40.294 90-90s-40.294-90-90-90S0 40.294 0 90s40.294 90 90 90zm59.508-22.48L69.142 54H54v71.97h12.114V69.384l73.885 95.461c3.334-2.231 6.51-4.68 9.509-7.325zM115 54h12v72h-12V54z" />
    </svg>
  ),

  // 2. React (from SVGL)
  react: (props: IconProps) => (
    <svg viewBox="0 0 569 512" fill="currentColor" className="size-8" {...props}>
      <title>React</title>
      <path d="M285.5 201c-30.1 0-54.5 24.4-54.5 54.5s24.4 54.5 54.5 54.5 54.5-24.4 54.5-54.5-24.4-54.5-54.5-54.5z" />
      <path d="M568.96 256c0-42.79-39.62-80.31-102.71-105.01.84-5.56 1.6-11.06 2.15-16.46 6.22-61.48-8.59-105.85-41.69-124.97C389.68-11.83 337.37 3.69 284.48 46.02 231.59 3.69 179.28-11.83 142.25 9.55c-33.1 19.11-47.91 63.48-41.69 124.97.54 5.4 1.28 10.92 2.15 16.5C39.62 175.69 0 213.21 0 256c0 42.79 39.62 80.31 102.71 105.01-.84 5.56-1.58 11.06-2.15 16.46-6.22 61.48 8.59 105.85 41.69 124.97 37.03 21.38 89.34 5.86 142.23-36.46 52.89 42.32 105.2 57.84 142.23 36.46 33.1-19.11 47.91-63.48 41.69-124.97-.54-5.4-1.28-10.9-2.15-16.46 63.09-24.7 102.71-62.22 102.71-105.01z" />
    </svg>
  ),

  // 3. TypeScript (from SVGL)
  typescript: (props: IconProps) => (
    <svg viewBox="0 0 256 256" fill="currentColor" className="size-8" {...props}>
      <title>TypeScript</title>
      <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0z" fill="#3178C6" />
      <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 00-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 017.558 2.719 41.7 41.7 0 016.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0110.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 01-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" fill="#FFF" />
    </svg>
  ),

  // 4. Claude Code (Official Terracotta logomark)
  claudecode: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className="size-8" {...props}>
      <title>Claude Code</title>
      <path clipRule="evenodd" d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" fill="#D97757" fillRule="evenodd" />
    </svg>
  ),

  // 5. Codex (from SVGL)
  codex: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-8" {...props}>
      <title>OpenAI Codex</title>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-3.5-9.5l2.5-2.5 2.5 2.5-1.4 1.4L11 10.8V15H9v-4.2l-1.1 1.1-1.4-1.4z" />
    </svg>
  ),

  // 6. OpenCode (Official SVGL block mark)
  opencode: (props: IconProps) => (
    <svg viewBox="0 0 512 512" fill="none" className="size-8" {...props}>
      <title>OpenCode</title>
      <rect width="512" height="512" rx="64" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />
      <path d="M320 224V352H192V224H320Z" fill="#5A5858" />
      <path fillRule="evenodd" clipRule="evenodd" d="M384 416H128V96H384V416ZM320 160H192V352H320V160Z" fill="white" className="dark:fill-zinc-900" />
    </svg>
  ),

  // 7. Antigravity (Google Antigravity vector from SVGL)
  antigravity: (props: IconProps) => (
    <svg viewBox="0 0 16 15" fill="none" className="size-8" {...props}>
      <title>Google Antigravity</title>
      <path d="M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z" fill="#4285F4" />
    </svg>
  ),

  // 8. 9Router (Official 9Router Favicon SVG)
  router9: (props: IconProps) => (
    <svg viewBox="0 0 32 32" fill="none" className="size-8" {...props}>
      <title>9Router</title>
      <rect width="32" height="32" rx="6" fill="#F97815" />
      <text x="16" y="24" fontFamily="system-ui, -apple-system, sans-serif" fontSize="20" fontWeight="700" fill="white" textAnchor="middle">9</text>
    </svg>
  ),

  // 9. Hermes Agent (Official Nous Caduceus Mark)
  hermes: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-8" {...props}>
      <title>Hermes Agent</title>
      <circle cx="12" cy="4" r="2" fill="currentColor" />
      <path d="M12 6v14" />
      <path d="M7 10c0-2 2.5-3 5-3s5 1 5 3-2.5 3-5 3-5 1-5 3 2.5 3 5 3 5-1 5-3" />
      <path d="M4 8l3 2-3 2" />
      <path d="M20 8l-3 2 3 2" />
    </svg>
  ),
  framermotion: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="size-8" {...props}>
      <title>Framer Motion</title>
      <path d="M12 12l-8 -8v16l16 -16v16l-4 -4" />
      <path d="M20 12l-8 8l-4 -4" />
    </svg>
  ),
  tailwindcss: (props: IconProps) => (
    <svg viewBox="0 0 24 24" className="size-8" fill="currentColor" {...props}>
      <title>Tailwind CSS</title>
      <path d="m12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576z" />
    </svg>
  )
};
