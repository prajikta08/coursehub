import { createClient } from "@supabase/supabase-js";

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

// Mock fallback data used when Supabase env vars are not set
export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Advanced React Patterns",
    progress: 74,
    icon_name: "Layers",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Systems Design Fundamentals",
    progress: 42,
    icon_name: "Network",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "TypeScript Deep Dive",
    progress: 91,
    icon_name: "Code2",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Machine Learning Basics",
    progress: 28,
    icon_name: "Brain",
    created_at: new Date().toISOString(),
  },
];

export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;
  return createClient(url, key);
}

export async function fetchCourses(): Promise<{
  courses: Course[];
  error: string | null;
}> {
  const client = createServerSupabaseClient();

  if (!client) {
    // Gracefully fall back to mock data
    return { courses: MOCK_COURSES, error: null };
  }

  const { data, error } = await client
    .from("courses")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return { courses: MOCK_COURSES, error: error.message };
  }

  return { courses: (data as Course[]) ?? MOCK_COURSES, error: null };
}
