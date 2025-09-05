'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useChatContext } from '@/contexts/ChatContext'
import { useRouter } from 'next/navigation'

interface CreateThreadProps {
  trigger?: React.ReactNode
  defaultCategory?: string
  onSuccess?: (threadId: string) => void
}

const gameCategories = [
  { value: 'popular', label: 'Popular Games' },
  { value: 'indie', label: 'Indie Games' },
  { value: 'esports', label: 'Esports' },
  { value: 'streamers', label: 'Streamers' },
  { value: 'mobile', label: 'Mobile Games' },
  { value: 'retro', label: 'Retro Gaming' },
  { value: 'reviews', label: 'Game Reviews' },
  { value: 'tech', label: 'Gaming Tech' }
]

export default function CreateThread({ trigger, defaultCategory, onSuccess }: CreateThreadProps) {
  const { createThread } = useChatContext()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    category: defaultCategory || '',
    initialMessage: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Thread title is required'
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters long'
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters'
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }

    if (!formData.initialMessage.trim()) {
      newErrors.initialMessage = 'Initial message is required'
    } else if (formData.initialMessage.length < 10) {
      newErrors.initialMessage = 'Message must be at least 10 characters long'
    } else if (formData.initialMessage.length > 1000) {
      newErrors.initialMessage = 'Message must be less than 1000 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const categoryLabel = gameCategories.find(cat => cat.value === formData.category)?.label || formData.category
      const threadId = createThread(formData.title, categoryLabel, formData.initialMessage)
      
      // Reset form
      setFormData({ title: '', category: defaultCategory || '', initialMessage: '' })
      setErrors({})
      setOpen(false)

      // Call success callback or navigate
      if (onSuccess) {
        onSuccess(threadId)
      } else {
        router.push(`/thread/${threadId}`)
      }
    } catch (error) {
      console.error('Failed to create thread:', error)
      setErrors({ submit: 'Failed to create thread. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            Start New Discussion
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Start a New Discussion</DialogTitle>
          <DialogDescription className="text-gray-400">
            Create a new thread to discuss games, share opinions, or ask questions.
            All discussions are anonymous and open to everyone.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Thread Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Thread Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="What would you like to discuss?"
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500"
              maxLength={100}
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title}</p>
            )}
            <div className="text-right text-xs text-gray-400">
              {formData.title.length}/100
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                {gameCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="text-white focus:bg-gray-600">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-400 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Initial Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Your Message *
            </Label>
            <Textarea
              id="message"
              value={formData.initialMessage}
              onChange={(e) => handleInputChange('initialMessage', e.target.value)}
              placeholder="Share your thoughts, ask a question, or start the discussion..."
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-purple-500 min-h-[120px] resize-none"
              maxLength={1000}
            />
            {errors.initialMessage && (
              <p className="text-red-400 text-sm">{errors.initialMessage}</p>
            )}
            <div className="text-right text-xs text-gray-400">
              {formData.initialMessage.length}/1000
            </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="text-red-400 text-sm">{errors.submit}</p>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim() || !formData.category || !formData.initialMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isLoading ? 'Creating...' : 'Create Thread'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}