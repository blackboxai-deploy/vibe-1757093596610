'use client'

import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Message } from '@/contexts/ChatContext'
import { formatDistanceToNow } from 'date-fns'

interface MessageBubbleProps {
  message: Message
  isOwnMessage: boolean
  showAvatar: boolean
}

export default function MessageBubble({ message, isOwnMessage, showAvatar }: MessageBubbleProps) {
  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const messageTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    
    return formatDistanceToNow(messageTime, { addSuffix: true })
  }

  const getInitials = (username: string) => {
    return username.slice(0, 2).toUpperCase()
  }

  const linkifyText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <div className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
        <Avatar className="w-8 h-8">
          <AvatarFallback 
            className="text-white text-xs font-medium"
            style={{ backgroundColor: message.userColor }}
          >
            {getInitials(message.username)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        {/* Username and timestamp */}
        {showAvatar && (
          <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
            <span 
              className="text-sm font-medium"
              style={{ color: message.userColor }}
            >
              {message.username}
            </span>
            <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatTime(message.timestamp)}
            </span>
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`
            px-4 py-2 rounded-2xl break-words
            ${isOwnMessage 
              ? 'bg-purple-600 text-white rounded-br-md' 
              : 'bg-gray-700 text-gray-100 rounded-bl-md'
            }
            ${!showAvatar ? 'mt-1' : ''}
          `}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {linkifyText(message.content)}
          </p>
        </div>

        {/* Timestamp for non-avatar messages */}
        {!showAvatar && (
          <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  )
}