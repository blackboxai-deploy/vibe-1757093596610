'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface Message {
  id: string
  content: string
  userId: string
  username: string
  timestamp: Date
  threadId: string
  userColor: string
}

export interface Thread {
  id: string
  title: string
  category: string
  createdAt: Date
  lastActivity: Date
  messageCount: number
  isActive: boolean
  description?: string
}

export interface User {
  id: string
  username: string
  color: string
  isOnline: boolean
  joinedAt: Date
}

interface ChatState {
  threads: Thread[]
  messages: { [threadId: string]: Message[] }
  currentUser: User | null
  onlineUsers: User[]
  currentThread: string | null
  isConnected: boolean
}

type ChatAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_THREAD'; payload: Thread }
  | { type: 'UPDATE_THREAD'; payload: { id: string; updates: Partial<Thread> } }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_MESSAGES'; payload: { threadId: string; messages: Message[] } }
  | { type: 'SET_CURRENT_THREAD'; payload: string | null }
  | { type: 'SET_ONLINE_USERS'; payload: User[] }
  | { type: 'SET_CONNECTION_STATUS'; payload: boolean }
  | { type: 'LOAD_INITIAL_DATA'; payload: { threads: Thread[]; messages: { [key: string]: Message[] } } }

const initialState: ChatState = {
  threads: [],
  messages: {},
  currentUser: null,
  onlineUsers: [],
  currentThread: null,
  isConnected: false
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload }
    
    case 'ADD_THREAD':
      return { 
        ...state, 
        threads: [action.payload, ...state.threads]
      }
    
    case 'UPDATE_THREAD':
      return {
        ...state,
        threads: state.threads.map(thread => 
          thread.id === action.payload.id 
            ? { ...thread, ...action.payload.updates }
            : thread
        )
      }
    
    case 'ADD_MESSAGE':
      const { payload: message } = action
      const threadMessages = state.messages[message.threadId] || []
      return {
        ...state,
        messages: {
          ...state.messages,
          [message.threadId]: [...threadMessages, message]
        }
      }
    
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.threadId]: action.payload.messages
        }
      }
    
    case 'SET_CURRENT_THREAD':
      return { ...state, currentThread: action.payload }
    
    case 'SET_ONLINE_USERS':
      return { ...state, onlineUsers: action.payload }
    
    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload }
    
    case 'LOAD_INITIAL_DATA':
      return {
        ...state,
        threads: action.payload.threads,
        messages: action.payload.messages
      }
    
    default:
      return state
  }
}

interface ChatContextType {
  state: ChatState
  dispatch: React.Dispatch<ChatAction>
  sendMessage: (content: string, threadId: string) => void
  createThread: (title: string, category: string, initialMessage: string) => string
  joinThread: (threadId: string) => void
  leaveThread: () => void
  generateUserId: () => string
  generateUserColor: () => string
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// User color palette for anonymous users
const userColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
]

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  // Generate anonymous user ID
  const generateUserId = () => {
    return `anon_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`
  }

  // Generate user color
  const generateUserColor = () => {
    return userColors[Math.floor(Math.random() * userColors.length)]
  }

  // Initialize user on first load
  useEffect(() => {
    const storedUser = localStorage.getItem('chatUser')
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) })
    } else {
      const newUser: User = {
        id: generateUserId(),
        username: `Anonymous${Math.floor(Math.random() * 1000)}`,
        color: generateUserColor(),
        isOnline: true,
        joinedAt: new Date()
      }
      localStorage.setItem('chatUser', JSON.stringify(newUser))
      dispatch({ type: 'SET_USER', payload: newUser })
    }

    // Load mock data
    loadMockData()
  }, [])

  // Load mock data for demonstration
  const loadMockData = () => {
    const mockThreads: Thread[] = [
      {
        id: '1',
        title: 'New Elden Ring DLC Discussion',
        category: 'Action RPG',
        createdAt: new Date(Date.now() - 3600000),
        lastActivity: new Date(Date.now() - 120000),
        messageCount: 156,
        isActive: true,
        description: 'Discussing the latest DLC content and strategies'
      },
      {
        id: '2',
        title: 'CS2 Major Championship Predictions',
        category: 'Esports',
        createdAt: new Date(Date.now() - 7200000),
        lastActivity: new Date(Date.now() - 300000),
        messageCount: 89,
        isActive: true,
        description: 'Who will win the upcoming major tournament?'
      }
    ]

    const mockMessages = {
      '1': [
        {
          id: 'm1',
          content: 'The new DLC looks amazing! Has anyone tried the new bosses yet?',
          userId: 'anon_123',
          username: 'Anonymous123',
          timestamp: new Date(Date.now() - 600000),
          threadId: '1',
          userColor: '#FF6B6B'
        },
        {
          id: 'm2',
          content: 'Yeah! The difficulty is insane but so rewarding. The new areas are beautiful.',
          userId: 'anon_456',
          username: 'Anonymous456',
          timestamp: new Date(Date.now() - 300000),
          threadId: '1',
          userColor: '#4ECDC4'
        }
      ],
      '2': [
        {
          id: 'm3',
          content: 'I think Team Liquid has a real shot this time. Their recent performance has been incredible.',
          userId: 'anon_789',
          username: 'Anonymous789',
          timestamp: new Date(Date.now() - 480000),
          threadId: '2',
          userColor: '#45B7D1'
        }
      ]
    }

    dispatch({ 
      type: 'LOAD_INITIAL_DATA', 
      payload: { threads: mockThreads, messages: mockMessages } 
    })
  }

  const sendMessage = (content: string, threadId: string) => {
    if (!state.currentUser || !content.trim()) return

    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      content: content.trim(),
      userId: state.currentUser.id,
      username: state.currentUser.username,
      timestamp: new Date(),
      threadId,
      userColor: state.currentUser.color
    }

    dispatch({ type: 'ADD_MESSAGE', payload: newMessage })
    
    // Update thread activity
    dispatch({ 
      type: 'UPDATE_THREAD', 
      payload: { 
        id: threadId, 
        updates: { 
          lastActivity: new Date(),
          messageCount: (state.messages[threadId]?.length || 0) + 1
        }
      }
    })
  }

  const createThread = (title: string, category: string, initialMessage: string): string => {
    const threadId = `thread_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
    
    const newThread: Thread = {
      id: threadId,
      title: title.trim(),
      category,
      createdAt: new Date(),
      lastActivity: new Date(),
      messageCount: 1,
      isActive: true
    }

    dispatch({ type: 'ADD_THREAD', payload: newThread })

    // Add initial message
    if (initialMessage.trim() && state.currentUser) {
      sendMessage(initialMessage, threadId)
    }

    return threadId
  }

  const joinThread = (threadId: string) => {
    dispatch({ type: 'SET_CURRENT_THREAD', payload: threadId })
  }

  const leaveThread = () => {
    dispatch({ type: 'SET_CURRENT_THREAD', payload: null })
  }

  const contextValue: ChatContextType = {
    state,
    dispatch,
    sendMessage,
    createThread,
    joinThread,
    leaveThread,
    generateUserId,
    generateUserColor
  }

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}