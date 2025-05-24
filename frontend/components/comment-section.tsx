import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Comment {
  id: number
  text: string
  user: {
    name: string
    avatar: string
  }
  timestamp: string
}

interface CommentSectionProps {
  isOpen: boolean
  onClose: () => void
  post: {
    user: {
      name: string
      avatar: string
    }
    restaurant: {
      name: string
      location: string
      rating?: number
    }
    content: {
      notes?: string
      images?: string[]
      image?: string
    }
  }
}

export function CommentSection({ isOpen, onClose, post }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])
  const modalRef = useRef<HTMLDivElement>(null)
  const hasMedia = post.content.images?.length || post.content.image

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const newComment: Comment = {
      id: Date.now(),
      text: comment,
      user: {
        name: "You", // This would come from the logged-in user in a real app
        avatar: "/placeholder.svg"
      },
      timestamp: new Date().toLocaleTimeString()
    }

    setComments(prev => [...prev, newComment])
    setComment("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white w-full max-w-6xl h-[80vh] rounded-xl overflow-hidden flex">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>

        {/* Split view for posts with media */}
        {hasMedia ? (
          <>
            {/* Left side - Post content */}
            <div className="w-1/2 border-r overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <p className="text-sm text-gray-500">{post.restaurant.name}</p>
                  </div>
                </div>

                {post.content.notes && (
                  <p className="text-gray-700 mb-4">{post.content.notes}</p>
                )}

                {post.content.images && post.content.images.length > 0 ? (
                  <div className="relative">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {post.content.images.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-[16/9]">
                              <img
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-4" />
                      <CarouselNext className="right-4" />
                    </Carousel>
                  </div>
                ) : post.content.image && (
                  <img
                    src={post.content.image}
                    alt="Post image"
                    className="w-full aspect-[16/9] object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Right side - Comments */}
            <div className="w-1/2 flex flex-col">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Comments</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                {comments.length === 0 ? (
                  <p className="text-gray-500 text-center">No comments yet</p>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-100 rounded-lg p-3">
                            <div className="font-semibold text-sm">{comment.user.name}</div>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block">{comment.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmitComment} className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <Button type="submit" className="rounded-full">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </form>
            </div>
          </>
        ) : (
          /* Single view for text-only posts */
          <div className="w-full flex flex-col">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Comments</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center">No comments yet</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="font-semibold text-sm">{comment.user.name}</div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{comment.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleSubmitComment} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Button type="submit" className="rounded-full">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
} 