import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, BarChart3, TrendingUp } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-balance">Dashboard</h1>
        <p className="text-muted-foreground text-pretty">
          Welcome back! Here's an overview of your classes and students.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+12% from last semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across 3 subjects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">85.2% class average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Latest assignments graded</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Math Quiz #3</p>
                <p className="text-sm text-muted-foreground">Grade 10A</p>
              </div>
              <div className="text-right">
                <p className="font-medium">87%</p>
                <p className="text-sm text-muted-foreground">Class avg</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Science Project</p>
                <p className="text-sm text-muted-foreground">Grade 10B</p>
              </div>
              <div className="text-right">
                <p className="font-medium">92%</p>
                <p className="text-sm text-muted-foreground">Class avg</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">History Essay</p>
                <p className="text-sm text-muted-foreground">Grade 11A</p>
              </div>
              <div className="text-right">
                <p className="font-medium">78%</p>
                <p className="text-sm text-muted-foreground">Class avg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Things that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-destructive"></div>
              <div>
                <p className="font-medium">Grade Math Test</p>
                <p className="text-sm text-muted-foreground">Due tomorrow</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <div>
                <p className="font-medium">Parent-Teacher Conference</p>
                <p className="text-sm text-muted-foreground">Friday 2:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-accent"></div>
              <div>
                <p className="font-medium">Update Student Records</p>
                <p className="text-sm text-muted-foreground">End of week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
