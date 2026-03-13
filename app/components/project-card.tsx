"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Folder, ArrowRight } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="hover:shadow-md transition cursor-pointer h-full flex flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <Folder className="text-accent" size={28} />
            <ArrowRight className="text-muted-foreground" size={20} />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="text-lg mb-2 line-clamp-2">{project.name}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description || "No description"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
