"use client"

import { FileText, List, Search, Trophy } from "lucide-react"

interface HeaderNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function HeaderNavigation({ activeTab, setActiveTab }: HeaderNavigationProps) {
  return (
    <div className="flex items-center border-b-2 px-10 h-[50px] bg-white ">
     <div className = "flex items-center justify-start text-lg">
        <span className="text-teal-800 font-bold">FoodGram</span>
     </div>
     <div className = "flex items-center justify-end gap-20 w-full ">
        <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("feed")}>
            <span className={`${activeTab === "feed" ? "text-teal-700" : "text-gray-500"} text-lg`}>Feed</span>
        </button>

        <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("lists")}>
            <span className={`${activeTab === "lists" ? "text-teal-700" : "text-gray-500"} text-lg`}>Your Lists</span>
        </button>

        <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("search")}>
                <span className={`${activeTab === "search" ? "text-teal-700" : "text-gray-500"} text-lg`}>Search</span>
        </button>

        <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("leaderboard")}>
            <span className={`${activeTab === "leaderboard" ? "text-teal-700" : "text-gray-500"} text-lg`}>Leaderboard</span>
        </button>

        <button className="flex flex-col items-center text-xs" onClick={() => setActiveTab("profile")}>

            <span className={`${activeTab === "profile" ? "text-teal-700" : "text-gray-500"} text-lg`}>Profile</span>
        </button>
     </div>  
    </div>
  )
}
