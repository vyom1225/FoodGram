import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface Story {
  id: string
  user: {
    name: string
    avatar: string
  }
  image: string
  timestamp: string
  likes: number
}

interface StoriesProps {
  stories: Story[]
}

export function Stories({ stories }: StoriesProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set())
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const handleStoryClick = (story: Story) => {
    setSelectedStory(story)
    setCurrentStoryIndex(stories.findIndex(s => s.id === story.id))
    setProgress(0)
    setIsPaused(false)
  }

  const handleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId)
      } else {
        newLiked.add(storyId)
      }
      return newLiked
    })
  }

  const nextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setSelectedStory(stories[currentStoryIndex + 1])
      setProgress(0)
      setIsPaused(false)
    } else {
      setSelectedStory(null)
      setCurrentStoryIndex(0)
      setProgress(0)
    }
  }, [currentStoryIndex, stories])

  const previousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1)
      setSelectedStory(stories[currentStoryIndex - 1])
      setProgress(0)
      setIsPaused(false)
    }
  }, [currentStoryIndex, stories])

  useEffect(() => {
    if (selectedStory && !isPaused) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStory()
            return 0
          }
          return prev + (100 / (15 * 10)) // Update every 100ms for smooth progress
        })
      }, 100)

      return () => clearInterval(timer)
    }
  }, [selectedStory, nextStory, isPaused])

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 mb-6 no-scrollbar">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => handleStoryClick(story)}
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-500">
                <Avatar className="w-full h-full border-2 border-white">
                  <AvatarImage src={story.user.avatar} alt={story.user.name} />
                  <AvatarFallback>{story.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs bg-white rounded-full px-2 py-0.5 shadow-sm">
                {story.timestamp}
              </span>
            </div>
            <span className="text-xs text-gray-600">{story.user.name}</span>
          </div>
        ))}
      </div>

      {selectedStory && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setSelectedStory(null)}>
          <div className="relative max-w-md w-full mx-4 my-16" onClick={e => e.stopPropagation()}>
            {/* Timer line */}
            <div className="absolute top-0 left-0 right-0 z-10">
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center z-20">
              <div className="flex-1 flex justify-start px-2">
                {currentStoryIndex > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      previousStory()
                    }}
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}
              </div>
              <div className="flex-1 flex justify-end px-2">
                {currentStoryIndex < stories.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      nextStory()
                    }}
                    className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}
              </div>
            </div>

            <div className="relative aspect-[9/16] rounded-lg overflow-hidden mt-4">
              <img
                src={selectedStory.image}
                alt={`${selectedStory.user.name}'s story`}
                className="w-full h-full object-cover"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              />
              
              {/* Top bar with user info */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedStory.user.avatar} />
                    <AvatarFallback>{selectedStory.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-white font-medium">{selectedStory.user.name}</span>
                  <span className="text-white/70 text-sm">{selectedStory.timestamp}</span>
                </div>
              </div>

              {/* Bottom bar with like button */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">
                      {likedStories.has(selectedStory.id) ? 'You liked this' : 'Like this story'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleLike(selectedStory.id)}
                    className="text-white hover:text-pink-500 transition-colors"
                  >
                    <Heart className={`h-6 w-6 ${likedStories.has(selectedStory.id) ? 'fill-pink-500 text-pink-500' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 