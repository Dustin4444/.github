import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Calendar } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Project Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Organize projects, manage tasks, and collaborate with your team
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Go to Dashboard <ArrowRight size={20} />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-background p-6 rounded-lg border border-secondary">
            <CheckCircle className="text-accent mb-4" size={28} />
            <h3 className="text-lg font-semibold mb-2">Task Management</h3>
            <p className="text-muted-foreground">
              Create, assign, and track tasks across your projects
            </p>
          </div>

          <div className="bg-background p-6 rounded-lg border border-secondary">
            <Users className="text-accent mb-4" size={28} />
            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground">
              Work together with comments and real-time updates
            </p>
          </div>

          <div className="bg-background p-6 rounded-lg border border-secondary">
            <Calendar className="text-accent mb-4" size={28} />
            <h3 className="text-lg font-semibold mb-2">Timeline Tracking</h3>
            <p className="text-muted-foreground">
              Monitor project progress and deadlines
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
