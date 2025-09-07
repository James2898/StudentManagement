"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Clock, TrendingUp, Calendar, Plus, MoreHorizontal, Bell, FileText, UserPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const classes = [
  {
    id: 1,
    name: "Mathematics 10A",
    subject: "Mathematics",
    grade: "10A",
    students: 28,
    schedule: "Mon, Wed, Fri - 9:00 AM",
    room: "Room 201",
    avgGrade: 87,
    attendance: 94,
    nextClass: "2024-01-16T09:00:00",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "English Literature 10B",
    subject: "English Literature",
    grade: "10B",
    students: 30,
    schedule: "Tue, Thu - 10:30 AM",
    room: "Room 105",
    avgGrade: 92,
    attendance: 96,
    nextClass: "2024-01-16T10:30:00",
    color: "bg-secondary",
  },
  {
    id: 3,
    name: "Science 11A",
    subject: "Science",
    grade: "11A",
    students: 25,
    schedule: "Mon, Wed, Fri - 2:00 PM",
    room: "Lab 301",
    avgGrade: 85,
    attendance: 88,
    nextClass: "2024-01-15T14:00:00",
    color: "bg-accent",
  },
  {
    id: 4,
    name: "History 11B",
    subject: "History",
    grade: "11B",
    students: 27,
    schedule: "Tue, Thu - 1:00 PM",
    room: "Room 203",
    avgGrade: 89,
    attendance: 91,
    nextClass: "2024-01-16T13:00:00",
    color: "bg-chart-3",
  },
]

const classStudents = [
  {
    id: 1,
    name: "Emma Johnson",
    avatar: "/diverse-student-girl.png",
    grade: "A-",
    attendance: 95,
    lastActive: "2024-01-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/student-boy.png",
    grade: "A",
    attendance: 92,
    lastActive: "2024-01-15",
  },
  {
    id: 3,
    name: "Sarah Williams",
    avatar: "/student-girl-2.png",
    grade: "B+",
    attendance: 88,
    lastActive: "2024-01-14",
  },
  {
    id: 4,
    name: "David Rodriguez",
    avatar: "/student-boy-2.png",
    grade: "B",
    attendance: 90,
    lastActive: "2024-01-15",
  },
]

const upcomingClasses = [
  {
    class: "Mathematics 10A",
    time: "9:00 AM",
    room: "Room 201",
    topic: "Quadratic Equations",
    date: "Today",
  },
  {
    class: "English Literature 10B",
    time: "10:30 AM",
    room: "Room 105",
    topic: "Shakespeare Analysis",
    date: "Today",
  },
  {
    class: "History 11B",
    time: "1:00 PM",
    room: "Room 203",
    topic: "World War II",
    date: "Today",
  },
  {
    class: "Science 11A",
    time: "2:00 PM",
    room: "Lab 301",
    topic: "Chemical Reactions",
    date: "Tomorrow",
  },
]

const announcements = [
  {
    id: 1,
    class: "Mathematics 10A",
    title: "Quiz Next Week",
    message: "There will be a quiz on quadratic equations next Friday. Please review chapters 5-6.",
    date: "2024-01-15",
    urgent: false,
  },
  {
    id: 2,
    class: "English Literature 10B",
    title: "Essay Due Date Extended",
    message: "The Shakespeare essay due date has been extended to next Wednesday.",
    date: "2024-01-14",
    urgent: true,
  },
  {
    id: 3,
    class: "Science 11A",
    title: "Lab Safety Reminder",
    message: "Please remember to bring safety goggles for tomorrow's chemistry lab.",
    date: "2024-01-14",
    urgent: false,
  },
]

export default function ClassesPage() {
  const [selectedClass, setSelectedClass] = useState(classes[0])
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false)

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-primary"
    if (grade >= 80) return "text-secondary"
    if (grade >= 70) return "text-yellow-600"
    return "text-destructive"
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return "text-primary"
    if (attendance >= 85) return "text-secondary"
    return "text-destructive"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Class Management</h1>
          <p className="text-muted-foreground text-pretty">
            Manage your classes, track attendance, and communicate with students.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAnnouncementOpen} onOpenChange={setIsAnnouncementOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Bell className="mr-2 h-4 w-4" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Announcement</DialogTitle>
                <DialogDescription>Send an announcement to your class.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="class-select">Class</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id.toString()}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Announcement title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your announcement message" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAnnouncementOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAnnouncementOpen(false)}>Send Announcement</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Class
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Active this semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.reduce((acc, cls) => acc + cls.students, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Class Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(classes.reduce((acc, cls) => acc + cls.students, 0) / classes.length)}
            </div>
            <p className="text-xs text-muted-foreground">Students per class</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(classes.reduce((acc, cls) => acc + cls.attendance, 0) / classes.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average across classes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Class List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Your Classes</CardTitle>
              <CardDescription>Select a class to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {classes.map((cls) => (
                <Card
                  key={cls.id}
                  className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedClass.id === cls.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedClass(cls)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${cls.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{cls.name}</p>
                        <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{cls.students}</p>
                        <p className="text-xs text-muted-foreground">students</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Class Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedClass.name}</CardTitle>
                  <CardDescription>
                    {selectedClass.room} • {selectedClass.schedule}
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add Student
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Class Report
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Class</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Students</span>
                        </div>
                        <div className="text-2xl font-bold">{selectedClass.students}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Avg Grade</span>
                        </div>
                        <div className={`text-2xl font-bold ${getGradeColor(selectedClass.avgGrade)}`}>
                          {selectedClass.avgGrade}%
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Attendance</span>
                        </div>
                        <div className={`text-2xl font-bold ${getAttendanceColor(selectedClass.attendance)}`}>
                          {selectedClass.attendance}%
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Class Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Average Grade</span>
                            <span className="text-sm text-muted-foreground">{selectedClass.avgGrade}%</span>
                          </div>
                          <Progress value={selectedClass.avgGrade} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Attendance Rate</span>
                            <span className="text-sm text-muted-foreground">{selectedClass.attendance}%</span>
                          </div>
                          <Progress value={selectedClass.attendance} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="students" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {classStudents.map((student) => (
                      <Card key={student.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                              <AvatarFallback>
                                {student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Last active: {new Date(student.lastActive).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getGradeColor(85)}>{student.grade}</Badge>
                              <p className="text-xs text-muted-foreground mt-1">{student.attendance}% attendance</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="schedule" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Classes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingClasses
                          .filter((cls) => cls.class === selectedClass.name)
                          .map((cls, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between border-b pb-4 last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col items-center">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">{cls.date}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{cls.topic}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {cls.time} • {cls.room}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription>Latest announcements across all classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="flex items-start gap-3 border-b pb-4 last:border-b-0">
                <div className={`mt-1 h-2 w-2 rounded-full ${announcement.urgent ? "bg-destructive" : "bg-primary"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{announcement.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {announcement.class}
                    </Badge>
                    {announcement.urgent && <Badge variant="destructive">Urgent</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 text-pretty">{announcement.message}</p>
                  <p className="text-xs text-muted-foreground">{new Date(announcement.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
