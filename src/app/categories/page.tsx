'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface GameCategory {
  id: string
  name: string
  description: string
  threadCount: number
  activeUsers: number
  lastActivity: string
  isHot: boolean
  color: string
}

const categories: GameCategory[] = [
  {
    id: 'popular',
    name: 'Popular Games',
    description: 'Discuss the biggest and most talked-about games right now',
    threadCount: 234,
    activeUsers: 156,
    lastActivity: '1 min ago',
    isHot: true,
    color: 'from-red-600 to-orange-600'
  },
  {
    id: 'indie',
    name: 'Indie Games',
    description: 'Hidden gems and creative independent games worth discussing',
    threadCount: 89,
    activeUsers: 34,
    lastActivity: '3 mins ago',
    isHot: false,
    color: 'from-purple-600 to-pink-600'
  },
  {
    id: 'esports',
    name: 'Esports',
    description: 'Competitive gaming, tournaments, and professional play',
    threadCount: 156,
    activeUsers: 89,
    lastActivity: '30 secs ago',
    isHot: true,
    color: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'streamers',
    name: 'Streamers',
    description: 'Talk about your favorite content creators and live streams',
    threadCount: 67,
    activeUsers: 45,
    lastActivity: '2 mins ago',
    isHot: false,
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'mobile',
    name: 'Mobile Games',
    description: 'Gaming on the go - mobile and handheld discussions',
    threadCount: 45,
    activeUsers: 23,
    lastActivity: '5 mins ago',
    isHot: false,
    color: 'from-yellow-600 to-amber-600'
  },
  {
    id: 'retro',
    name: 'Retro Gaming',
    description: 'Classic games, nostalgia, and gaming history',
    threadCount: 78,
    activeUsers: 29,
    lastActivity: '7 mins ago',
    isHot: false,
    color: 'from-indigo-600 to-purple-600'
  },
  {
    id: 'reviews',
    name: 'Game Reviews',
    description: 'Share opinions, ratings, and detailed game reviews',
    threadCount: 123,
    activeUsers: 67,
    lastActivity: '4 mins ago',
    isHot: false,
    color: 'from-teal-600 to-blue-600'
  },
  {
    id: 'tech',
    name: 'Gaming Tech',
    description: 'Hardware, mods, and technical gaming discussions',
    threadCount: 92,
    activeUsers: 38,
    lastActivity: '6 mins ago',
    isHot: false,
    color: 'from-gray-600 to-slate-600'
  }
]

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Gaming Categories</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Choose a category to join ongoing discussions or start a new conversation about your favorite games.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="bg-gray-800 border-gray-700 hover:border-purple-600 transition-all duration-300 group cursor-pointer"
          >
            <Link href={`/category/${category.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <span className="text-white font-bold text-lg">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  {category.isHot && (
                    <Badge className="bg-red-600 text-white">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-purple-400 transition-colors">
                  {category.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {category.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">
                    {category.threadCount} threads
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400">{category.activeUsers} online</span>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500">
                  Last activity: {category.lastActivity}
                </div>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white group-hover:bg-purple-500 transition-colors"
                  size="sm"
                >
                  Join Discussion
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="text-center pt-8">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Can't find the right category?</h3>
          <p className="text-gray-400 mb-4">
            Start a new discussion in any category or suggest a new category for the community.
          </p>
          <Link href="/thread/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Create New Thread
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}