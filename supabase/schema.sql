-- Swift Apply Database Schema
-- Run this in your Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase Auth users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  preferred_radius_miles INT DEFAULT 25,
  remote_ok BOOLEAN DEFAULT true,
  target_titles TEXT[] DEFAULT '{}',
  salary_min INT,
  salary_max INT,
  schedule_preferences TEXT[] DEFAULT '{}',
  employment_types TEXT[] DEFAULT '{}',
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Experiences table
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  description_raw TEXT,
  bullet_points TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education table
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  school_name TEXT NOT NULL,
  degree TEXT,
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technical', 'soft', 'certification', 'tool', 'language')),
  proficiency TEXT CHECK (proficiency IN ('beginner', 'intermediate', 'advanced', 'expert')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Resume profiles table
CREATE TABLE resume_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  summary TEXT,
  headline TEXT,
  sections JSONB DEFAULT '{}',
  is_master BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job posts table
CREATE TABLE job_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  is_remote BOOLEAN DEFAULT false,
  salary_min INT,
  salary_max INT,
  description TEXT NOT NULL,
  keywords TEXT[] DEFAULT '{}',
  source_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Job matches table
CREATE TABLE job_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_post_id UUID REFERENCES job_posts(id) ON DELETE CASCADE NOT NULL,
  resume_profile_id UUID REFERENCES resume_profiles(id) ON DELETE CASCADE NOT NULL,
  match_score INT NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
  matched_keywords TEXT[] DEFAULT '{}',
  missing_keywords TEXT[] DEFAULT '{}',
  analysis_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_post_id, resume_profile_id)
);

-- Tailored resumes table
CREATE TABLE tailored_resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_post_id UUID REFERENCES job_posts(id) ON DELETE CASCADE NOT NULL,
  resume_profile_id UUID REFERENCES resume_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  rendered_preview_html TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  job_post_id UUID REFERENCES job_posts(id) ON DELETE CASCADE NOT NULL,
  tailored_resume_id UUID REFERENCES tailored_resumes(id) ON DELETE SET NULL,
  date_applied DATE,
  status TEXT NOT NULL CHECK (status IN ('saved', 'applied', 'interviewing', 'offered', 'rejected', 'ghosted', 'withdrawn')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_experiences_profile_id ON experiences(profile_id);
CREATE INDEX idx_education_profile_id ON education(profile_id);
CREATE INDEX idx_skills_profile_id ON skills(profile_id);
CREATE INDEX idx_resume_profiles_profile_id ON resume_profiles(profile_id);
CREATE INDEX idx_job_posts_user_id ON job_posts(user_id);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE tailored_resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Experiences policies
CREATE POLICY "Users can view own experiences" ON experiences
  FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own experiences" ON experiences
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own experiences" ON experiences
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own experiences" ON experiences
  FOR DELETE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Education policies
CREATE POLICY "Users can view own education" ON education
  FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own education" ON education
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own education" ON education
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own education" ON education
  FOR DELETE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Skills policies
CREATE POLICY "Users can view own skills" ON skills
  FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own skills" ON skills
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own skills" ON skills
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own skills" ON skills
  FOR DELETE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Resume profiles policies
CREATE POLICY "Users can view own resume profiles" ON resume_profiles
  FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can insert own resume profiles" ON resume_profiles
  FOR INSERT WITH CHECK (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update own resume profiles" ON resume_profiles
  FOR UPDATE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can delete own resume profiles" ON resume_profiles
  FOR DELETE USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

-- Job posts policies
CREATE POLICY "Users can view own job posts" ON job_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own job posts" ON job_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own job posts" ON job_posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own job posts" ON job_posts
  FOR DELETE USING (auth.uid() = user_id);

-- Applications policies
CREATE POLICY "Users can view own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications" ON applications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications" ON applications
  FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resume_profiles_updated_at BEFORE UPDATE ON resume_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_posts_updated_at BEFORE UPDATE ON job_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
