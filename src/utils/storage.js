// localStorage utility for managing app state
const STORAGE_KEYS = {
  USER_POINTS: "te-tome-user-points",
  USER_WASTE: "te-tome-user-waste",
  REWARDS: "te-tome-rewards",
  LEADERBOARD: "te-tome-leaderboard",
  USER_RANK: "te-tome-user-rank",
  RECENT_ACTIVITIES: "te-tome-recent-activities",
  MONTHLY_CHALLENGE: "te-tome-monthly-challenge",
};

// Initialize default data
const DEFAULT_REWARDS = [
  {
    id: 1,
    name: "Voucher Belanja 50K",
    points: 500,
    image: "🛒",
    category: "Voucher",
    stock: 45,
  },
  {
    id: 2,
    name: "Tumbler Stainless",
    points: 800,
    image: "🥤",
    category: "Merchandise",
    stock: 23,
  },
  {
    id: 3,
    name: "Tas Belanja Ramah Lingkungan",
    points: 600,
    image: "👜",
    category: "Merchandise",
    stock: 67,
  },
  {
    id: 4,
    name: "Voucher Pulsa 100K",
    points: 1000,
    image: "📱",
    category: "Voucher",
    stock: 89,
  },
  {
    id: 5,
    name: "Power Bank 10000mAh",
    points: 1500,
    image: "🔋",
    category: "Electronics",
    stock: 12,
  },
  {
    id: 6,
    name: "Voucher Makanan 75K",
    points: 750,
    image: "🍔",
    category: "Voucher",
    stock: 54,
  },
  {
    id: 7,
    name: "Earbuds Wireless",
    points: 2000,
    image: "🎧",
    category: "Electronics",
    stock: 8,
  },
  {
    id: 8,
    name: "Plant Starter Kit",
    points: 1200,
    image: "🌱",
    category: "Eco-Friendly",
    stock: 31,
  },
];

