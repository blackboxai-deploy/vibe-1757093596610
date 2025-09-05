'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CreateThread from '@/components/CreateThread'

export default function CreateThreadPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link href="/categories" className="hover:text-white transition-colors">
          Categories
        </Link>
        <span className="mx-2">›</span>
        <span className="text-white">Start Discussion</span>
      </nav>

      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Start a New Discussion</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Share your thoughts, ask questions, or start conversations about games, streamers, and esports.
          All discussions are anonymous and open to everyone in the community.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Create Thread Form */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Create Your Thread</CardTitle>
              <CardDescription>
                Fill out the form below to start a new discussion thread.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <CreateThread />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tips Card */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">💡 Tips for Great Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Use clear, descriptive titles that explain your topic</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Choose the most relevant category for better visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Provide context in your initial message to spark discussion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Ask questions to encourage community engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>Be respectful and welcoming to all participants</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Popular Categories */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">🔥 Popular Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/category/popular" className="block">
                  <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-700">
                    <span className="mr-2">🎮</span>
                    Popular Games
                  </Button>
                </Link>
                <Link href="/category/esports" className="block">
                  <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-700">
                    <span className="mr-2">🏆</span>
                    Esports
                  </Button>
                </Link>
                <Link href="/category/streamers" className="block">
                  <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-700">
                    <span className="mr-2">📺</span>
                    Streamers
                  </Button>
                </Link>
                <Link href="/category/indie" className="block">
                  <Button variant="ghost" className="w-full justify-start text-left hover:bg-gray-700">
                    <span className="mr-2">💎</span>
                    Indie Games
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Community Stats */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">📊 Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Discussions</span>
                  <span className="text-white font-medium">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Messages Today</span>
                  <span className="text-white font-medium">24,891</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Online Now</span>
                  <span className="text-green-400 font-medium flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    892
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Categories</span>
                  <span className="text-white font-medium">8</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alternative Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg">🚀 Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/categories" className="block">
                  <Button variant="outline" className="w-full border-purple-600 text-purple-400 hover:bg-purple-600/20">
                    Browse Categories
                  </Button>
                </Link>
                <Link href="/" className="block">
                  <Button variant="outline" className="w-full border-gray-600 text-gray-400 hover:bg-gray-600/20">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}