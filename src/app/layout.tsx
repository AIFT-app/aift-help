import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { DocsHeader } from '@/components/DocsHeader'
import { DocsSidebar } from '@/components/DocsSidebar'
import { Footer } from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — AI Finance Team Help',
    default: 'AI Finance Team Help',
  },
  description: 'Help center for AI Finance Team',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-zinc-950 antialiased">
        <DocsHeader />

        <div className="flex min-h-svh flex-col pt-14">
          {/* Desktop sidebar */}
          <div className="fixed inset-y-0 left-0 top-14 hidden w-64 overflow-y-auto border-r border-zinc-950/5 lg:flex lg:flex-col">
            <DocsSidebar />
          </div>

          {/* Main content */}
          <div className="flex min-h-0 flex-1 flex-col lg:pl-64">
            <div className="mx-auto flex w-full max-w-screen-xl flex-1 flex-col">
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
