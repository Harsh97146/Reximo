"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Crown, Star, Target, TrendingUp } from "lucide-react";

export default function MyRankPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [nextRank, setNextRank] = useState(null);
  const [ranks, setRanks] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
       router.push("/login");
       return;
    }

    try {
        // Fetch User Profile to get latest points and rank
        const userRes = await fetch(`${BASE_API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!userRes.ok) throw new Error("Failed to fetch profile");
        
        const userData = await userRes.json();
        setUser(userData.user);

        // Fetch Ranks to calculate progress
        const ranksRes = await fetch(`${BASE_API_URL}/ranks`);
        if (ranksRes.ok) {
            const ranksData = await ranksRes.json();
            // Sort ranks by minPoints ascending
            const sortedRanks = ranksData.sort((a, b) => a.minPoints - b.minPoints);
            setRanks(sortedRanks);

            // Find next rank
            const currentPoints = userData.user.currentPoints || 0;
            const next = sortedRanks.find(r => r.minPoints > currentPoints);
            setNextRank(next || null);
        }

    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  };

  if (loading) {
     return <div className="flex justify-center items-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
  }

  const currentRankName = user?.currentRank || "Bronze";
  const currentRankColor = ranks.find(r => r.name === currentRankName)?.color || "#CD7F32"; // Fallback bronze color
  const currentPoints = user?.currentPoints || 0;
  
  // Progress Calculation
  let progress = 0;
  let pointsNeeded = 0;
  let nextRankName = "Max Rank";
  
  if (nextRank) {
      nextRankName = nextRank.name;
      // Calculate progress relative to the current level bracket? 
      // Or absolute? Let's do absolute for simplicity first: 
      // Progress = (Current Points / Next Rank Goal) * 100
      // BUT commonly it's (Current - PreviousRankMin) / (NextRankMin - PreviousRankMin)
      // Let's stick to user request: "user have 1000... next is 1200... add 200"
      // So simplified view:
      pointsNeeded = nextRank.minPoints - currentPoints;
      progress = Math.min((currentPoints / nextRank.minPoints) * 100, 100);
  } else {
      progress = 100;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 font-dm-sans">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Rank Journey</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Current Status Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-gray-50 p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700">Current Status</h3>
                    <Crown size={24} style={{ color: currentRankColor }} />
                </div>
                <div className="p-8 text-center">
                     <div 
                        className="w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-md mb-4 text-3xl font-bold text-white transition-transform hover:scale-105 duration-300"
                        style={{ backgroundColor: currentRankColor }}
                     >
                        {currentRankName.charAt(0)}
                     </div>
                     <h2 className="text-2xl font-bold text-gray-900 mb-1">{currentRankName}</h2>
                     <p className="text-gray-500">Current Rank</p>
                </div>
            </div>

            {/* Points & Progress Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Points</p>
                        <h4 className="text-3xl font-bold text-gray-900">{currentPoints.toLocaleString()}</h4>
                    </div>
                 </div>

                 {nextRank ? (
                    <div>
                        <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                            <span>Progress to {nextRank.name}</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
                            <div 
                                className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Target size={14} />
                            <span>Only <strong>{pointsNeeded.toLocaleString()} points</strong> needed for {nextRank.name}</span>
                        </p>
                    </div>
                 ) : (
                     <div className="text-green-600 bg-green-50 p-4 rounded-lg flex items-center gap-2">
                        <TrendingUp size={20} />
                        <span className="font-semibold">You've reached the top rank!</span>
                     </div>
                 )}
            </div>
        </div>

        {/* Rank Tiers List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Rank Tiers</h3>
            </div>
            <div className="divide-y divide-gray-100">
                {ranks.map((rank) => {
                    const isCurrent = rank.name === currentRankName;
                    return (
                        <div key={rank._id} className={`p-4 sm:p-6 flex items-center justify-between ${isCurrent ? 'bg-blue-50/50' : ''}`}>
                             <div className="flex items-center gap-4">
                                 <div className="w-3 h-12 rounded-full" style={{ backgroundColor: rank.color }}></div>
                                 <div>
                                     <h4 className="font-bold text-gray-900 flex items-center gap-2">
                                         {rank.name}
                                         {isCurrent && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">Current</span>}
                                     </h4>
                                     <p className="text-sm text-gray-500">Min. Points: {rank.minPoints}</p>
                                 </div>
                             </div>
                             <div className="text-right hidden sm:block">
                                 {rank.benefits && rank.benefits.length > 0 && (
                                     <ul className="text-sm text-gray-600 list-disc list-inside">
                                         {rank.benefits.map((b, i) => <li key={i} className="truncate max-w-[300px]">{b}</li>)}
                                     </ul>
                                 )}
                             </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
}
