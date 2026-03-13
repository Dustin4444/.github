"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    appName: "Project Management System",
    maxUsersPerTeam: 50,
    sessionTimeout: 24,
    emailNotifications: true,
    maintenanceMode: false,
  })

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">System configuration and preferences</p>
          </div>

          {/* General Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Application Name</label>
                <Input
                  value={settings.appName}
                  onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                  placeholder="App name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Max Users Per Team</label>
                <Input
                  type="number"
                  value={settings.maxUsersPerTeam}
                  onChange={(e) => setSettings({ ...settings, maxUsersPerTeam: parseInt(e.target.value) })}
                  placeholder="50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Session Timeout (hours)</label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                  placeholder="24"
                />
              </div>
            </CardContent>
          </Card>

          {/* Feature Toggles */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Enable email notifications for users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Disable access for non-admin users</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="w-5 h-5 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Database Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Database</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Type:</span> SQLite
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Location:</span> ./data/database.db
                </p>
                <Button variant="outline" className="mt-4">Backup Database</Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="gap-2">
              <Save size={20} />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
