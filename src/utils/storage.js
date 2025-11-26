// localStorage utility for managing app state
const STORAGE_KEYS = {
  USER_POINTS: "te-tome-user-points",
  REWARDS: "te-tome-rewards",
  LEADERBOARD: "te-tome-leaderboard",
  USER_RANK: "te-tome-user-rank",
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
};
