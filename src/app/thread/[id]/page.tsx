'use client'

import { useEffect, useState } from 'react'
import { useChatContext } from '@/contexts/ChatContext'
import ChatRoom from '@/components/ChatRoom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ThreadPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ThreadPage({ params }: ThreadPageProps) {
  const { state, joinThread, leaveThread } = useChatContext()
  const [isLoading, setIsLoading] = useState(true)
  const [threadId, setThreadId] = useState<string>('')

  const thread = state.threads.find(t => t.id === threadId)

  useEffect(() => {
    params.then(resolvedParams => {
      setThreadId(resolvedParams.id)
      joinThread(resolvedParams.id)
      setIsLoading(false)
    })

    return () => {
      leaveThread()
    }
  }, [params, joinThread, leaveThread])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
          <p className="text-gray-400">Loading discussion...</p>
        </div>
      </div>
    )
  }

  if (!thread) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h1 className="text-2xl font-bold mb-4">Thread Not Found</h1>
            <p className="text-gray-400 mb-6">
              This discussion thread doesn't exist or may have been removed.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/categories">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Browse Categories
                </Button>
              </Link>
              <Link href="/thread/create">
                <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">
                  Start New Discussion
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="/categories" className="hover:text-white transition-colors">
            Categories
          </Link>
          <span className="mx-2">›</span>
          <Link href={`/category/${thread.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-white transition-colors">
            {thread.category}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-white">{thread.title}</span>
        </nav>
      </div>

      {/* Thread Info Banner */}
      <div className="mb-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg border border-gray-800 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{thread.title}</h1>
            <p className="text-gray-400">
              Started {new Date(thread.createdAt).toLocaleDateString()} • {thread.messageCount} messages
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/thread/create">
              <Button variant="outline" size="sm" className="border-purple-600 text-purple-400 hover:bg-purple-600/20">
                Start New Thread
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Chat Room */}
      <div style={{ height: 'calc(100vh - 280px)' }}>
        <ChatRoom
          threadId={threadId}
          threadTitle={thread.title}
          category={thread.category}
        />
      </div>

      {/* Mobile Footer Info */}
      <div className="mt-6 lg:hidden">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="text-center text-sm text-gray-400">
              <p>💡 Tip: Swipe up to see more messages or refresh to get the latest updates</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}