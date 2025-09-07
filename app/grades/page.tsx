"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Download, Upload, TrendingUp, TrendingDown, Edit } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

// Mock data
const assignments = [
  {
    id: 1,
    name: "Math Quiz #3",
    subject: "Mathematics",
    class: "10A",
    dueDate: "2024-01-15",
    totalPoints: 100,
    avgScore: 88,
    graded: 25,
    total: 28,
    type: "Quiz",
  },
  {
    id: 2,
    name: "Shakespeare Essay",
    subject: "English Literature",
    class: "10B",
    dueDate: "2024-01-12",
    totalPoints: 100,
    avgScore: 92,
    graded: 30,
    total: 30,
    type: "Essay",
  },
  {
    id: 3,
    name: "Science Lab Report",
    subject: "Science",
    class: "11A",
    dueDate: "2024-01-10",
    totalPoints: 50,
    avgScore: 42,
    graded: 22,
    total: 25,
    type: "Lab",
  },
]

const gradeDistribution = [
  { grade: "A", count: 45, percentage: 35 },
  { grade: "B", count: 38, percentage: 30 },
  { grade: "C", count: 25, percentage: 20 },
  { grade: "D", count: 12, percentage: 10 },
  { grade: "F", count: 6, percentage: 5 },
]

const subjectPerformance = [
  { subject: "Mathematics", average: 88, trend: "up" },
  { subject: "English", average: 92, trend: "up" },
  { subject: "Science", average: 85, trend: "stable" },
  { subject: "History", average: 89, trend: "up" },
  { subject: "PE", average: 95, trend: "stable" },
]

const recentGrades = [
  { student: "Emma Johnson", assignment: "Math Quiz #3", grade: "A-", score: 88, class: "10A", date: "2024-01-15" },
  { student: "Michael Chen", assignment: "Shakespeare Essay", grade: "A", score: 94, class: "10B", date: "2024-01-12" },
  { student: "Sarah Williams", assignment: "Science Lab", grade: "B+", score: 87, class: "11A", date: "2024-01-10" },
  { student: "David Rodriguez", assignment: "Math Quiz #3", grade: "B", score: 82, class: "10A", date: "2024-01-15" },
  {
    student: "Lisa Thompson",
    assignment: "Shakespeare Essay",
    grade: "A+",
    score: 98,
    class: "10B",
    date: "2024-01-12",
  },
]

const COLORS = ["#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]

export default function GradesPage() {
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false)

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-primary"
    if (score >= 80) return "text-secondary"
    if (score >= 70) return "text-yellow-600"
    return "text-destructive"
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-primary" />
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />
    return <div className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">Grade Management</h1>
          <p className="text-muted-foreground text-pretty">
            Track assignments, enter grades, and analyze student performance.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Grades
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Dialog open={isAddAssignmentOpen} onOpenChange={setIsAddAssignmentOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Assignment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
                <DialogDescription>Add a new assignment to track student grades.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="assignment-name">Assignment Name</Label>
                  <Input id="assignment-name" placeholder="Enter assignment name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="english">English Literature</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10a">Grade 10A</SelectItem>
                        <SelectItem value="10b">Grade 10B</SelectItem>
                        <SelectItem value="11a">Grade 11A</SelectItem>
                        <SelectItem value="11b">Grade 11B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-points">Total Points</Label>
                    <Input id="total-points" type="number" placeholder="100" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Assignment description (optional)" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddAssignmentOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddAssignmentOpen(false)}>Create Assignment</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.reduce((acc, a) => acc + (a.total - a.graded), 0)}</div>
            <p className="text-xs text-muted-foreground">Need grading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">All subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">A & B grades</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger
            value="assignments"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all"
          >
            Assignments
          </TabsTrigger>
          <TabsTrigger
            value="gradebook"
            className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Gradebook
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Recent Grades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assignments" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Overview</CardTitle>
              <CardDescription>Manage and track all assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="10a">Grade 10A</SelectItem>
                    <SelectItem value="10b">Grade 10B</SelectItem>
                    <SelectItem value="11a">Grade 11A</SelectItem>
                    <SelectItem value="11b">Grade 11B</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English Literature</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{assignment.name}</h3>
                            <Badge variant="outline">{assignment.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{assignment.subject}</span>
                            <span>•</span>
                            <span>Class {assignment.class}</span>
                            <span>•</span>
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {assignment.graded}/{assignment.total} graded
                            </div>
                            <div className="text-xs text-muted-foreground">Avg: {assignment.avgScore}%</div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Grade
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gradebook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Gradebook</CardTitle>
              <CardDescription>View and edit grades for all students</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Math Quiz #3</TableHead>
                    <TableHead>Shakespeare Essay</TableHead>
                    <TableHead>Science Lab</TableHead>
                    <TableHead>Overall GPA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Emma Johnson</TableCell>
                    <TableCell>
                      <Badge className="bg-primary text-primary-foreground">A-</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary text-primary-foreground">A</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-secondary text-secondary-foreground">B+</Badge>
                    </TableCell>
                    <TableCell className="font-medium">3.8</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Michael Chen</TableCell>
                    <TableCell>
                      <Badge className="bg-primary text-primary-foreground">A</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary text-primary-foreground">A+</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-secondary text-secondary-foreground">B</Badge>
                    </TableCell>
                    <TableCell className="font-medium">3.9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Williams</TableCell>
                    <TableCell>
                      <Badge className="bg-secondary text-secondary-foreground">B+</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary text-primary-foreground">A-</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-secondary text-secondary-foreground">B+</Badge>
                    </TableCell>
                    <TableCell className="font-medium">3.7</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall grade distribution across all classes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average performance by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="average" fill="#059669" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subject Trends</CardTitle>
              <CardDescription>Performance trends across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectPerformance.map((subject) => (
                  <div key={subject.subject} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{subject.subject}</span>
                      {getTrendIcon(subject.trend)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${getGradeColor(subject.average)}`}>{subject.average}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Latest graded assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentGrades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{grade.student}</TableCell>
                      <TableCell>{grade.assignment}</TableCell>
                      <TableCell>{grade.class}</TableCell>
                      <TableCell>
                        <Badge className={getGradeColor(grade.score)}>{grade.grade}</Badge>
                      </TableCell>
                      <TableCell>{grade.score}%</TableCell>
                      <TableCell>{new Date(grade.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
