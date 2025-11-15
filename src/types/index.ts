// User profile types
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  location?: string;
  zip_code?: string;
  preferred_radius?: number; // miles
  willing_to_relocate: boolean;
  open_to_remote: boolean;
  preferred_job_titles: string[];
  preferred_industries: string[];
  salary_min?: number;
  salary_max?: number;
  schedule_preference: "day" | "night" | "flexible" | "any";
  employment_type: ("full-time" | "part-time" | "contract" | "temporary")[];
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

// Work experience types
export interface WorkExperience {
  id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  responsibilities: string[];
  achievements: string[];
  created_at: string;
  updated_at: string;
}

// Education types
export interface Education {
  id: string;
  user_id: string;
  school_name: string;
  degree?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  is_completed: boolean;
  gpa?: number;
  created_at: string;
  updated_at: string;
}

// Skill types
export interface Skill {
  id: string;
  user_id: string;
  name: string;
  category: "technical" | "soft" | "certification" | "tool";
  proficiency_level?: "beginner" | "intermediate" | "advanced" | "expert";
  years_of_experience?: number;
  created_at: string;
}

// Resume types
export interface Resume {
  id: string;
  user_id: string;
  title: string;
  target_role?: string;
  summary?: string;
  contact_email?: string;
  contact_phone?: string;
  contact_location?: string;
  experience_ids: string[];
  education_ids: string[];
  skill_ids: string[];
  is_master: boolean;
  created_at: string;
  updated_at: string;
}

// Resume with populated data
export interface ResumeWithData extends Omit<Resume, "experience_ids" | "education_ids" | "skill_ids"> {
  experiences: WorkExperience[];
  education: Education[];
  skills: Skill[];
}

// Job posting types
export interface JobPosting {
  id: string;
  user_id: string;
  title: string;
  company: string;
  location: string;
  is_remote: boolean;
  description: string;
  requirements: string[];
  keywords: string[];
  salary_min?: number;
  salary_max?: number;
  source_url?: string;
  created_at: string;
  updated_at: string;
}

// Application tracking types
export type ApplicationStatus = "saved" | "applied" | "interviewing" | "offered" | "rejected" | "ghosted" | "withdrawn";

export interface JobApplication {
  id: string;
  user_id: string;
  job_posting_id: string;
  resume_id?: string;
  status: ApplicationStatus;
  applied_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Application with job details
export interface ApplicationWithDetails extends JobApplication {
  job_posting: JobPosting;
  resume?: Resume;
}

// Match score for job recommendations
export interface JobMatch {
  job_posting: JobPosting;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  resume_suggestions: string[];
}

// Bullet point generation
export interface BulletSuggestion {
  original: string;
  improved: string;
  metrics_added: boolean;
}

// Onboarding step tracking
export interface OnboardingProgress {
  basic_info: boolean;
  preferences: boolean;
  experience: boolean;
  education: boolean;
  skills: boolean;
}
