'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface PopularGame {
  id: string
  title: string
  genre: string
  activeThreads: number
  onlineUsers: number
  trending: boolean
  imageUrl: string
  description: string
}

const popularGames: PopularGame[] = [
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    genre: 'Action RPG',
    activeThreads: 89,
    onlineUsers: 234,
    trending: true,
    imageUrl: 'https://placehold.co/300x400?text=Elden+Ring+fantasy+medieval+warrior+on+mystical+landscape',
    description: 'FromSoftware\'s epic open-world adventure'
  },
  {
    id: 'counter-strike-2',
    title: 'Counter-Strike 2',
    genre: 'FPS',
    activeThreads: 156,
    onlineUsers: 456,
    trending: true,
    imageUrl: 'https://placehold.co/300x400?text=Counter+Strike+tactical+shooter+modern+warfare',
    description: 'The legendary tactical shooter returns'
  },
  {
    id: 'baldurs-gate-3',
    title: 'Baldur\'s Gate 3',
    genre: 'RPG',
    activeThreads: 67,
    onlineUsers: 189,
    trending: false,
    imageUrl: 'https://placehold.co/300x400?text=Baldurs+Gate+fantasy+RPG+dungeon+and+dragons',
    description: 'Epic D&D adventure with friends'
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    genre: 'Action RPG',
    activeThreads: 45,
    onlineUsers: 123,
    trending: false,
    imageUrl: 'https://placehold.co/300x400?text=Cyberpunk+futuristic+neon+city+technology',
    description: 'Night City awaits your story'
  },
  {
    id: 'valorant',
    title: 'Valorant',
    genre: 'FPS',
    activeThreads: 98,
    onlineUsers: 345,
    trending: true,
    imageUrl: 'https://placehold.co/300x400?text=Valorant+tactical+shooter+agents+abilities',
    description: 'Tactical shooter with unique agents'
  },
  {
    id: 'minecraft',
    title: 'Minecraft',
    genre: 'Sandbox',
    activeThreads: 234,
    onlineUsers: 678,
    trending: false,
    imageUrl: 'https://placehold.co/300x400?text=Minecraft+blocky+world+building+creativity',
    description: 'Build, explore, and survive together'
  }
]

export default function PopularGames() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Popular Games</h2>
        <Link href="/categories">
          <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
            View All Games →
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {popularGames.map((game) => (
          <Card 
            key={game.id}
            className="bg-gray-800 border-gray-700 hover:border-purple-600 transition-all duration-300 group cursor-pointer overflow-hidden"
          >
            <Link href={`/game/${game.id}`}>
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={game.imageUrl}
                  alt={`${game.title} game cover`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/300x400?text=${encodeURIComponent(game.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                
                {game.trending && (
                  <Badge className="absolute top-2 right-2 bg-red-600 text-white">
                    🔥 Trending
                  </Badge>
                )}
                
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                    {game.title}
                  </h3>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 text-xs">
                    {game.genre}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-3">
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">
                  {game.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">
                      {game.activeThreads} threads
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">{game.onlineUsers}</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs"
                  >
                    Join Chat
                  </Button>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}