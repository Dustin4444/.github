"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Edit2, Search } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  status: "active" | "inactive"
  joinDate: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-03-10",
    },
    {
      id: "4",
      name: "Alice Brown",
      email: "alice@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-01-05",
    },
    {
      id: "5",
      name: "Charlie Wilson",
      email: "charlie@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-03-22",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" as const })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: String(users.length + 1),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      }
      setUsers([...users, user])
      setNewUser({ name: "", email: "", role: "user" })
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
              <p className="text-muted-foreground">Manage system users and permissions</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus size={20} />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="w-96">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <DialogBody className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <Input
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="user@example.com"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as "admin" | "user" })}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={addUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "outline"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteUser(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  )
}
