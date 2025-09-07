"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock student data - in real app this would come from API/database
const studentData = {
  id: 1,
  name: "Emma Johnson",
  email: "emma.johnson@school.edu",
  phone: "(555) 123-4567",
  address: "123 Oak Street, Springfield, IL 62701",
  dateOfBirth: "2008-03-15",
  grade: "10A",
  studentId: "STU-2024-001",
  gpa: 3.8,
  attendance: 95,
  status: "active",
  avatar: "/diverse-student-girl.png",
  parentContact: {
    name: "Jennifer Johnson",
    phone: "(555) 123-4568",
    email: "jennifer.johnson@email.com",
    relationship: "Mother",
  },
  subjects: [
    { name: "Mathematics", grade: "A-", percentage: 88, trend: "up" },
    { name: "English Literature", grade: "A", percentage: 92, trend: "up" },
    { name: "Science", grade: "B+", percentage: 85, trend: "stable" },
    { name: "History", grade: "A-", percentage: 89, trend: "up" },
    { name: "Physical Education", grade: "A", percentage: 95, trend: "stable" },
  ],
  recentGrades: [
    { assignment: "Math Quiz #3", subject: "Mathematics", grade: "A-", date: "2024-01-15", percentage: 88 },
    { assignment: "Essay: Shakespeare", subject: "English Literature", grade: "A", date: "2024-01-12", percentage: 94 },
    { assignment: "Science Lab Report", subject: "Science", grade: "B+", date: "2024-01-10", percentage: 87 },
    { assignment: "History Project", subject: "History", grade: "A", date: "2024-01-08", percentage: 91 },
  ],
  attendanceRecord: [
    { date: "2024-01-15", status: "present" },
    { date: "2024-01-14", status: "present" },
    { date: "2024-01-13", status: "absent" },
    { date: "2024-01-12", status: "present" },
    { date: "2024-01-11", status: "present" },
    { date: "2024-01-10", status: "late" },
    { date: "2024-01-09", status: "present" },
  ],
  notes: [
    {
      date: "2024-01-10",
      teacher: "Ms. Smith",
      subject: "Mathematics",
      note: "Emma showed excellent problem-solving skills in today's algebra lesson.",
    },
    {
      date: "2024-01-05",
      teacher: "Mr. Davis",
      subject: "English Literature",
      note: "Outstanding essay on Hamlet. Emma demonstrates deep understanding of the themes.",
    },
  ],
}

export default function StudentProfile({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const student = studentData // In real app, fetch by params.id

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-primary"
    if (percentage >= 80) return "text-secondary"
    if (percentage >= 70) return "text-yellow-600"
    return "text-destructive"
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-primary" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />
    return <div className="h-4 w-4" />
  }

  const getAttendanceColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-primary"
      case "late":
        return "bg-yellow-500"
      case "absent":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <a href="/students">
            <ArrowLeft className="h-4 w-4" />
          </a>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Student Profile</h1>
          <p className="text-muted-foreground text-pretty">Detailed information and academic progress</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit Student
            </DropdownMenuItem>
            <DropdownMenuItem>Send Message</DropdownMenuItem>
            <DropdownMenuItem>Generate Report</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Remove Student</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                <AvatarFallback className="text-lg">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Badge className="w-fit">{student.status}</Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-muted-foreground">Student ID: {student.studentId}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>Grade: {student.grade}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{student.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.phone}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Born: {new Date(student.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-pretty">{student.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:items-end">
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold">GPA: {student.gpa}</div>
                <div className="text-sm text-muted-foreground">Current Semester</div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-2xl font-bold">{student.attendance}%</div>
                <div className="text-sm text-muted-foreground">Attendance Rate</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Subject Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Current grades and progress across all subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {student.subjects.map((subject) => (
                <div key={subject.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{subject.name}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={subject.percentage} className="w-24" />
                        <span className="text-sm text-muted-foreground">{subject.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(subject.trend)}
                    <Badge variant="outline" className={getGradeColor(subject.percentage)}>
                      {subject.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Parent Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-medium">{student.parentContact.name}</p>
                <p className="text-sm text-muted-foreground">{student.parentContact.relationship}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{student.parentContact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{student.parentContact.email}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
              <CardDescription>Latest graded assignments and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.recentGrades.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                    <div>
                      <p className="font-medium">{grade.assignment}</p>
                      <p className="text-sm text-muted-foreground">{grade.subject}</p>
                      <p className="text-xs text-muted-foreground">{new Date(grade.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getGradeColor(grade.percentage)}>{grade.grade}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{grade.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Record</CardTitle>
              <CardDescription>Recent attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-7">
                {student.attendanceRecord.map((record, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 p-2 rounded-lg border">
                    <div className="text-xs text-muted-foreground">
                      {new Date(record.date).toLocaleDateString("en-US", { weekday: "short" })}
                    </div>
                    <div className="text-sm font-medium">{new Date(record.date).getDate()}</div>
                    <div className={`h-3 w-3 rounded-full ${getAttendanceColor(record.status)}`} />
                    <div className="text-xs capitalize">{record.status}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span>Present</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span>Late</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <span>Absent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Notes</CardTitle>
              <CardDescription>Comments and observations from teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.notes.map((note, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{note.teacher}</p>
                      <p className="text-sm text-muted-foreground">{new Date(note.date).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{note.subject}</p>
                    <p className="text-sm text-pretty">{note.note}</p>
                  </div>
                ))}
              </div>
              <Button className="mt-4 bg-transparent" variant="outline">
                Add Note
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
