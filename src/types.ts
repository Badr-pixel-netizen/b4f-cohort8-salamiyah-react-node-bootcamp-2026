export type PostCategory = "announcement" | "event" | "community" | "resource";

export interface Post {
  id: number;
  author: string;
  avatar: string;
  category: PostCategory;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

export type OpportunityType = "job" | "internship" | "scholarship" | "volunteer";
export type WorkMode = "remote" | "hybrid" | "on-site";
export type ExperienceLevel = "entry" | "junior" | "mid" | "any";

export interface Opportunity {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  type: OpportunityType;
  workMode: WorkMode;
  location: string;
  skills: string[];
  description: string;
  deadline: string;
  postedAt: string;
  level: ExperienceLevel;
  applied: boolean;
}

export type NotificationTone = "success" | "error";

export interface AppNotification {
  id: number;
  message: string;
  tone: NotificationTone;
}
