export type Role = "USER" | "ADMIN";
export type Locale = "en" | "ne";
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";
export type SleepQuality = "poor" | "fair" | "good";
export type VideoProvider = "YOUTUBE" | "VIMEO";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  language: Locale;
  createdAt: string;
}

export interface PublicUser extends User {
  passwordHash?: never;
}

export interface AuthPayload {
  token: string;
  user: PublicUser;
}

export interface Food {
  id: number;
  name: string;
  nameNe: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  unit: string;
}

export interface FoodLog {
  id: number;
  userId: number;
  foodName: string;
  foodNameNe?: string;
  qty: number;
  kcal: number;
  mealType: MealType;
  date: string;
  createdAt: string;
}

export interface Exercise {
  id: number;
  name: string;
  nameNe: string;
  met: number;
}

export interface ExerciseLog {
  id: number;
  userId: number;
  exerciseName: string;
  met: number;
  durationMin: number;
  kcal: number;
  date: string;
  createdAt: string;
}

export interface SleepLog {
  id: number;
  userId: number;
  hours: number;
  quality: SleepQuality;
  notes?: string;
  date: string;
  createdAt: string;
}

export interface MeditationLog {
  id: number;
  userId: number;
  minutes: number;
  technique: string;
  date: string;
  createdAt: string;
}

export interface Post {
  id: number;
  slug: string;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  contentEn: string;
  contentNe: string;
  coverImage: string;
  tags: string;
  published: boolean;
  publishedAt: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostSummary {
  id: number;
  slug: string;
  titleEn: string;
  titleNe: string;
  excerptEn: string;
  excerptNe: string;
  coverImage: string;
  tags: string;
  publishedAt: string | null;
  views: number;
}

export interface Video {
  id: number;
  titleEn: string;
  titleNe: string;
  url: string;
  provider: VideoProvider;
  category: string;
  thumbnail: string;
  createdAt: string;
}

export interface Testimonial {
  id: number;
  quoteEn: string;
  quoteNe: string;
  author: string;
  role: string;
  rating: number;
  published: boolean;
}

export interface DashboardStats {
  todayKcal: number;
  weeklyKcal: number;
  dailyKcalGoal: number;
  weeklyExerciseMin: number;
  weeklyExerciseKcal: number;
  avgSleepHours: number;
  meditationThisWeek: number;
  last7Days: {
    date: string;
    kcal: number;
    exerciseMin: number;
    sleepHours: number | null;
  }[];
}

export interface ChatMessage {
  role: "user" | "bot";
  text: string;
  quickReplies?: string[];
}

export interface ChatRequest {
  message: string;
  lang: Locale;
}

export interface ChatResponse {
  reply: string;
  quickReplies: string[];
  intent: string;
}