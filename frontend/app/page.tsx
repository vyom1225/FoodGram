"use client"

import Image from "next/image"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChevronDown, ChevronRight, Info, Share, Trophy, X, Heart, MessageCircle, Send, Plus, Bookmark, Search, Share2, ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { HeaderNavigation } from "@/components/Header-navigation"
import { SearchScreen } from "@/components/search-screen"
import { WantToTryTab } from "@/components/want-to-try-tab"
import { FeedItem } from "@/components/feed-item"
import { FriendRecsTab } from "@/components/friend-recs-tab"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/store/useAuthStore"
import { Footer } from "@/components/footer"
import { Stories } from "@/components/stories"

export default function Home() {
  const [activeTab, setActiveTab] = useState("feed")
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "feed" && <FeedScreen setActiveTab={setActiveTab} />}
      {activeTab === "leaderboard" && <LeaderboardScreen setActiveTab={setActiveTab} />}
      {activeTab === "lists" && <ListsScreen setActiveTab={setActiveTab} />}
      {activeTab === "profile" && <ProfileScreen setActiveTab={setActiveTab} />}
      {activeTab === "search" && <SearchScreen setActiveTab={setActiveTab} />}
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
              Delhi<ChevronDown className="h-4 w-4" />
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
                                  <AvatarImage src={member.avatar} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {list.members.length} members
                            </span>
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
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint to clear the JWT cookie
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logout`, {
        method: 'POST',
        credentials: 'include', // Important: This ensures cookies are sent with the request
      });

      // Clear the user state from Zustand store
      logout();
      
      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if the backend call fails, we'll still clear the local state and redirect
      logout();
      router.push("/login");
    }
  };

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
          <div/>
          </div>
          </div>
          </div>
          </div>
  )
}

function FeedScreen({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const [activeFeed, setActiveFeed] = useState("friends")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showMoodOptions, setShowMoodOptions] = useState(false)

  const stories = [
    {
      id: "1",
      user: {
        name: "Julie",
        avatar: "/imageJu.png?height=48&width=48",
      },
      image: "/imagepa.png?height=400&width=400",
      timestamp: "2h",
      likes: 12
    },
    {
      id: "2",
      user: {
        name: "Adi Restra",
        avatar: "/imageAd.png?height=48&width=48",
      },
      image: "/imagemap.png?height=400&width=400",
      timestamp: "4h",
      likes: 8
    },
    {
      id: "3",
      user: {
        name: "Pushkar",
        avatar: "/imagePu.png?height=48&width=48",
      },
      image: "/imagedo.png?height=400&width=400",
      timestamp: "5h",
      likes: 15
    },
    {
      id: "4",
      user: {
        name: "Vyom",
        avatar: "/imageVy.png?height=48&width=48",
      },
      image: "/imageba.png?height=400&width=400",
      timestamp: "6h",
      likes: 20
    }
  ]

  const moodOptions = [
    { id: "fun", label: "😄 Fun", icon: "🎉" },
    { id: "love", label: "❤️ Love", icon: "💝" },
    { id: "adventurous", label: "🌍 Adventurous", icon: "🏃" },
    { id: "relaxed", label: "😌 Relaxed", icon: "☕" },
    { id: "foodie", label: "🍽️ Foodie", icon: "🍜" }
  ]

  const getSelectedMoodLabel = () => {
    if (!selectedMood) return "🎭 Moodles"
    const mood = moodOptions.find(m => m.id === selectedMood)
    return mood ? mood.label : "🎭 Moodles"
  }

  const getFeedContent = () => {
    if (activeFeed === "moodles" && selectedMood) {
      switch (selectedMood) {
        case "fun":
          return (
            <>
              <FeedItem
                type="review"
                user={{
                  name: "Julie",
                  avatar: "/imageJu.png?height=48&width=48",
                }}
                restaurant={{
                  name: "Massara",
                  location: "Delhi",
                  rating: 4.8,
                }}
                content={{
                  visits: 2,
                  notes: "Had an amazing time with friends! The atmosphere was so lively and fun! 🎉",
                  images: [
                    "/imagepa.png?height=400&width=400",
                    "/imagedo.png?height=400&width=400",
                  ],
                  bookmarks: 23,
                }}
                date="April 7"
              />
            </>
          )
        case "love":
          return (
            <>
              <FeedItem
                type="review"
                user={{
                  name: "Adi Restra",
                  avatar: "/imageAd.png?height=48&width=48",
                }}
                restaurant={{
                  name: "Amantran",
                  location: "Delhi",
                  rating: 4.5,
                }}
                content={{
                  companions: ["Aditya", "Vyom"],
                  visits: 3,
                  notes: "Perfect place for a romantic dinner! The candlelight and soft music created such a magical atmosphere 💕",
                  favoriteDishes: ["Butter Chicken", "Naan"],
                  image: "/imagemap.png?height=400&width=400",
                  bookmarks: 15,
                }}
                date="April 8"
              />
            </>
          )
        case "adventurous":
          return (
            <>
              <FeedItem
                type="review"
                user={{
                  name: "Pushkar",
                  avatar: "/imagePu.png?height=48&width=48",
                }}
                restaurant={{
                  name: "Haldiram",
                  location: "Delhi",
                  rating: 4.2,
                }}
                content={{
                  companions: ["Aditya"],
                  visits: 1,
                  notes: "Tried some unique street food combinations today! The fusion dishes were surprisingly amazing! 🌟",
                  bookmarks: 8,
                }}
                date="April 6"
              />
            </>
          )
        case "relaxed":
          return (
            <>
              <FeedItem
                type="review"
                user={{
                  name: "fooDelhi",
                  avatar: "/imageAd.png?height=48&width=48",
                }}
                restaurant={{
                  name: "The Big Chill Cafe",
                  location: "Kailash Colony Market",
                  rating: 4.7,
                }}
                content={{
                  visits: 5,
                  notes: "Perfect spot for a relaxed afternoon! The cozy ambiance and great coffee made it a perfect escape from the city hustle.",
                  favoriteDishes: ["Ravioli Al Funghi", "Eggless Pasta"],
                  video: "/video.mp4",
                  thumbnail: "/video-thumbnail.png",
                  bookmarks: 42,
                }}
                date="April 9"
              />
            </>
          )
        case "foodie":
          return (
            <>
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
                  notes: "Foodie heaven! The variety of dishes and the attention to detail in presentation is just mind-blowing! 🍽️",
                  bookmarks: 28,
                }}
                date="April 6"
              />
            </>
          )
        default:
          return null
      }
    }

    return (
      <>
        {/* The Big Chill Cafe Review */}
        <FeedItem
          type="review"
          user={{
            name: "fooDelhi",
            avatar: "/imageAd.png?height=48&width=48",
          }}
          restaurant={{
            name: "The Big Chill Cafe",
            location: "Kailash Colony Market",
            rating: 4.7,
          }}
          content={{
            visits: 5,
            notes: "Big Chill is one of my favorites! 😍 The eggless (do ask for it specifically) Ravioli Al Funghi, where the ravioli is stuffed with mushrooms and cream cheese and tossed in a garlicky, cheesy parmesan cream cheese sauce.",
            favoriteDishes: ["Ravioli Al Funghi", "Eggless Pasta"],
            video: "/video.mp4",
            thumbnail: "/video-thumbnail.png",
            bookmarks: 42,
          }}
          date="April 9"
        />

        {/* Adi Restra's Review */}
        <FeedItem
          type="review"
          user={{
            name: "Adi Restra",
            avatar: "/imageAd.png?height=48&width=48",
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
            favoriteDishes: ["Butter Chicken", "Naan"],
            image: "/imagemap.png?height=400&width=400",
            bookmarks: 15,
          }}
          date="April 8"
        />

        {/* Julie's Review */}
        <FeedItem
          type="review"
          user={{
            name: "Julie",
            avatar: "/imageJu.png?height=48&width=48",
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
              "/imageba.png?height=400&width=400",
              "/chow.png?height=400&width=400",
            ],
            bookmarks: 23,
          }}
          date="April 7"
        />

        {/* Pushkar's Review */}
        <FeedItem
          type="review"
          user={{
            name: "Pushkar",
            avatar: "/imagePu.png?height=48&width=48",
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

        {/* Bookmark Cards */}
        <div className="space-y-8">
          {/* Aditya's Bookmark */}
          <FeedItem
            type="bookmark"
            user={{
              name: "Aditya",
              avatar: "/Aditya.png?height=48&width=48",
            }}
            restaurant={{
              name: "Belgian Waffle",
              location: "Delhi",
            }}
            content={{
              bookmarks: 11,
            }}
            date="April 7"
          />

          {/* Vyom's Bookmark */}
          <FeedItem
            type="bookmark"
            user={{
              name: "Vyom",
              avatar: "/imageVy.png?height=48&width=48",
            }}
            restaurant={{
              name: "Belgian Waffle",
              location: "Greater Noida",
            }}
            content={{
              bookmarks: 28,
            }}
            date="April 6"
          />
        </div>
      </>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-3xl mx-auto w-full px-4">
        <div className="space-y-4 my-6 relative">   
          <div className="absolute left-4 top-[34px]">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search a restaurant, member, etc."
            className="w-full pl-12 pr-4 py-4 bg-gray-100 rounded-xl text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-lg"
          />
        </div>

        {activeFeed === "friends" && <Stories stories={stories} />}

        <div className="flex gap-3 mb-6">
          <Button 
            variant="outline" 
            className={`rounded-full border-teal-800 text-teal-800 px-6 py-2 text-lg hover:bg-teal-50 transition-colors ${activeFeed === "friends" ? "bg-teal-50" : ""}`}
            onClick={() => {
              setActiveFeed("friends")
              setSelectedMood(null)
              setShowMoodOptions(false)
            }}
          >
            👥 Friends
          </Button>
          <Button 
            variant="outline"
            className={`rounded-full ${activeFeed === "trending" ? "bg-teal-800 text-white border-teal-800" : "bg-white border-teal-800 text-teal-800"} px-6 py-2 text-lg hover:bg-teal-50 transition-colors`}
            onClick={() => {
              setActiveFeed("trending")
              setSelectedMood(null)
              setShowMoodOptions(false)
            }}
          >
            📈 Trending
          </Button>
          <div className="relative">
            <Button 
              variant="outline" 
              className={`rounded-full border-teal-800 text-teal-800 px-6 py-2 text-lg hover:bg-teal-50 transition-colors ${activeFeed === "moodles" ? "bg-teal-50" : ""}`}
              onClick={() => {
                setActiveFeed("moodles")
                setShowMoodOptions(!showMoodOptions)
              }}
            >
              {getSelectedMoodLabel()}
              <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showMoodOptions ? 'rotate-180' : ''}`} />
            </Button>
            {showMoodOptions && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-10">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.id}
                    className="w-full px-4 py-2 text-left hover:bg-teal-50 flex items-center gap-2"
                    onClick={() => {
                      setSelectedMood(mood.id)
                      setShowMoodOptions(false)
                    }}
                  >
                    <span className="text-xl">{mood.icon}</span>
                    <span>{mood.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {getFeedContent()}
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
    recommendedBy: "5 friends"
  },
  {
    name: "Pasta Paradise",
    location: "South Delhi",
    rating: 4.6,
    recommendedBy: "3 friends"
  },
  {
    name: "Burger Bliss",
    location: "Greater Noida",
    rating: 4.5,
    recommendedBy: "7 friends"
  }
]

const groupLists = [
  {
    title: "Weekend Brunch Spots",
    description: "Our favorite places for Sunday brunch with friends",
    restaurants: ["Cafe Delight", "Morning Glory", "Sunny Side Up"],
    members: [
      { name: "Aditya", avatar: "/Aditya.png" },
      { name: "Vyom", avatar: "/imageVy.png" },
      { name: "Julie", avatar: "/imageJu.png" }
    ]
  },
  {
    title: "Date Night Places",
    description: "Romantic restaurants for special occasions",
    restaurants: ["Candle Light", "Moonlight", "Stars"],
    members: [
      { name: "Pushkar", avatar: "/imagePu.png" },
      { name: "Aditya", avatar: "/Aditya.png" }
    ]
  },
  {
    title: "Quick Lunch Options",
    description: "Fast and delicious lunch spots near office",
    restaurants: ["Quick Bite", "Lunch Box", "Express"],
    members: [
      { name: "Vyom", avatar: "/imageVy.png" },
      { name: "Julie", avatar: "/imageJu.png" },
      { name: "Pushkar", avatar: "/imagePu.png" }
    ]
  }
]