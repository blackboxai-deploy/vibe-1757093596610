'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ThreadList from '@/components/ThreadList'
import CreateThread from '@/components/CreateThread'
import { useChatContext } from '@/contexts/ChatContext'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

const categoryInfo: Record<string, { 
  name: string
  description: string
  color: string
  icon: string
}> = {
  popular: {
    name: 'Popular Games',
    description: 'Discuss the biggest and most talked-about games right now',
    color: 'from-red-600 to-orange-600',
    icon: '🔥'
  },
  indie: {
    name: 'Indie Games',
    description: 'Hidden gems and creative independent games worth discussing',
    color: 'from-purple-600 to-pink-600',
    icon: '💎'
  },
  esports: {
    name: 'Esports',
    description: 'Competitive gaming, tournaments, and professional play',
    color: 'from-blue-600 to-cyan-600',
    icon: '🏆'
  },
  streamers: {
    name: 'Streamers',
    description: 'Talk about your favorite content creators and live streams',
    color: 'from-green-600 to-emerald-600',
    icon: '📺'
  },
  mobile: {
    name: 'Mobile Games',
    description: 'Gaming on the go - mobile and handheld discussions',
    color: 'from-yellow-600 to-amber-600',
    icon: '📱'
  },
  retro: {
    name: 'Retro Gaming',
    description: 'Classic games, nostalgia, and gaming history',
    color: 'from-indigo-600 to-purple-600',
    icon: '🕹️'
  },
  reviews: {
    name: 'Game Reviews',
    description: 'Share opinions, ratings, and detailed game reviews',
    color: 'from-teal-600 to-blue-600',
    icon: '⭐'
  },
  tech: {
    name: 'Gaming Tech',
    description: 'Hardware, mods, and technical gaming discussions',
    color: 'from-gray-600 to-slate-600',
    icon: '⚙️'
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { state } = useChatContext()
  const [categorySlug, setCategorySlug] = React.useState<string>('')
  
  React.useEffect(() => {
    params.then(resolvedParams => {
      setCategorySlug(resolvedParams.category)
    })
  }, [params])

  if (!categorySlug) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-400">Loading category...</p>
        </div>
      </div>
    )
  }

  const category = categoryInfo[categorySlug]

  if (!category) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-gray-400 mb-6">
              This category doesn't exist. Choose from our available gaming categories.
            </p>
            <Link href="/categories">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Browse All Categories
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const categoryThreads = state.threads.filter(thread => 
    thread.category.toLowerCase() === category.name.toLowerCase()
  )

  const onlineUsers = Math.floor(Math.random() * 100) + 20
  const todayMessages = categoryThreads.reduce((sum, thread) => sum + thread.messageCount, 0)

  return (
    <div className="space-y-8">
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
        <span className="text-white">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className={`bg-gradient-to-r ${category.color} rounded-lg p-8 text-white`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl">{category.icon}</div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-lg opacity-90">{category.description}</p>
          </div>
        </div>
        
        {/* Category Stats */}
        <div className="flex items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>{onlineUsers} online now</span>
          </div>
          <div>{categoryThreads.length} active threads</div>
          <div>{todayMessages} messages today</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CreateThread 
            defaultCategory={categorySlug}
            trigger={
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                + Start Discussion
              </Button>
            }
          />
          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
            {categoryThreads.length} threads
          </Badge>
        </div>
      </div>

      {/* Thread List */}
      <div className="grid lg:grid-cols-1 gap-8">
        <div>
          <ThreadList 
            category={category.name}
            showCreateButton={false}
          />
        </div>
      </div>

      {/* Category Guidelines */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Discussion Guidelines
          </CardTitle>
          <CardDescription>
            Keep discussions friendly and focused on {category.name.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Stay on topic - discuss {category.name.toLowerCase()} related content</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Be respectful to other community members</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-1">✓</span>
              <span>Share your honest opinions and experiences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">✗</span>
              <span>No spam, self-promotion, or off-topic discussions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">✗</span>
              <span>No hate speech or harassment of any kind</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Empty State */}
      {categoryThreads.length === 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-semibold mb-2">No discussions yet</h3>
            <p className="text-gray-400 mb-6">
              Be the first to start a conversation in {category.name}!
            </p>
            <CreateThread 
              defaultCategory={categorySlug}
              trigger={
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Start the First Discussion
                </Button>
              }
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}