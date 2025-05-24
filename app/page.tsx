"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, Info, Share, Trophy, X } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { SearchScreen } from "@/components/search-screen"
import { WantToTryTab } from "@/components/want-to-try-tab"
import { FeedItem } from "@/components/feed-item"
import { FriendRecsTab } from "@/components/friend-recs-tab"

export default function Home() {
  const [activeTab, setActiveTab] = useState("feed")

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center p-2 text-sm text-gray-700">
        <div>00:25 📷</div>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>LTE</span>
          <span>29%🔋</span>
        </div>
      </div>

      {activeTab === "feed" && <FeedScreen setActiveTab={setActiveTab} />}
      {activeTab === "leaderboard" && <LeaderboardScreen setActiveTab={setActiveTab} />}
      {activeTab === "lists" && <ListsScreen setActiveTab={setActiveTab} />}
      {activeTab === "profile" && <ProfileScreen setActiveTab={setActiveTab} />}
      {activeTab === "search" && <SearchScreen setActiveTab={setActiveTab} />}

      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
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
              New York, NY <ChevronDown className="h-4 w-4" />
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
            Number of Beli members who are here because of you (i.e., joined from your invite)
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
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-6"></div>
        <h1 className="text-lg font-bold">MY LISTS</h1>
        <div className="flex gap-2">
          <Share className="h-6 w-6" />
          <div className="w-6">⋯</div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="flex items-center mb-4">
          <h2 className="text-3xl font-bold">Restaurants</h2>
          <ChevronDown className="h-6 w-6 ml-2" />
        </div>

        <Tabs defaultValue="friend-recs" className="w-full">
          <TabsList className="grid grid-cols-5 rounded-none border-b text-xs">
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
              value="recs"
              className="text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:text-black"
            >
              🔒Recs
            </TabsTrigger>
            <TabsTrigger
              value="friend-recs"
              className="data-[state=active]:border-b-2 data-[state=active]:border-teal-700 data-[state=active]:font-bold"
            >
              Friend Recs
            </TabsTrigger>
            <TabsTrigger
              value="more"
              className="text-gray-400 data-[state=active]:border-b-2 data-[state=active]:border-teal-700"
            >
              More
              <ChevronDown className="h-3 w-3 inline ml-1" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="been" className="pt-4">
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-gray-500">Your progress to</h3>
              <div className="flex items-center gap-2">
                <h3 className="text-teal-700 text-xl font-bold">Personalized Recs!</h3>
                <Info className="h-5 w-5 text-teal-700" />
              </div>

              <div className="relative h-2 bg-gray-200 rounded-full mt-4">
                <div className="absolute left-0 top-0 h-2 w-1/3 bg-teal-700 rounded-full"></div>
                <div className="absolute left-0 top-0 h-5 w-5 bg-teal-700 rounded-full -mt-1.5"></div>
                <div className="absolute left-1/2 top-0 h-5 w-5 bg-gray-400 rounded-full -mt-1.5"></div>
                <div className="absolute right-0 top-0 h-5 w-5 bg-gray-400 rounded-full -mt-1.5"></div>
              </div>

              <div className="flex justify-between mt-2 text-sm">
                <div></div>
                <div className="text-gray-500">Unlock Scores</div>
                <div className="text-gray-500">Recs</div>
              </div>
            </div>

            <h3 className="text-teal-800 text-2xl font-bold mb-6">
              Start here! How many of these spots have you tried?
            </h3>

            <div className="border rounded-lg p-4 mb-6 flex items-center">
              <div className="h-16 w-16 flex items-center justify-center text-teal-700 border-2 border-teal-700 rounded-lg">
                <div className="relative">
                  📋
                  <div className="absolute bottom-0 right-0 bg-teal-700 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    +
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold">Want help building your list?</h4>
                <p className="text-blue-500">Sync your past reservations</p>
              </div>
            </div>

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
                    🔖
                  </Button>
                  <X className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="want">
            <WantToTryTab />
          </TabsContent>

          <TabsContent value="friend-recs">
            <FriendRecsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ProfileScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="w-6"></div>
        <h1 className="text-xl font-bold">Aditya Gipt</h1>
        <div className="flex gap-2">
          <Share className="h-6 w-6" />
          <div className="w-6">≡</div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-6 px-4">
        <Avatar className="h-32 w-32 bg-gray-100">
          <AvatarFallback className="text-5xl text-gray-400">AG</AvatarFallback>
        </Avatar>

        <h2 className="text-xl font-bold mt-4">@Adibhai0845R</h2>
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
            <span className="text-gray-500">Rank on Beli</span>
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
              <span className="text-lg text-gray-500">Rank on Beli</span>
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
          </div>
        </div>
      </div>
    </div>
  )
}

function FeedScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-teal-800">beli</h1>
        <div className="flex gap-4">
          <div className="h-6 w-6">📅</div>
          <div className="h-6 w-6">🔔</div>
          <div className="h-6 w-6">≡</div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="h-5 w-5 text-gray-400">🔍</div>
          </div>
          <input
            type="text"
            placeholder="Search a restaurant, member, etc."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg text-gray-600 placeholder-gray-400"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button className="rounded-full bg-teal-800 text-white">📈 Trending</Button>
          <Button variant="outline" className="rounded-full border-teal-800 text-teal-800">
            👥 Friend recs
          </Button>
        </div>

        {/* Feed Items */}
        <div className="mt-4">
          <FeedItem
            user={{
              name: "Jordan",
              avatar: "/placeholder.svg?height=60&width=60",
            }}
            restaurant={{
              name: "Morgenstern's Finest Ice Cream",
              location: "South Village, Manhattan",
              rating: 10.0,
            }}
            content={{
              companions: ["Lawrence Sanz", "Lewis MacMillan"],
              visits: 1,
              notes:
                "Super yummy I've cream (and had dairy free!!!) — it wasn't just another fruit sorbet like I'm used to having to have...very happy :)",
              favoriteDishes: ["Cow tracks"],
              image: "/placeholder.svg?height=300&width=400",
              bookmarks: 1,
            }}
            date="Wednesday"
          />
        </div>

        {/* Invites Section */}
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-bold text-teal-800 mb-2">You have 6 invites left!</h3>
          <p className="text-gray-500 mb-4">Unlock features as friends join (0/5)</p>

          <div className="grid grid-cols-5 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">📊</div>
              <span className="text-xs text-center">Average Scores</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">🍽️</div>
              <span className="text-xs text-center">Dish Search</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">📋</div>
              <span className="text-xs text-center">Res sharing</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">🥷</div>
              <span className="text-xs text-center">Stealth Mode</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">👥</div>
              <span className="text-xs text-center">Social Links</span>
            </div>
          </div>

          <Button className="w-full bg-teal-800 text-white rounded-lg">Invite friends</Button>
        </div>

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-teal-800 to-teal-600 rounded-lg p-4 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-1">Beli x The Noortwyck</h3>
            <p className="text-sm mb-1">Beli Supper Club Exclusive Event</p>
            <p className="text-sm">June 3. Click here to book a spot</p>
          </div>
          <div className="absolute right-4 top-4">
            <div className="text-2xl">×</div>
          </div>
          <div className="absolute right-4 bottom-4 text-right">
            <div className="text-lg font-serif italic">The Noortwyck</div>
            <div className="text-sm font-bold">beli</div>
          </div>
        </div>

        {/* Featured Lists */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">FEATURED LISTS</h3>
          <span className="text-teal-800 font-medium">See all</span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4">
          <div className="relative min-w-[200px] h-48 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Mexican food"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-lg">Top 20 NYC Mexican</h4>
              <p className="text-white text-sm">{"You've been to 0 of 20"}</p>
            </div>
          </div>

          <div className="relative min-w-[200px] h-48 rounded-lg overflow-hidden">
            <img src="/placeholder.svg?height=200&width=200" alt="Burger" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4">
              <h4 className="text-white font-bold text-lg">Top 20 NYC Reservations on Beli</h4>
              <p className="text-white text-sm">{"You've been to 0 of 20"}</p>
            </div>
          </div>
        </div>
      </div>
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
  { name: "LOS TACOS No.1", location: "Chelsea, New York, NY" },
  { name: "Prince Street Pizza", location: "Nolita, New York, NY" },
  { name: "Soothr", location: "Ukrainian Village, New York, NY" },
  { name: "Thai Diner", location: "Nolita, New York, NY" },
  { name: "L'Artusi", location: "West Village, New York, NY" },
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
