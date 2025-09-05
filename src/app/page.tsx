'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import PopularGames from '@/components/PopularGames'
import { useState, useEffect } from 'react'

interface TrendingThread {
  id: string
  title: string
  category: string
  messageCount: number
  lastActivity: string
  isActive: boolean
}

export default function HomePage() {
  const [trendingThreads, setTrendingThreads] = useState<TrendingThread[]>([])

  useEffect(() => {
    // Mock trending threads data
    setTrendingThreads([
      {
        id: '1',
        title: 'New Elden Ring DLC Discussion',
        category: 'Action RPG',
        messageCount: 156,
        lastActivity: '2 mins ago',
        isActive: true
      },
      {
        id: '2',
        title: 'CS2 Major Championship Predictions',
        category: 'Esports',
        messageCount: 89,
        lastActivity: '5 mins ago',
        isActive: true
      },
      {
        id: '3',
        title: 'Best Indie Games of 2024',
        category: 'Indie',
        messageCount: 234,
        lastActivity: '8 mins ago',
        isActive: false
      },
      {
        id: '4',
        title: 'Streamers React to Game Awards',
        category: 'Streamers',
        messageCount: 67,
        lastActivity: '12 mins ago',
        isActive: true
      }
    ])
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-gray-800">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          GameChat
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join anonymous discussions about your favorite games, streamers, and esports. 
          No registration required - just jump in and start chatting!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/categories">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
              Browse Categories
            </Button>
          </Link>
          <Link href="/thread/create">
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">
              Start a Discussion
            </Button>
          </Link>
        </div>
      </div>

      {/* Popular Games Section */}
      <PopularGames />

      {/* Trending Discussions */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Trending Discussions</h2>
          <Link href="/categories">
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
              View All →
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {trendingThreads.map((thread) => (
            <Card key={thread.id} className="bg-gray-800 border-gray-700 hover:border-purple-600 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg text-white hover:text-purple-400 transition-colors">
                      <Link href={`/thread/${thread.id}`}>
                        {thread.title}
                      </Link>
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                        {thread.category}
                      </Badge>
                      {thread.isActive && (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-400">Live</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{thread.messageCount} messages</span>
                  <span>Active {thread.lastActivity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-purple-400">1,247</CardTitle>
            <CardDescription>Active Discussions</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gray-800 border-gray-700 text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-400">24,891</CardTitle>
            <CardDescription>Messages Today</CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-gray-800 border-gray-700 text-center">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400">892</CardTitle>
            <CardDescription>Online Now</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}