'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

const gameCategories = [
  { name: 'Popular Games', href: '/category/popular', count: 234 },
  { name: 'Indie Games', href: '/category/indie', count: 89 },
  { name: 'Esports', href: '/category/esports', count: 156 },
  { name: 'Streamers', href: '/category/streamers', count: 67 },
  { name: 'Mobile Games', href: '/category/mobile', count: 45 },
  { name: 'Retro Gaming', href: '/category/retro', count: 78 }
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const NavigationContent = () => (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {gameCategories.map((category) => (
          <Link 
            key={category.name}
            href={category.href}
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm"
            onClick={() => setMobileMenuOpen(false)}
          >
            {category.name}
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 text-xs">
              {category.count}
            </Badge>
          </Link>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-3 lg:ml-auto">
        <Link href="/thread/create">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white w-full lg:w-auto"
            onClick={() => setMobileMenuOpen(false)}
          >
            Start Discussion
          </Button>
        </Link>
        <div className="flex items-center gap-2 px-3 py-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">892 online</span>
        </div>
      </div>
    </div>
  )

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              GameChat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block flex-1 mx-8">
            <NavigationContent />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-gray-900 border-gray-800 w-80">
                <div className="mt-6">
                  <NavigationContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}