const DEFAULT_LEADERBOARD = [
  { rank: 1, name: "Budi Santoso", points: 15420, avatar: "BS", trend: "+320" },
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
  { rank: 6, name: "Fajar Rahman", points: 10950, avatar: "FR", trend: "+165" },
  { rank: 7, name: "Gita Lestari", points: 9870, avatar: "GL", trend: "+142" },
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

const DEFAULT_USER_RANK = { rank: 24, points: 4250, name: "You", avatar: "YU" };

// Get data from localStorage or return default
export const getUserPoints = () => {
  const points = localStorage.getItem(STORAGE_KEYS.USER_POINTS);
  return points ? parseInt(points) : 5420;
};

// Get user's total waste in kg
export const getUserWaste = () => {
  const waste = localStorage.getItem(STORAGE_KEYS.USER_WASTE);
  return waste ? parseFloat(waste) : 0;
};

// Add waste to user's total
export const addUserWaste = (wasteKg) => {
  const currentWaste = getUserWaste();
  const newWaste = currentWaste + parseFloat(wasteKg);
  localStorage.setItem(STORAGE_KEYS.USER_WASTE, newWaste.toString());
  return newWaste;
};

// Set user points
export const setUserPoints = (points) => {
  localStorage.setItem(STORAGE_KEYS.USER_POINTS, points.toString());
};

// Add points to user
export const addUserPoints = (points) => {
  const currentPoints = getUserPoints();
  const newPoints = currentPoints + points;
  setUserPoints(newPoints);
  return newPoints;
};

// Deduct points from user
export const deductUserPoints = (points) => {
  const currentPoints = getUserPoints();
  const newPoints = Math.max(0, currentPoints - points);
  setUserPoints(newPoints);
  return newPoints;
};

// Get rewards
export const getRewards = () => {
  const rewards = localStorage.getItem(STORAGE_KEYS.REWARDS);
  return rewards ? JSON.parse(rewards) : DEFAULT_REWARDS;
};

// Set rewards
export const setRewards = (rewards) => {
  localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
};

// Redeem reward (deduct points and stock)
export const redeemReward = (rewardId) => {
  const rewards = getRewards();
  const reward = rewards.find((r) => r.id === rewardId);

  if (!reward || reward.stock === 0) {
    return { success: false, message: "Reward tidak tersedia" };
  }

  const userPoints = getUserPoints();
  if (userPoints < reward.points) {
    return { success: false, message: "Poin tidak cukup" };
  }

  // Deduct points
  deductUserPoints(reward.points);

  // Reduce stock
  const updatedRewards = rewards.map((r) =>
    r.id === rewardId ? { ...r, stock: r.stock - 1 } : r
  );
  setRewards(updatedRewards);

  return { success: true, reward, newPoints: getUserPoints() };
};

// Get leaderboard
export const getLeaderboard = () => {
  const leaderboard = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
  return leaderboard ? JSON.parse(leaderboard) : DEFAULT_LEADERBOARD;
};

// Get leaderboard with user included if points are high enough
export const getLeaderboardWithUser = () => {
  const loggedInUser = localStorage.getItem("te-tome-user");
  if (!loggedInUser) {
    return DEFAULT_LEADERBOARD;
  }

  const user = JSON.parse(loggedInUser);
  const userPoints = getUserPoints();
  const baseLeaderboard = [...DEFAULT_LEADERBOARD];

  // Create user entry
  const userName = user.name || "You";
  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "YU";
  const userEntry = {
    name: userName,
    points: userPoints,
    avatar: userInitials,
    trend: "+0",
    isUser: true,
  };

  // Add user to leaderboard
  baseLeaderboard.push(userEntry);

  // Sort by points (highest first)
  baseLeaderboard.sort((a, b) => b.points - a.points);

  // Assign ranks
  baseLeaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Return only top 10 or top 10 + user if user is outside top 10
  const userRank = baseLeaderboard.findIndex((entry) => entry.isUser);

  if (userRank < 10) {
    // User is in top 10, return top 10
    return baseLeaderboard.slice(0, 10);
  } else {
    // User is outside top 10, return top 10
    return baseLeaderboard.slice(0, 10);
  }
};

// Get user's rank in leaderboard
export const getUserLeaderboardRank = () => {
  const loggedInUser = localStorage.getItem("te-tome-user");
  if (!loggedInUser) {
    return { rank: null, points: 0 };
  }

  const userPoints = getUserPoints();
  const baseLeaderboard = [...DEFAULT_LEADERBOARD];

  // Add user to leaderboard
  const user = JSON.parse(loggedInUser);
  const userName = user.name || "You";
  const userInitials =
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "YU";

  baseLeaderboard.push({
    name: userName,
    points: userPoints,
    avatar: userInitials,
    isUser: true,
  });

  // Sort by points
  baseLeaderboard.sort((a, b) => b.points - a.points);

  // Find user rank
  const userRank = baseLeaderboard.findIndex((entry) => entry.isUser) + 1;

  return {
    rank: userRank,
    points: userPoints,
    avatar: userInitials,
    name: userName,
  };
};

// Get user rank
export const getUserRank = () => {
  const rank = localStorage.getItem(STORAGE_KEYS.USER_RANK);
  if (rank) {
    return JSON.parse(rank);
  }
  return { ...DEFAULT_USER_RANK, points: getUserPoints() };
};

// Update user rank after earning points
export const updateUserRank = (pointsEarned) => {
  const currentRank = getUserRank();
  const newPoints = currentRank.points + pointsEarned;
  const updatedRank = { ...currentRank, points: newPoints };
  localStorage.setItem(STORAGE_KEYS.USER_RANK, JSON.stringify(updatedRank));
  return updatedRank;
};

// Initialize storage with defaults if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USER_POINTS)) {
    setUserPoints(5420);
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER_WASTE)) {
    localStorage.setItem(STORAGE_KEYS.USER_WASTE, "54.2");
  }
  if (!localStorage.getItem(STORAGE_KEYS.REWARDS)) {
    setRewards(DEFAULT_REWARDS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.LEADERBOARD)) {
    localStorage.setItem(
      STORAGE_KEYS.LEADERBOARD,
      JSON.stringify(DEFAULT_LEADERBOARD)
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.USER_RANK)) {
    localStorage.setItem(
      STORAGE_KEYS.USER_RANK,
      JSON.stringify(DEFAULT_USER_RANK)
    );
  }
  if (!localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITIES)) {
    localStorage.setItem(STORAGE_KEYS.RECENT_ACTIVITIES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.MONTHLY_CHALLENGE)) {
    localStorage.setItem(
      STORAGE_KEYS.MONTHLY_CHALLENGE,
      JSON.stringify({ plasticWaste: 0, target: 50 })
    );
  }
};

// Get recent activities
export const getRecentActivities = () => {
  const activities = localStorage.getItem(STORAGE_KEYS.RECENT_ACTIVITIES);
  return activities ? JSON.parse(activities) : [];
};

// Add a new activity
export const addActivity = (activity) => {
  const activities = getRecentActivities();
  const newActivity = {
    id: Date.now(),
    ...activity,
    time: getTimeAgo(new Date()),
    timestamp: Date.now(),
  };

  // Add to beginning of array (most recent first)
  activities.unshift(newActivity);

  // Keep only last 10 activities
  const limitedActivities = activities.slice(0, 10);

  localStorage.setItem(
    STORAGE_KEYS.RECENT_ACTIVITIES,
    JSON.stringify(limitedActivities)
  );

  return limitedActivities;
};

// Helper function to get relative time
const getTimeAgo = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays === 1) return "1 hari lalu";
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return "Lebih dari seminggu lalu";
};

// Get monthly challenge progress
export const getMonthlyChallenge = () => {
  const challenge = localStorage.getItem(STORAGE_KEYS.MONTHLY_CHALLENGE);
  return challenge ? JSON.parse(challenge) : { plasticWaste: 0, target: 50 };
};

// Update monthly challenge progress when plastic is added
export const updateMonthlyChallenge = (category, wasteKg) => {
  // Only track plastic categories
  if (category.toLowerCase().includes("plastik")) {
    const challenge = getMonthlyChallenge();
    const newPlasticWaste = challenge.plasticWaste + parseFloat(wasteKg);
    const updatedChallenge = {
      ...challenge,
      plasticWaste: newPlasticWaste,
    };
    localStorage.setItem(
      STORAGE_KEYS.MONTHLY_CHALLENGE,
      JSON.stringify(updatedChallenge)
    );
    return updatedChallenge;
  }
  return getMonthlyChallenge();
};
