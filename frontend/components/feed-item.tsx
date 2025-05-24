import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark, Plus } from "lucide-react"
import { useState } from "react"

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
    <div className="bg-white border-b border-gray-100">
      <div className="py-4">
        <div className="text-xs text-gray-400 mb-3 font-medium">{date}</div>
        
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {user.name} 
                  <span className="font-normal">
                    {type === 'review' ? ' reviewed ' : ' bookmarked '}
                  </span>
                  {restaurant.name}
                </h3>

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

            {images.length > 0 && (
              <div className="mt-4">
                <div className="grid grid-cols-2 gap-1 max-w-[300px]">
                  {displayImages.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`${restaurant.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {index === 3 && remainingImages > 0 && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                          <div className="text-white text-xl font-bold">
                            +{remainingImages}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.notes && (
              <div className="mt-4">
                <h5 className="font-semibold text-gray-900 mb-1">Notes:</h5>
                <p className="text-gray-700 leading-relaxed">{content.notes}</p>
              </div>
            )}

            {content.favoriteDishes && content.favoriteDishes.length > 0 && (
              <div className="mt-3">
                <h5 className="font-semibold text-gray-900 mb-1">Favorite Dishes:</h5>
                <p className="text-gray-700">{content.favoriteDishes.join(", ")}</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-2 h-auto hover:bg-gray-100"
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 h-auto hover:bg-gray-100">
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
      </div>
    </div>
  )
}
