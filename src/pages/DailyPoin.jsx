import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Medal, Award, TrendingUp, Crown } from "lucide-react";

const DailyPoin = () => {
  const navigate = useNavigate();

  // Dummy leaderboard data
  const leaderboardData = [
    {
      rank: 1,
      name: "Budi Santoso",
      points: 15420,
      avatar: "BS",
      trend: "+320",
    },
    { rank: 2, name: "Ani Wijaya", points: 14850, avatar: "AW", trend: "+280" },
    { rank: 3, name: "Citra Dewi", points: 13990, avatar: "CD", trend: "+245" },
    {
      rank: 4,
      name: "Doni Prasetyo",
      points: 12750,
      avatar: "DP",
      trend: "+198",
    },
    { rank: 5, name: "Eka Putri", points: 11890, avatar: "EP", trend: "+176" },
    {
      rank: 6,
      name: "Fajar Rahman",
      points: 10950,
      avatar: "FR",
      trend: "+165",
    },
    {
      rank: 7,
      name: "Gita Lestari",
      points: 9870,
      avatar: "GL",
      trend: "+142",
    },
    {
      rank: 8,
      name: "Hadi Kurniawan",
      points: 8920,
      avatar: "HK",
      trend: "+128",
    },
    { rank: 9, name: "Indah Sari", points: 7850, avatar: "IS", trend: "+115" },
    { rank: 10, name: "Joko Widodo", points: 6980, avatar: "JW", trend: "+98" },
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-slate-300" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-400" />;
      default:
        return null;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 hover:border-yellow-500/50";
      case 2:
        return "from-slate-500/20 to-slate-600/10 border-slate-500/30 hover:border-slate-500/50";
      case 3:
        return "from-orange-500/20 to-orange-600/10 border-orange-500/30 hover:border-orange-500/50";
      default:
        return "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 backdrop-blur-xl border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="p-2 hover:bg-white/5 rounded-xl transition-all duration-300"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Daily Poin Leaderboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Top 10 kontributor sampah hari ini
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-xl">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Top Contributor</p>
                <p className="text-white font-bold text-xl">Budi Santoso</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Trophy className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Points Today</p>
                <p className="text-white font-bold text-xl">125,470</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Users</p>
                <p className="text-white font-bold text-xl">1,245</p>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-emerald-400" />
            Leaderboard
          </h2>

          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className={`group relative bg-gradient-to-r ${getRankColor(
                  user.rank
                )} border rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    {user.rank <= 3 ? (
                      getRankIcon(user.rank)
                    ) : (
                      <span className="text-2xl font-bold text-slate-400">
                        {user.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${
                      user.rank === 1
                        ? "from-yellow-400 to-yellow-600"
                        : user.rank === 2
                        ? "from-slate-300 to-slate-500"
                        : user.rank === 3
                        ? "from-orange-400 to-orange-600"
                        : "from-emerald-400 to-emerald-600"
                    } flex items-center justify-center font-bold text-white shadow-lg`}
                  >
                    {user.avatar}
                  </div>

                  {/* Name & Trend */}
                  <div className="flex-grow">
                    <h3 className="text-white font-semibold text-lg">
                      {user.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400 text-sm font-medium">
                        {user.trend} today
                      </span>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {user.points.toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-sm">points</div>
                  </div>
                </div>

                {/* Hover Effect */}
                {user.rank <= 3 && (
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                      Top {user.rank}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Rank Card */}
        <div className="mt-8 bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                YU
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Your Rank</h3>
                <p className="text-slate-400 text-sm">
                  Keep collecting points!
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">#24</div>
              <div className="text-slate-400 text-sm">4,250 points</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyPoin;
