import { NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { generateId } from "@/lib/utils"
import type { ApiResponse, Project } from "@/lib/types"

export async function GET(): Promise<NextResponse<ApiResponse<Project[]>>> {
  try {
    const db = getDb()
    const projects = db
      .prepare("SELECT * FROM projects WHERE status = 'active' ORDER BY created_at DESC")
      .all() as Project[]

    return NextResponse.json({ success: true, data: projects })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Project>>> {
  try {
    const body = await request.json()
    const { name, description, owner_id } = body

    if (!name || !owner_id) {
      return NextResponse.json(
        { success: false, error: "Name and owner_id are required" },
        { status: 400 }
      )
    }

    const db = getDb()
    const id = generateId()
    const now = new Date().toISOString()

    db.prepare(
      "INSERT INTO projects (id, name, description, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(id, name, description || null, owner_id, now, now)

    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as Project

    return NextResponse.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    )
  }
}
