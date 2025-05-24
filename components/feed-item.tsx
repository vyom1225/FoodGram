import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface FeedItemProps {
  user: {
    name: string
    avatar: string
  }
  restaurant: {
    name: string
    location: string
    rating: number
  }
  content: {
    companions?: string[]
    visits: number
    notes?: string
    favoriteDishes?: string[]
    image?: string
    bookmarks?: number
  }
  date: string
}

export function FeedItem({ user, restaurant, content, date }: FeedItemProps) {
  return (
    <div className="border-b pb-4">
      {/* Date Header */}
      <div className="text-gray-500 py-2">{date}</div>

      <div className="flex gap-3">
        {/* User Avatar */}
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1">
          {/* Header with Rating */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl">
                {user.name} <span className="font-normal">ranked</span>
              </h3>
              <h4 className="font-bold text-xl">{restaurant.name}</h4>

              {content.companions && content.companions.length > 0 && (
                <p className="text-gray-700">with {content.companions.join(", ")}</p>
              )}

              <div className="flex items-center gap-1 text-gray-500 mt-1">
                <span>🍦</span>
                <span>•</span>
                <span>{restaurant.location}</span>
              </div>

              <div className="text-gray-500 mt-1">
                🔄 {content.visits} visit{content.visits > 1 ? "s" : ""}
              </div>
            </div>

            <div className="h-14 w-14 rounded-full border-2 border-teal-500 flex items-center justify-center text-teal-500 font-bold text-lg">
              {restaurant.rating.toFixed(1)}
            </div>
          </div>

          {/* Image */}
          {content.image && (
            <div className="mt-3 rounded-lg overflow-hidden relative">
              <img
                src={content.image || "/placeholder.svg"}
                alt={restaurant.name}
                className="w-full h-64 object-cover"
              />
              <button className="absolute bottom-3 left-3 bg-white bg-opacity-80 p-2 rounded-full">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Notes */}
          {content.notes && (
            <div className="mt-4">
              <h5 className="font-bold text-lg">Notes:</h5>
              <p className="text-gray-800">{content.notes}</p>
            </div>
          )}

          {/* Favorite Dishes */}
          {content.favoriteDishes && content.favoriteDishes.length > 0 && (
            <div className="mt-2">
              <h5 className="font-bold text-lg">Favorite Dishes:</h5>
              <p className="text-gray-800">{content.favoriteDishes.join(", ")}</p>
            </div>
          )}

          {/* Bookmarks */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-4">
              <button>
                <Heart className="h-6 w-6" />
              </button>
              <button>
                <MessageCircle className="h-6 w-6" />
              </button>
              <button>
                <Share2 className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              {content.bookmarks && content.bookmarks > 0 && (
                <span className="text-gray-500">
                  {content.bookmarks} bookmark{content.bookmarks > 1 ? "s" : ""}
                </span>
              )}
              <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                +
              </Button>
              <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                🔖
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
