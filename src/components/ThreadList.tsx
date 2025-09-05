'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatContext } from '@/contexts/ChatContext'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface ThreadListProps {
  category?: string
  limit?: number
  showCreateButton?: boolean
  onThreadSelect?: (threadId: string) => void
}

export default function ThreadList({ 
  category, 
  limit, 
  showCreateButton = true,
  onThreadSelect 
}: ThreadListProps) {
  const { state } = useChatContext()
  
  // Filter threads by category if specified
  let filteredThreads = state.threads
  if (category && category !== 'all') {
    filteredThreads = state.threads.filter(thread => 
      thread.category.toLowerCase() === category.toLowerCase()
    )
  }

  // Apply limit if specified
  if (limit) {
    filteredThreads = filteredThreads.slice(0, limit)
  }

  // Sort by last activity
  filteredThreads = [...filteredThreads].sort((a, b) => 
    new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
  )

  const formatLastActivity = (date: Date) => {
    const now = new Date()
    const activityTime = new Date(date)
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    return formatDistanceToNow(activityTime, { addSuffix: true })
  }

  const handleThreadClick = (threadId: string) => {
    if (onThreadSelect) {
      onThreadSelect(threadId)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          {category && category !== 'all' 
            ? `${category.charAt(0).toUpperCase() + category.slice(1)} Discussions`
            : 'Active Discussions'
          }
        </h3>
        {showCreateButton && (
          <Link href="/thread/create">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
              + New Thread
            </Button>
          </Link>
        )}
      </div>

      {/* Thread List */}
      <div className="space-y-3">
        {filteredThreads.length === 0 ? (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="text-center py-8">
              <p className="text-gray-400 mb-4">
                {category && category !== 'all'
                  ? `No discussions found in ${category} category.`
                  : 'No active discussions yet.'
                }
              </p>
              {showCreateButton && (
                <Link href="/thread/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start the First Discussion
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="space-y-3 pr-4">
              {filteredThreads.map((thread) => (
                <Card 
                  key={thread.id}
                  className="bg-gray-800 border-gray-700 hover:border-purple-600 transition-colors cursor-pointer group"
                  onClick={() => handleThreadClick(thread.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base text-white group-hover:text-purple-400 transition-colors truncate">
                          {onThreadSelect ? (
                            <span>{thread.title}</span>
                          ) : (
                            <Link href={`/thread/${thread.id}`}>
                              {thread.title}
                            </Link>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 text-xs">
                            {thread.category}
                          </Badge>
                          {thread.isActive && (
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-400">Live</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-gray-400">
                        <span>{thread.messageCount} messages</span>
                        <span>Active {formatLastActivity(thread.lastActivity)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Created {formatLastActivity(thread.createdAt)}
                      </div>
                    </div>
                    
                    {/* Show latest message preview if available */}
                    {state.messages[thread.id] && state.messages[thread.id].length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-700">
                        <p className="text-xs text-gray-400 truncate">
                          <span style={{ color: state.messages[thread.id][state.messages[thread.id].length - 1].userColor }}>
                            {state.messages[thread.id][state.messages[thread.id].length - 1].username}:
                          </span>
                          {' '}
                          {state.messages[thread.id][state.messages[thread.id].length - 1].content}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      {/* Show more link if limited */}
      {limit && filteredThreads.length >= limit && (
        <div className="text-center">
          <Link href={category ? `/category/${category}` : '/categories'}>
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
              View All Discussions →
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}