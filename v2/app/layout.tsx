import type { Metadata } from 'next';
import '@fontsource-variable/syne';
import '@fontsource-variable/inter';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://julibecaj.github.io'), title: 'Julian Becaj — Full-stack Software Engineer', description: 'Full-stack software engineer in Tirana, Albania. Selected projects, experience and work with React, Next.js and Spring Boot.', alternates: { canonical: '/' }, openGraph: { title: 'Julian Becaj — Full-stack Software Engineer', description: 'Thoughtful interfaces. Solid foundations. Selected work by Julian Becaj.', url: 'https://julibecaj.github.io', type: 'website' }, robots: { index: true, follow: true } };
export default function Layout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html> }
