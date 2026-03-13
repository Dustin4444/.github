export type User = {
  id: string
  name: string
  email: string
  role: "admin" | "member"
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  name: string
  description: string | null
  status: "active" | "archived"
  owner_id: string
  created_at: string
  updated_at: string
}

export type Team = {
  id: string
  name: string
  project_id: string
  created_at: string
}

export type TeamMember = {
  id: string
  team_id: string
  user_id: string
  role: "lead" | "member"
  joined_at: string
}

export type Task = {
  id: string
  project_id: string
  title: string
  description: string | null
  status: "todo" | "in_progress" | "done"
  priority: "low" | "medium" | "high"
  assigned_to: string | null
  due_date: string | null
  created_by: string
  created_at: string
  updated_at: string
}

export type Comment = {
  id: string
  task_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}
