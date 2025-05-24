import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark, Plus, X } from "lucide-react"
import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CommentSection } from "./comment-section"

type FeedItemType = 'review' | 'bookmark'

interface FeedItemProps {
  type: FeedItemType
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
    companions?: string[]
    visits?: number
    notes?: string
    favoriteDishes?: string[]
    images?: string[]
    image?: string
    bookmarks?: number
  }
  date: string
}

export function FeedItem({ type, user, restaurant, content, date }: FeedItemProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(content.bookmarks || 0)
  const [showCarousel, setShowCarousel] = useState(false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    setBookmarkCount(prev => isBookmarked ? prev - 1 : prev + 1)
  }

  const images = content.images || (content.image ? [content.image] : [])
  const displayImages = images.slice(0, 4)
  const remainingImages = images.length - 4

  return (
    <>
      <div className="bg-white border-b border-gray-100">
        <div className="py-4">
          <div className="flex gap-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">
                      {user.name} 
                      <span className="font-normal">
                        {type === 'review' ? ' reviewed ' : ' bookmarked '}
                      </span>
                      {restaurant.name}
                    </h3>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">{date}</span>
                  </div>

                  {content.companions && content.companions.length > 0 && (
                    <p className="text-gray-600 mt-1">with {content.companions.join(", ")}</p>
                  )}

                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <span>📍</span>
                      <span>•</span>
                      <span>{restaurant.location}</span>
                    </div>
                    {type === 'review' && content.visits && (
                      <div className="text-gray-500 mt-1">
                        🔄 {content.visits} visit{content.visits > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>

                {type === 'review' && restaurant.rating && (
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl">⭐</span>
                      <span className="font-bold text-xl text-teal-600">{restaurant.rating.toFixed(1)}</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {displayImages.length > 0 && (
            <div className="mt-4 -mx-4">
              {displayImages.length === 1 ? (
                <div className="relative w-full aspect-[16/9]">
                  <img
                    src={displayImages[0]}
                    alt={`${restaurant.name} - Image 1`}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setShowCarousel(true)}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-1">
                  {displayImages.map((image, index) => (
                    <div 
                      key={index} 
                      className={`relative aspect-square ${index === 3 ? 'cursor-pointer' : ''}`}
                      onClick={() => index === 3 && setShowCarousel(true)}
                    >
                      <img
                        src={image}
                        alt={`${restaurant.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === 3 && remainingImages > 0 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-2xl font-bold">
                            +{remainingImages}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Image Carousel Modal */}
          {showCarousel && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
              <div className="relative w-full max-w-4xl mx-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-12 right-0 text-white hover:bg-white/10"
                  onClick={() => setShowCarousel(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <Carousel className="w-full">
                  <CarouselContent>
                    {images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-[16/9]">
                          <img
                            src={image}
                            alt={`${restaurant.name} - Image ${index + 1}`}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </div>
            </div>
          )}

          {content.notes && (
            <div className="mt-4 px-4">
              <h5 className="font-semibold text-gray-900 mb-1">Notes:</h5>
              <p className="text-gray-700 leading-relaxed">{content.notes}</p>
            </div>
          )}

          {content.favoriteDishes && content.favoriteDishes.length > 0 && (
            <div className="mt-3 px-4">
              <h5 className="font-semibold text-gray-900 mb-1">Favorite Dishes:</h5>
              <p className="text-gray-700">{content.favoriteDishes.join(", ")}</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 px-4">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 h-auto hover:bg-gray-100"
                onClick={handleLike}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="p-2 h-auto hover:bg-gray-100"
                onClick={() => setShowComments(true)}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {bookmarkCount > 0 && (
                <span className="text-sm text-gray-500">
                  {bookmarkCount} bookmark{bookmarkCount > 1 ? "s" : ""}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                className={`p-2 h-auto hover:bg-gray-100 ${isBookmarked ? 'text-teal-500' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-teal-500' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={{
          user,
          restaurant,
          content
        }}
      />
    </>
  )
}
