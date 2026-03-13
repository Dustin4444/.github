"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

interface SecurityLog {
  id: string
  action: string
  user: string
  timestamp: string
  status: "success" | "failed"
}

export default function SecurityPage() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false)

  const securityLogs: SecurityLog[] = [
    { id: "1", action: "Login attempt", user: "john@example.com", timestamp: "2024-03-13 14:22", status: "success" },
    { id: "2", action: "Failed login", user: "unknown", timestamp: "2024-03-13 14:15", status: "failed" },
    { id: "3", action: "Settings modified", user: "admin@example.com", timestamp: "2024-03-13 13:45", status: "success" },
    { id: "4", action: "User deleted", user: "admin@example.com", timestamp: "2024-03-13 13:20", status: "success" },
  ]

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">Security</h1>
            <p className="text-muted-foreground">Manage security settings and access control</p>
          </div>

          {/* Security Alert */}
          <Card className="mb-6 border-amber-500 bg-amber-50 dark:bg-amber-950">
            <CardContent className="pt-6 flex items-start gap-4">
              <AlertCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">Security Notice</p>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  Keep your API keys and credentials secure. Never share them with unauthorized users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Key Management */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} />
                API Key Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Production API Key</label>
                  <div className="flex gap-2">
                    <input
                      type={apiKeyVisible ? "text" : "password"}
                      value="sk_prod_1234567890abcdef"
                      readOnly
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setApiKeyVisible(!apiKeyVisible)}
                    >
                      {apiKeyVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline">Regenerate Key</Button>
                  <Button variant="outline">Copy Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Log */}
          <Card>
            <CardHeader>
              <CardTitle>Security Audit Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityLogs.map((log) => (
                  <div key={log.id} className="p-3 border border-secondary rounded-md flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{log.action}</p>
                      <p className="text-sm text-muted-foreground">
                        {log.user} • {log.timestamp}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        log.status === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
