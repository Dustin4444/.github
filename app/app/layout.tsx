import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Project Management System",
  description: "A comprehensive platform to manage projects, tasks, and teams",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
