import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChatProvider } from '@/contexts/ChatContext'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GameChat - Anonymous Gaming Discussions',
  description: 'Join anonymous discussions about games, streamers, and esports. Create threads, chat in real-time, and connect with fellow gamers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen`}>
        <ChatProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
            <footer className="border-t border-gray-800 py-6 mt-auto">
              <div className="container mx-auto px-4 text-center text-gray-400">
                <p>&copy; 2024 GameChat - Anonymous Gaming Discussions</p>
              </div>
            </footer>
          </div>
        </ChatProvider>
      </body>
    </html>
  )
}