'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { useChatContext } from '@/contexts/ChatContext'
import MessageBubble from './MessageBubble'

interface ChatRoomProps {
  threadId: string
  threadTitle: string
  category: string
  onClose?: () => void
}

export default function ChatRoom({ threadId, threadTitle, category, onClose }: ChatRoomProps) {
  const { state, sendMessage } = useChatContext()
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const messages = state.messages[threadId] || []
  const currentThread = state.threads.find(t => t.id === threadId)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    sendMessage(newMessage, threadId)
    setNewMessage('')
    setIsTyping(false)
    
    // Focus back to input
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleInputChange = (value: string) => {
    setNewMessage(value)
    setIsTyping(value.length > 0)
  }

  const onlineCount = state.onlineUsers.length || Math.floor(Math.random() * 50) + 10

  return (
    <Card className="bg-gray-800 border-gray-700 h-full flex flex-col">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg text-white">{threadTitle}</CardTitle>
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-400">
                {category}
              </Badge>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">{onlineCount} online</span>
              </div>
              {currentThread && (
                <span className="text-xs text-gray-400">
                  {currentThread.messageCount} messages
                </span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full px-4 py-2">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="mb-2">No messages yet in this thread.</p>
                <p className="text-sm">Be the first to start the conversation!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwnMessage={message.userId === state.currentUser?.id}
                  showAvatar={
                    index === 0 || 
                    messages[index - 1].userId !== message.userId ||
                    (new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime()) > 300000 // 5 minutes
                  }
                />
              ))
            )}
            
            {/* Typing indicator */}
            {isTyping && state.currentUser && (
              <div className="flex items-center gap-2 text-xs text-gray-400 px-3">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span>You are typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="border-t border-gray-700 p-4 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={`Message #${threadTitle.toLowerCase().replace(/\s+/g, '-')}...`}
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
            maxLength={500}
            disabled={!state.currentUser}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || !state.currentUser}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6"
          >
            Send
          </Button>
        </form>
        
        {state.currentUser && (
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <span>Chatting as {state.currentUser.username}</span>
            <span>{newMessage.length}/500</span>
          </div>
        )}
      </div>
    </Card>
  )
}