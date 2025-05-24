import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, X } from "lucide-react"

interface SearchScreenProps {
  setActiveTab: (tab: string) => void
}

export function SearchScreen({ setActiveTab }: SearchScreenProps) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-teal-800">beli</h1>
        <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="restaurants" className="w-full">
        <TabsList className="grid grid-cols-2 w-full px-4">
          <TabsTrigger
            value="restaurants"
            className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:text-teal-800 rounded-none"
          >
            <span className="text-lg">🏪</span> Restaurants
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:text-teal-800 rounded-none"
          >
            <span className="text-lg">👥</span> Members
          </TabsTrigger>
        </TabsList>

        <div className="px-4 pt-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <div className="h-5 w-5 text-gray-400">🔍</div>
            </div>
            <input
              type="text"
              placeholder="Search restaurant, cuisine, occasion"
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-gray-600 placeholder-gray-400"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <MapPin className="h-5 w-5 text-gray-500" />
            </div>
            <div className="flex justify-between items-center w-full pl-10 pr-4 py-3 border rounded-lg">
              <span className="text-gray-800">Current Location</span>
              <X className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <Button className="rounded-full bg-teal-800 text-white">📈 Trending</Button>
            <Button variant="outline" className="rounded-full border-teal-800 text-teal-800">
              👥 Friend recs
            </Button>
          </div>

          {/* Results */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Places you may have been in Delhi</h3>

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
        </div>
      </Tabs>
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
]
