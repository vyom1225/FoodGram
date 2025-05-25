"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  ChevronDown,
  ChevronRight,
  Share,
  Trophy,
  X,
  Heart,
  MessageCircle,
  Plus,
  Bookmark,
  Search,
  Share2,
  Pause,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
//import { HeaderNavigation } from "@/components/Header-navigation"
//import { FeedItem } from "@/components/feed-item"
//import { Stories } from "@/components/stories"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// Mock auth store for demo purposes
const useAuthStore = (selector: any) => {
  const mockStore = {
    user: { username: "demo_user" },
    logout: () => console.log("Logout clicked"),
  }
  return selector(mockStore)
}
import { motion, AnimatePresence } from "framer-motion"
import { Star, MapPin, Users, Calendar } from "lucide-react"
const tabs = ["feed", "leaderboard", "lists", "search", "profile"]
const HeaderNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-gradient-to-r from-white to-gray-50 shadow-md py-3 px-6 border-b border-gray-200">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/*Fued*/}
        <div className="text-2xl font-extrabold text-blue-600 tracking-tight select-none">
          <span className="text-gray-800"> </span> Fu
          <span className="text-pink-500">ed</span>
        </div>
        {/*Right NavigationTabs */}
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-2 py-1 cursor-pointer text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-300"
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-blue-500 rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6">Search</h1>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search restaurants, users, or dishes..."
            className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {["Pizza", "Sushi", "Burgers", "Italian", "Mexican", "Thai"].map((term) => (
                <Badge key={term} variant="secondary" className="px-4 py-2 cursor-pointer hover:bg-gray-200">
                  {term}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
            <div className="space-y-3">
              {["The Big Chill Cafe", "Haldiram", "Belgian Waffle"].map((search) => (
                <div key={search} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WantToTryTab() {
  const wantToTryRestaurants = [
    { name: "Sushi Master", location: "Downtown, Delhi", addedBy: "Julie" },
    { name: "Pasta Paradise", location: "South Delhi", addedBy: "Pushkar" },
    { name: "Burger Bliss", location: "Greater Noida", addedBy: "Aditya" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Want to Try</h3>
        <Button variant="outline" className="rounded-full">
          Add Restaurant <Plus className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <div className="space-y-4">
        {wantToTryRestaurants.map((restaurant) => (
          <Card key={restaurant.name}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{restaurant.name}</h4>
                  <p className="text-gray-500">{restaurant.location}</p>
                  <p className="text-sm text-gray-400 mt-1">Added by {restaurant.addedBy}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("feed")
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-grow transition-all duration-500">
        {activeTab === "feed" && <FeedScreen setActiveTab={setActiveTab} />}
        {activeTab === "leaderboard" && <LeaderboardScreen setActiveTab={setActiveTab} />}
        {activeTab === "lists" && <ListsScreen setActiveTab={setActiveTab} />}
        {activeTab === "profile" && <ProfileScreen setActiveTab={setActiveTab} />}
        {activeTab === "search" && <SearchScreen setActiveTab={setActiveTab} />}
      </div>
    </div>
  )
}

function LeaderboardScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-4xl font-bold px-4 py-6">Leaderboard</h1>

      <Tabs defaultValue="influence" className="w-full">
        <TabsList className="grid grid-cols-4 rounded-none border-b">
          <TabsTrigger
            value="been"
            className="rounded-t-lg data-[state=active]:border-b-2 data-[state=active]:border-teal-700"
          >
            Been
          </TabsTrigger>
          <TabsTrigger value="influence" className="data-[state=active]:border-b-2 data-[state=active]:border-teal-700">
            Influence
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-teal-700">
            Notes
          </TabsTrigger>
          <TabsTrigger value="photos" className="data-[state=active]:border-b-2 data-[state=active]:border-teal-700">
            Photos
          </TabsTrigger>
        </TabsList>
        <TabsContent value="been" className="px-4 pt-4">
          <p className="text-gray-500 mb-4">Number of places on your been list</p>
          <div className="flex gap-2 mb-6">
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-teal-800">
              All Members <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-teal-800">
              Delhi
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {leaderboardData.map((user, index) => (
              <div key={user.username} className="flex items-center">
                <div className="w-8 text-gray-500 font-medium">{index + 1}</div>
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.username.charAt(1)}</AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1">{user.username}</div>
                <div className="font-bold text-xl">{user.score}</div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="influence" className="px-4 pt-4">
          <p className="text-gray-500 mb-4">
            Number of FoodGram members who are here because of you (i.e., joined from your invite)
          </p>

          <div className="flex gap-2 mb-6">
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-teal-800">
              All Members <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-teal-800">
              Delhi <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {influenceLeaderboardData.map((user, index) => (
              <div key={user.username} className="flex items-center">
                <div className="w-8 text-gray-500 font-medium">{index + 1}</div>
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100">
                    {user.initials || user.username.charAt(1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1">{user.username}</div>
                <div className="font-bold text-xl">{user.inviteCount}</div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos" className="px-4 pt-4">
          <p className="text-gray-500 mb-4">Number of restaurants photographed</p>

          <div className="flex gap-2 mb-6">
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-teal-800">
              All Members <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-teal-800">
              Delhi <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {photosLeaderboardData.map((user, index) => (
              <div key={user.username} className="flex items-center">
                <div className="w-8 text-gray-500 font-medium">{index + 1}</div>
                <Avatar className="h-12 w-12 border">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gray-100">{user.username.charAt(1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1">{user.username}</div>
                <div className="font-bold text-xl">{user.photoCount}</div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ListsScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="px-4 pt-4">
        <Tabs defaultValue="been" className="w-full">
          <TabsList className="grid grid-cols-4 rounded-none border-b text-xs">
            <TabsTrigger
              value="been"
              className="text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:font-bold data-[state=active]:text-black"
            >
              Been
            </TabsTrigger>
            <TabsTrigger
              value="want"
              className="text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:font-bold data-[state=active]:text-black"
            >
              Want to Try
            </TabsTrigger>
            <TabsTrigger
              value="recommended"
              className="text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:font-bold data-[state=active]:text-black"
            >
              Recommended
            </TabsTrigger>
            <TabsTrigger
              value="group-lists"
              className="text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:font-bold data-[state=active]:text-black"
            >
              Group Lists
            </TabsTrigger>
          </TabsList>

          <TabsContent value="been" className="pt-4">
            {restaurants.map((restaurant) => (
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
                    <Bookmark className="h-5 w-5" />
                  </Button>
                  <X className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="want">
            <WantToTryTab />
          </TabsContent>

          <TabsContent value="recommended">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Recommended for You</h3>
                <Button variant="outline" className="rounded-full">
                  Filter <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="grid gap-4">
                {recommendedRestaurants.map((restaurant) => (
                  <Card key={restaurant.name}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{restaurant.name}</h4>
                          <p className="text-gray-500">{restaurant.location}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-teal-600 font-semibold">⭐ {restaurant.rating}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{restaurant.recommendedBy} recommended</span>
                          </div>
                        </div>
                        <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                          <Bookmark className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="group-lists">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Group Lists</h3>
                <Button variant="outline" className="rounded-full">
                  Create List <Plus className="h-4 w-4 ml-2" />
                </Button>
              </div>

              <div className="grid gap-4">
                {groupLists.map((list) => (
                  <Card key={list.title}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-lg">{list.title}</h4>
                            <Badge variant="secondary">{list.restaurants.length} places</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{list.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {list.members.map((member, index) => (
                                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{list.members.length} members</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="rounded-full h-10 w-10 p-0">
                            <Bookmark className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ProfileScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint to clear the JWT cookie
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
        method: "POST",
        credentials: "include", // Important: This ensures cookies are sent with the request
      })

      // Clear the user state from Zustand store
      logout()

      // Redirect to login page
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      // Even if the backend call fails, we'll still clear the local state and redirect
      logout()
      router.push("/login")
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-6"></div>
        <h1 className="text-xl font-bold">{user?.username}</h1>
        <div className="flex gap-2">
          <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
            <LogOut className="h-6 w-6" />
          </button>
          <div className="text-3xl px-2">≡</div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6 px-4">
        <Avatar className="h-32 w-32 bg-gray-100">
          <AvatarFallback className="text-5xl text-gray-400">AG</AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-bold mt-4">{user?.username}</h2>
        <p className="text-gray-500">Member since May 2025</p>

        <div className="grid grid-cols-2 gap-4 w-full mt-4">
          <Button variant="outline" className="rounded-md">
            Edit profile
          </Button>
          <Button variant="outline" className="rounded-md">
            Share profile
          </Button>
        </div>

        <div className="flex justify-between w-full mt-6">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">0</span>
            <span className="text-gray-500">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">2</span>
            <span className="text-gray-500">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">-</span>
            <span className="text-gray-500">Rank on FoodGram</span>
          </div>
        </div>

        <div className="w-full mt-6 space-y-4">
          <div className="flex items-center justify-between py-4 border-y">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">✓</div>
              <span className="text-lg font-bold">Been</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold mr-2">0</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 mr-3">🔖</div>
              <span className="text-lg font-bold">Want to Try</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-bold mr-2">2</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center">
              <div className="h-8 w-8 mr-3">❤️</div>
              <span className="text-lg font-bold">Recs for You</span>
            </div>
            <div className="flex items-center">
              <span className="text-xl mr-2">🔒</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-teal-700 mr-2" />
              <span className="text-lg text-gray-500">Rank on FoodGram</span>
            </div>
            <div className="text-xl font-bold mt-2">-</div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-teal-700 mr-2">🔥</div>
              <span className="text-lg text-gray-500">Current Streak</span>
            </div>
            <div className="text-xl font-bold mt-2 text-teal-700">0 weeks</div>
          </div>
        </div>

        <div className="border rounded-lg p-4 w-full mt-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-bold">Set your 2025 goal</h3>
              <p className="text-gray-700">How many restaurants do you want to try in 2025?</p>
            </div>
            <div className="h-16 w-16">🏆</div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            <Button variant="outline" className="rounded-full">
              20
            </Button>
            <Button variant="outline" className="rounded-full">
              50
            </Button>
            <Button variant="outline" className="rounded-full">
              100
            </Button>
            <Button variant="outline" className="rounded-full">
              Customize
            </Button>
            <div />
          </div>
        </div>
      </div>
    </div>
  )
}

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

interface FeedItemProps {
  type: "review" | "bookmark"
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
    visits?: number
    notes?: string
    images?: string[]
    image?: string
    video?: string
    thumbnail?: string
    bookmarks: number
    companions?: string[]
    favoriteDishes?: string[]
  }
  date: string
}

function FeedItem({ type, user, restaurant, content, date }: FeedItemProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -2 }}
    >
      <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 ring-2 ring-gradient-to-r from-purple-400 to-pink-400">
                  <AvatarImage src={user.avatar || "/chow.png"} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{restaurant.location}</span>
                    <span>•</span>
                    <Calendar className="w-3 h-3" />
                    <span>{date}</span>
                  </div>
                </div>
              </div>
              {type === "review" && (
                <Badge className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white border-0">Review</Badge>
              )}
              {type === "bookmark" && (
                <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0">Bookmark</Badge>
              )}
            </div>
          </div>

          {/* Restaurant Info */}
          <div className="px-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{restaurant.name}</h2>
                {restaurant.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-700">{restaurant.rating}</span>
                  </div>
                )}
              </div>
              {content.visits && (
                <div className="text-right">
                  <div className="text-sm text-gray-500">Visits</div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {content.visits}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {content.notes && (
            <div className="px-6 pb-4">
              <p className="text-gray-700 leading-relaxed">{content.notes}</p>
            </div>
          )}
          {content.companions && (
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">With</span>
                <div className="flex gap-1">
                  {content.companions.map((companion, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {companion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          {content.favoriteDishes && (
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2">
                {content.favoriteDishes.map((dish, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-emerald-100 to-cyan-100 text-emerald-700 border-emerald-200"
                  >
                    🍽️ {dish}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {content.images && content.images.length > 0 && (
            <div className="px-6 pb-4">
              <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                {content.images.slice(0, 4).map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`relative ${content.images!.length === 1 ? "col-span-2" : ""} ${
                      content.images!.length === 3 && index === 0 ? "col-span-2" : ""
                    }`}
                  >
                    <img
                      src={image || "/imageba.png"}
                      alt={`Food ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {content.images!.length > 4 && index === 3 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <span className="text-white text-xl font-bold">+{content.images!.length - 4}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Single Image */}
          {content.image && (
            <div className="px-6 pb-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <img src={content.image || "/imageba.png"} alt="Food" className="w-full h-64 object-cover rounded-xl" />
              </motion.div>
            </div>
          )}

          {/* Video */}
          {content.video && (
            <div className="px-6 pb-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="w-full h-64 object-cover"
                    controls
                    poster={content.thumbnail || "/video-thumbnail.png?height=300&width=400"}
                    preload="metadata"
                  >
                    <source src={content.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            </div>
          )}

          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  <span className="text-sm font-medium">Like</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Comment</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors"
                >
                  <Share className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className="flex items-center gap-2 text-gray-600 hover:text-amber-500 transition-colors"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-amber-500 text-amber-500" : ""}`} />
                <span className="text-sm font-medium">{content.bookmarks}</span>
              </motion.button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function StoryViewer({
  story,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: {
  story: Story | null
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}) {
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isOpen || !story || isPaused) return

    const duration = 15000 // 15 seconds
    const interval = 50 // Update every 50ms
    const increment = (interval / duration) * 100

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onNext()
          return 0
        }
        return prev + increment
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isOpen, story, isPaused, onNext])

  useEffect(() => {
    if (isOpen) {
      setProgress(0)
    }
  }, [isOpen, story])

  if (!isOpen || !story) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress Bar */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="w-full h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-white">
                <AvatarImage src={story.user.avatar || "/panner.png"} alt={story.user.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                  {story.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white">{story.user.name}</h3>
                <p className="text-white text-opacity-80 text-sm">{story.timestamp} ago</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="w-8 h-8 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          <motion.div
            className="relative aspect-[9/16] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl overflow-hidden"
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <img
              src={story.image || "/placeholder.svg"}
              alt={`${story.user.name}'s story`}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

            {/* Navigation Areas */}
            <button
              className="absolute left-0 top-0 w-1/3 h-full z-10"
              onClick={(e) => {
                e.stopPropagation()
                onPrevious()
              }}
            />
            <button
              className="absolute right-0 top-0 w-1/3 h-full z-10"
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
            />

            {/* Pause Indicator */}
            <AnimatePresence>
              {isPaused && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <Pause className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Content */}
            <div className="absolute bottom-6 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">{story.likes}</span>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Share className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Stories({ stories, onStoryClick }: { stories: Story[]; onStoryClick: (story: Story) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex gap-4 overflow-x-auto pb-4 mb-8"
    >
      {stories.map((story, index) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="flex-shrink-0 cursor-pointer"
          onClick={() => onStoryClick(story)}
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white p-0.5">
                <img
                  src={story.image || "/chow.png"}
                  alt={story.user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full p-1">
              <Heart className="w-3 h-3 text-white fill-white" />
            </div>
          </div>
          <p className="text-center text-sm font-medium mt-2 text-gray-700">{story.user.name}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
function FeedScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [activeFeed, setActiveFeed] = useState("friends")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showMoodOptions, setShowMoodOptions] = useState(false)
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false)
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)

  const stories = [
    {
      id: "1",
      user: {
        name: "Julie",
        avatar: "/imagewo.png?height=48&width=48",
      },
      image: "/chow.png?height=400&width=400",
      timestamp: "2h",
      likes: 12,
    },
    {
      id: "2",
      user: {
        name: "Pushkar",
        avatar: "/pushkar.png?height=48&width=48",
      },
      image: "/imageba.png?height=400&width=400",
      timestamp: "4h",
      likes: 8,
    },
    {
      id: "3",
      user: {
        name: "Aditya",
        avatar: "/Aditya.png?height=48&width=48",
      },
      image: "/panner.png?height=400&width=400",
      timestamp: "5h",
      likes: 15,
    },
    {
      id: "4",
      user: {
        name: "Vyom",
        avatar: "/imageVy.png?height=48&width=48",
      },
      image: "/imagedo.png?height=400&width=400",
      timestamp: "6h",
      likes: 20,
    },
  ]

  const moodOptions = [
    { id: "fun", label: "😄 Fun", icon: "🎉", gradient: "from-yellow-400 to-orange-500" },
    { id: "love", label: "❤️ Love", icon: "💝", gradient: "from-pink-400 to-red-500" },
    { id: "adventurous", label: "🌍 Adventurous", icon: "🏃", gradient: "from-green-400 to-blue-500" },
    { id: "relaxed", label: "😌 Relaxed", icon: "☕", gradient: "from-purple-400 to-indigo-500" },
    { id: "foodie", label: "🍽️ Foodie", icon: "🍜", gradient: "from-emerald-400 to-cyan-500" },
  ]

  const getSelectedMoodLabel = () => {
    if (!selectedMood) return "🎭 Moodles"
    const mood = moodOptions.find((m) => m.id === selectedMood)
    return mood ? mood.label : "🎭 Moodles"
  }

  const getFeedContent = () => {
    if (activeFeed === "moodles" && selectedMood) {
      switch (selectedMood) {
        case "fun":
          return (
            <FeedItem
              type="review"
              user={{
                name: "Julie",
                avatar: "/imagewo.png?height=48&width=48",
              }}
              restaurant={{
                name: "Massara",
                location: "Delhi",
                rating: 4.8,
              }}
              content={{
                visits: 2,
                notes: "Had an amazing time with friends! The atmosphere was so lively and fun! 🎉",
                images: ["/chow.png?height=400&width=400", "/imagepa.png?height=400&width=400"],
                bookmarks: 23,
              }}
              date="April 7"
            />
          )
        case "love":
          return (
            <FeedItem
              type="review"
              user={{
                name: "Adi Restra",
                avatar: "/imagewo.png?height=48&width=48",
              }}
              restaurant={{
                name: "Amantran",
                location: "Delhi",
                rating: 4.5,
              }}
              content={{
                companions: ["Aditya", "Vyom"],
                visits: 3,
                notes:
                  "Perfect place for a romantic dinner! The candlelight and soft music created such a magical atmosphere 💕",
                favoriteDishes: ["Panner", "Naan"],
                image: "/panner.png?height=400&width=400",
                bookmarks: 15,
              }}
              date="April 8"
            />
          )
        case "adventurous":
          return (
            <FeedItem
              type="review"
              user={{
                name: "Pushkar",
                avatar: "/pushkar.png?height=48&width=48",
              }}
              restaurant={{
                name: "Haldiram",
                location: "Delhi",
                rating: 4.2,
              }}
              content={{
                companions: ["Aditya"],
                visits: 1,
                notes:
                  "Tried some unique street food combinations today! The fusion dishes were surprisingly amazing! 🌟",
                bookmarks: 8,
              }}
              date="April 6"
            />
          )
        case "relaxed":
          return (
            <FeedItem
              type="review"
              user={{
                name: "fooDelhi",
                avatar: "/imagepa.svg?height=48&width=48",
              }}
              restaurant={{
                name: "The Big Chill Cafe",
                location: "Kailash Colony Market",
                rating: 4.7,
              }}
              content={{
                visits: 5,
                notes:
                  "Perfect spot for a relaxed afternoon! The cozy ambiance and great coffee made it a perfect escape from the city hustle.",
                favoriteDishes: ["Ravioli Al Funghi", "Eggless Pasta"],
                video: "video1.mp4",
                thumbnail: "/th.png?height=300&width=400",
                bookmarks: 42,
              }}
              date="April 9"
            />
          )
        case "foodie":
          return (
            <FeedItem
              type="review"
              user={{
                name: "Vyom",
                avatar: "/imageVy.png?height=48&width=48",
              }}
              restaurant={{
                name: "Belgian Waffle",
                location: "Greater Noida",
              }}
              content={{
                notes:
                  "Foodie heaven! The variety of dishes and the attention to detail in presentation is just mind-blowing! 🍽️",
                bookmarks: 28,
              }}
              date="April 6"
            />
          )
        default:
          return null
      }
    }

    return (
      <div className="space-y-8">
        <FeedItem
          type="review"
          user={{
            name: "fooDelhi",
            avatar: "/imagepa.png?height=48&width=48",
          }}
          restaurant={{
            name: "The Big Chill Cafe",
            location: "Kailash Colony Market",
            rating: 4.7,
          }}
          content={{
            visits: 5,
            notes:
              "Big Chill is one of my favorites! 😍 The eggless (do ask for it specifically) Ravioli Al Funghi, where the ravioli is stuffed with mushrooms and cream cheese and tossed in a garlicky, cheesy parmesan cream cheese sauce.",
            favoriteDishes: ["Ravioli Al Funghi", "Eggless Pasta"],
            video: "video1.mp4",
            thumbnail: "/th.png?height=300&width=400",
            bookmarks: 42,
          }}
          date="April 9"
        />

        <FeedItem
          type="review"
          user={{
            name: "Pushkar",
            avatar: "/pushkar.png?height=48&width=48",
          }}
          restaurant={{
            name: "Amantran",
            location: "Delhi",
            rating: 4.5,
          }}
          content={{
            companions: ["Aditya", "Vyom"],
            visits: 3,
            notes: "Great food and ambiance!",
            favoriteDishes: ["Dosa"],
            image: "/imagedo.png?height=400&width=400",
            bookmarks: 15,
          }}
          date="April 8"
        />

        <FeedItem
          type="review"
          user={{
            name: "Julie",
            avatar: "/imagewo.png?height=48&width=48",
          }}
          restaurant={{
            name: "Massara",
            location: "Delhi",
            rating: 4.8,
          }}
          content={{
            visits: 2,
            notes: "Amazing experience!",
            images: [
              "/imagepa.png?height=400&width=400",
              "/imagedo.png?height=400&width=400",
              "/panner.png?height=400&width=400",
              "/chow.png?height=400&width=400",
            ],
            bookmarks: 23,
          }}
          date="April 7"
        />

        <FeedItem
          type="review"
          user={{
            name: "Aditya",
            avatar: "/aditya.png?height=48&width=48",
          }}
          restaurant={{
            name: "Haldiram",
            location: "Delhi",
            rating: 4.2,
          }}
          content={{
            companions: ["Aditya"],
            visits: 1,
            notes: "Good food!",
            bookmarks: 8,
          }}
          date="April 6"
        />

        <FeedItem
          type="bookmark"
          user={{
            name: "Pushkar",
            avatar: "/pushkar.png?height=48&width=48",
          }}
          restaurant={{
            name: "Belgian Waffle is the best Place to eat Waffles",
            location: "Delhi",
          }}
          content={{
            bookmarks: 11,
          }}
          date="April 7"
        />

        <FeedItem
          type="bookmark"
          user={{
            name: "Vyom",
            avatar: "/imageVy.png?height=48&width=48",
          }}
          restaurant={{
            name: "Nic IceCreams is the best Icecreams",
            location: "Greater Noida",
          }}
          content={{
            bookmarks: 28,
          }}
          date="April 6"
        />
      </div>
    )
  }

  const handleStoryClick = (story: Story) => {
    const index = stories.findIndex((s) => s.id === story.id)
    setCurrentStoryIndex(index)
    setCurrentStory(story)
    setIsStoryViewerOpen(true)
  }

  const handleNextStory = () => {
    const nextIndex = (currentStoryIndex + 1) % stories.length
    setCurrentStoryIndex(nextIndex)
    setCurrentStory(stories[nextIndex])
  }

  const handlePreviousStory = () => {
    const prevIndex = currentStoryIndex === 0 ? stories.length - 1 : currentStoryIndex - 1
    setCurrentStoryIndex(prevIndex)
    setCurrentStory(stories[prevIndex])
  }

  const handleCloseStory = () => {
    setIsStoryViewerOpen(false)
    setCurrentStory(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex-1 flex flex-col">
        <div className="max-w-3xl mx-auto w-full px-4">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 my-6 relative"
          >
            <div className="absolute left-4 top-[18px] z-10">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search a restaurant, member, etc."
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm rounded-2xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-lg shadow-lg border border-white/20"
            />
          </motion.div>

          {/* Stories */}
          {activeFeed === "friends" && <Stories stories={stories} onStoryClick={handleStoryClick} />}

          {/* Feed Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-3 mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-3 text-lg font-medium transition-all duration-300 ${
                activeFeed === "friends"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/20 shadow-md"
              }`}
              onClick={() => {
                setActiveFeed("friends")
                setSelectedMood(null)
                setShowMoodOptions(false)
              }}
            >
              👥 Friends
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-full px-6 py-3 text-lg font-medium transition-all duration-300 ${
                activeFeed === "trending"
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/20 shadow-md"
              }`}
              onClick={() => {
                setActiveFeed("trending")
                setSelectedMood(null)
                setShowMoodOptions(false)
              }}
            >
              📈 Trending
            </motion.button>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-6 py-3 text-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFeed === "moodles"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-white/20 shadow-md"
                }`}
                onClick={() => {
                  setActiveFeed("moodles")
                  setShowMoodOptions(!showMoodOptions)
                }}
              >
                {getSelectedMoodLabel()}
                <motion.div animate={{ rotate: showMoodOptions ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {showMoodOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 py-2 z-10"
                  >
                    {moodOptions.map((mood, index) => (
                      <motion.button
                        key={mood.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 flex items-center gap-3 transition-all duration-200"
                        onClick={() => {
                          setSelectedMood(mood.id)
                          setShowMoodOptions(false)
                        }}
                      >
                        <span className="text-xl">{mood.icon}</span>
                        <span className="font-medium">{mood.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Feed Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8 pb-8"
          >
            {getFeedContent()}
          </motion.div>
        </div>
      </div>

      {/* Story Viewer */}
      <StoryViewer
        story={currentStory}
        isOpen={isStoryViewerOpen}
        onClose={handleCloseStory}
        onNext={handleNextStory}
        onPrevious={handlePreviousStory}
      />
    </div>
  )
}

const leaderboardData = [
  { username: "@sola", score: 3102, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@sue", score: 2731, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@angelalynnhuang", score: 2612, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@pogieeats", score: 2340, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@feedthefilipino", score: 2307, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@poopsicle", score: 2293, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@internetxplorer", score: 2266, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@eddieyou", score: 2212, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@melissalinder", score: 1993, avatar: "/placeholder.svg?height=40&width=40" },
]

const restaurants = [
  { name: "TACOS", location: "HY TOWER,Greater Noida, NY" },
  { name: "Pizza", location: "South,Delhi, NY" },
  { name: "Haldiram", location: "North Delhi" },
  { name: "Mcdonalds", location: "Delhi" },
  { name: "Lapinoz", location: "Noida" },
]
const photosLeaderboardData = [
  { username: "@thespicedtoast", photoCount: 5, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@zainhashmi", photoCount: 5, avatar: "" },
  { username: "@ceceatstheworld", photoCount: 4, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@sammathers880", photoCount: 4, avatar: "" },
  { username: "@annadanowitz", photoCount: 3, avatar: "" },
  { username: "@shubhradash", photoCount: 3, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@achaudhary", photoCount: 3, avatar: "" },
  { username: "@kavyoli", photoCount: 2, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@anoooshka", photoCount: 2, avatar: "/placeholder.svg?height=40&width=40" },
]
const influenceLeaderboardData = [
  { username: "@sanchiitaaa", inviteCount: 16, avatar: "" },
  { username: "@ratatouillee", inviteCount: 8, avatar: "" },
  { username: "@manviekochhar", inviteCount: 6, avatar: "" },
  { username: "@anshiq", inviteCount: 6, avatar: "" },
  { username: "@aahanaahuja", inviteCount: 5, avatar: "" },
  { username: "@shireenmoti", inviteCount: 4, avatar: "/placeholder.svg?height=40&width=40" },
  { username: "@medha09", inviteCount: 4, avatar: "" },
  { username: "@samyukthasaravanan", inviteCount: 4, avatar: "", initials: "SS" },
  { username: "@ishikakataria", inviteCount: 4, avatar: "" },
]

const recommendedRestaurants = [
  {
    name: "Sushi Master",
    location: "Downtown, Delhi",
    rating: 4.8,
    recommendedBy: "5 friends",
  },
  {
    name: "Pasta Paradise",
    location: "South Delhi",
    rating: 4.6,
    recommendedBy: "3 friends",
  },
  {
    name: "Burger Bliss",
    location: "Greater Noida",
    rating: 4.5,
    recommendedBy: "7 friends",
  },
]

const groupLists = [
  {
    title: "Weekend Brunch Spots",
    description: "Our favorite places for Sunday brunch with friends",
    restaurants: ["Cafe Delight", "Morning Glory", "Sunny Side Up"],
    members: [
      { name: "Aditya", avatar: "/Aditya.png" },
      { name: "Vyom", avatar: "/imageVy.png" },
      { name: "Julie", avatar: "/imageJu.png" },
    ],
  },
  {
    title: "Date Night Places",
    description: "Romantic restaurants for special occasions",
    restaurants: ["Candle Light", "Moonlight", "Stars"],
    members: [
      { name: "Pushkar", avatar: "/imagePu.png" },
      { name: "Aditya", avatar: "/Aditya.png" },
    ],
  },
  {
    title: "Quick Lunch Options",
    description: "Fast and delicious lunch spots near office",
    restaurants: ["Quick Bite", "Lunch Box", "Express"],
    members: [
      { name: "Vyom", avatar: "/imageVy.png" },
      { name: "Julie", avatar: "/imageJu.png" },
      { name: "Pushkar", avatar: "/imagePu.png" },
    ],
  },
]
