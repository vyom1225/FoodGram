import { Button } from "@/components/ui/button"
import { ChevronDown, MapPin, Plus, Search } from "lucide-react"

export function FriendRecsTab() {
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
          Cuisine <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full h-10 w-10 p-0 min-w-fit">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Distance Sorting */}
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-2 text-teal-700">
          <div className="flex flex-col">
            <div className="h-0 w-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-teal-700"></div>
            <div className="h-0 w-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-teal-700 mt-1"></div>
          </div>
          <span className="font-medium">Distance</span>
        </div>
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      {/* Restaurant List */}
      <div className="space-y-6">
        {friendRecsRestaurants.map((restaurant) => (
          <div key={restaurant.name} className="space-y-2">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>{restaurant.priceRange}</span>
                  <span>|</span>
                  <span>{restaurant.cuisine}</span>
                </div>
                <p className="text-gray-600">{restaurant.location}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-2 border-teal-500 flex items-center justify-center text-teal-500 font-bold">
                  {restaurant.rating}
                </div>
                <div className="h-6 w-6 rounded-full bg-teal-700 text-white text-xs flex items-center justify-center mt-1">
                  {restaurant.friendCount}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-gray-500 text-sm">{restaurant.status}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                  <Plus className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                  🔖
                </Button>
              </div>
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

const friendRecsRestaurants = [
  {
    name: "Emily: West Village",
    priceRange: "$$$",
    cuisine: "American, Burgers, Pizza",
    location: "South Village, Manhattan",
    rating: "8.8",
    friendCount: 5,
    status: "Open • Closes 12:00 AM",
  },
  {
    name: "Ci Siamo",
    priceRange: "$$$",
    cuisine: "Italian",
    location: "Chelsea, Manhattan",
    rating: "9.3",
    friendCount: 5,
    status: "",
  },
  {
    name: "Vyom",
    priceRange: "$$",
    cuisine: "Burgers",
    location: "Delhi",
    rating: "8.8",
    friendCount: 5,
    status: "",
  },
  {
    name: "Vyom",
    priceRange: "500-600",
    cuisine: "Indian, Indo",
    location: "Vasant Kunj , Delhi",
    rating: "9.4",
    friendCount: 5,
    status: "Closed • Opens 5:00 PM",
  },
]
