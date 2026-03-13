import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { generateId } from "@/lib/utils"
import type { ApiResponse, Task } from "@/lib/types"

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Task[]>>> {
  try {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")

    const db = getDb()
    let query = "SELECT * FROM tasks WHERE 1=1"
    const params: string[] = []

    if (projectId) {
      query += " AND project_id = ?"
      params.push(projectId)
    }

    if (status) {
      query += " AND status = ?"
      params.push(status)
    }

    query += " ORDER BY created_at DESC"

    const tasks = db.prepare(query).all(...params) as Task[]

    return NextResponse.json({ success: true, data: tasks })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch tasks" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Task>>> {
  try {
    const body = await request.json()
    const { project_id, title, description, assigned_to, due_date, created_by } = body

    if (!project_id || !title || !created_by) {
      return NextResponse.json(
        { success: false, error: "project_id, title, and created_by are required" },
        { status: 400 }
      )
    }

    const db = getDb()
    const id = generateId()
    const now = new Date().toISOString()

    db.prepare(
      "INSERT INTO tasks (id, project_id, title, description, assigned_to, due_date, created_by, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(id, project_id, title, description || null, assigned_to || null, due_date || null, created_by, now, now)

    const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Task

    return NextResponse.json({ success: true, data: task }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create task" },
      { status: 500 }
    )
  }
}
