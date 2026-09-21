// The app's monospace face, for IDs inside rebuilt app screens. aift-web loads
// Geist Mono the same way (src/app/layout.tsx) and maps `font-mono` to it.
// Declared here rather than in the help layout so only pages with app screens
// pay for it.
import { Geist_Mono } from 'next/font/google'

export const appMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
