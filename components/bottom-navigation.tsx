"use client"

import { FileText, List, Search, Trophy } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  return (
    <div className="flex items-center justify-around py-3 border-t bg-white">
      <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("feed")}>
        <FileText className={`h-6 w-6 ${activeTab === "feed" ? "text-teal-700" : "text-gray-500"}`} />
        <span className={activeTab === "feed" ? "text-teal-700" : "text-gray-500"}>Feed</span>
      </button>

      <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("lists")}>
        <List className={`h-6 w-6 ${activeTab === "lists" ? "text-teal-700" : "text-gray-500"}`} />
        <span className={activeTab === "lists" ? "text-teal-700" : "text-gray-500"}>Your Lists</span>
      </button>

      <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("search")}>
        <div className="h-12 w-12 rounded-full bg-teal-700 flex items-center justify-center text-white">
          <Search className="h-6 w-6" />
        </div>
      </button>

      <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("leaderboard")}>
        <Trophy className={`h-6 w-6 ${activeTab === "leaderboard" ? "text-teal-700" : "text-gray-500"}`} />
        <span className={activeTab === "leaderboard" ? "text-teal-700" : "text-gray-500"}>Leaderboard</span>
      </button>

      <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("profile")}>
        <div
          className={`h-6 w-6 rounded-full flex items-center justify-center ${activeTab === "profile" ? "bg-teal-700 text-white" : "bg-gray-200 text-gray-500"}`}
        >
          <span className="text-xs">AG</span>
        </div>
        <span className={activeTab === "profile" ? "text-teal-700" : "text-gray-500"}>Profile</span>
      </button>
    </div>
  )
}
