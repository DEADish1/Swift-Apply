// User profile types
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}

// Work experience types
export interface WorkExperience {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  achievements: string[];
  created_at: string;
}

// Skill types
export interface Skill {
  id: string;
  user_id: string;
  name: string;
  category: "technical" | "soft" | "certification" | "tool";
  proficiency_level?: "beginner" | "intermediate" | "advanced" | "expert";
}

// Resume types
export interface Resume {
  id: string;
  user_id: string;
  title: string;
  summary?: string;
  experiences: WorkExperience[];
  skills: Skill[];
  is_master: boolean;
  created_at: string;
  updated_at: string;
}

// Job posting types
export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  is_remote: boolean;
  description: string;
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  posted_date: string;
  source_url?: string;
}

// Application tracking types
export interface JobApplication {
  id: string;
  user_id: string;
  job_posting_id: string;
  resume_id: string;
  status: "saved" | "applied" | "interviewing" | "offered" | "rejected" | "withdrawn";
  applied_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Match score for job recommendations
export interface JobMatch {
  job_posting: JobPosting;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  resume_suggestions: string[];
}
