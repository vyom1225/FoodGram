import { Button } from "@/components/ui/button"
import { ChevronDown, MapPin, X } from "lucide-react"

export function WantToTryTab() {
  return (
    <div className="pt-4">
      {/* Filter Buttons */}
      <div className="flex gap-2 overflow-x-auto pb-4">
        <Button variant="outline" className="rounded-full flex items-center gap-1 min-w-fit">
          <div className="flex flex-col">
            <div className="h-0.5 w-4 bg-gray-500 my-0.5"></div>
            <div className="h-0.5 w-4 bg-gray-500 my-0.5"></div>
            <div className="h-0.5 w-4 bg-gray-500 my-0.5"></div>
          </div>
        </Button>
        <Button variant="outline" className="rounded-full flex items-center gap-1 min-w-fit">
          City <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full min-w-fit">
          Reserve
        </Button>
        <Button variant="outline" className="rounded-full min-w-fit">
          Open now
        </Button>
        <Button variant="outline" className="rounded-full flex items-center gap-1 min-w-fit">
          ⭐ Short list
        </Button>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center py-4">
        <div className="text-gray-500">Open • Closes 1:00 AM</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full h-10 w-10 p-0">
            +
          </Button>
          <Button variant="outline" className="rounded-full h-10 w-10 p-0 bg-teal-800 text-white border-teal-800">
            🔖
          </Button>
        </div>
      </div>

      {/* Restaurant List */}
      <div>
        <h3 className="text-xl font-bold text-teal-800 mb-4">Some places you may want to try</h3>

        {delhiRestaurants.map((restaurant) => (
          <div key={restaurant.name} className="flex items-center justify-between py-4 border-b">
            <div>
              <h4 className="font-bold">{restaurant.name}</h4>
              <p className="text-gray-500">{restaurant.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                +
              </Button>
              <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                🔖
              </Button>
              <X className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* View Map Button */}
      <div className="fixed bottom-20 right-4">
        <Button className="rounded-full bg-teal-800 text-white px-6 py-2 flex items-center gap-2">
          <MapPin className="h-5 w-5" /> View Map
        </Button>
      </div>
    </div>
  )
}

const delhiRestaurants = [
  { name: "Bukhara", location: "New Delhi, India" },
  { name: "Indian Accent", location: "New Delhi, India" },
  { name: "Big Chill Cafe", location: "New Delhi, India" },
  { name: "Olive Bar & Kitchen", location: "New Delhi, India" },
  { name: "Yum Yum Cha Khan Market", location: "New Delhi, India" },
  { name: "Gulati Restaurant, Pandara Road", location: "New Delhi, India" },
  { name: "Khan Chacha", location: "New Delhi, India" },
  { name: "Mamagoto", location: "New Delhi, India" },
]
