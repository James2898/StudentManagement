"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Plus, MoreHorizontal, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const styles = {
  layout: {
    container: "space-y-6",
    header: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
    headerContent: "space-y-2",
    statsGrid: "hidden md:grid gap-4 md:grid-cols-4",
    mobileStatsGrid: "grid grid-cols-2 gap-4",
    filtersContainer: "flex flex-col gap-4",
    filtersRow: "flex flex-col gap-2 sm:flex-row sm:flex-wrap",
  },
  card: {
    base: "",
    header: "pb-2",
    headerWithActions: "flex items-center justify-between",
    content: "",
    mobileOnly: "md:hidden",
    desktopOnly: "hidden md:grid gap-4 md:grid-cols-4",
    mobileStatsHeader: "pb-3",
  },
  text: {
    title: "text-3xl font-bold tracking-tight text-balance",
    subtitle: "text-muted-foreground text-pretty",
    cardTitle: "text-sm font-medium",
    cardTitleLarge: "text-lg font-semibold",
    statValue: "text-2xl font-bold",
    statLabel: "text-sm text-muted-foreground",
    description: "text-sm text-muted-foreground",
  },
  button: {
    primary: "w-fit",
    icon: "mr-2 h-4 w-4",
    ghost: "variant-ghost size-icon h-7 w-7",
    outline: "variant-outline size-sm",
  },
  input: {
    search: "pl-10",
    searchIcon: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
    searchContainer: "relative",
  },
  select: {
    trigger: "w-full sm:w-32",
    paginationTrigger: "w-32",
  },
  table: {
    container: "w-full",
    base: "text-sm w-full",
    header: "cursor-pointer hover:bg-muted/50",
    headerWithWidth: "cursor-pointer hover:bg-muted/50 w-auto",
    headerSmall: "cursor-pointer hover:bg-muted/50 w-16",
    headerMedium: "cursor-pointer hover:bg-muted/50 w-20",
    headerHidden: "hidden md:table-cell",
    headerContact: "hidden sm:table-cell w-24",
    headerActions: "w-10",
    row: "hover:bg-muted/50",
    cell: "py-1 px-2 text-xs sm:py-2 sm:px-4 sm:text-sm",
    cellHidden: "hidden md:table-cell py-1 px-2 text-xs sm:py-2 sm:px-4 sm:text-sm",
    cellContact: "text-xs text-muted-foreground py-1 px-2 hidden sm:table-cell sm:py-2 sm:px-4",
    cellSection: "py-1 px-2 text-xs sm:py-2 sm:px-4",
  },
  avatar: {
    container: "flex items-center gap-2",
    base: "h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0",
    fallback: "text-xs",
    content: "min-w-0 flex-1",
    name: "font-medium text-xs sm:text-sm truncate",
    email: "text-xs text-muted-foreground truncate sm:hidden",
  },
  badge: {
    status: "text-xs px-1 py-0.5",
    gpa: "text-xs px-1 py-0.5",
  },
  stats: {
    mobileContainer: "text-center",
    mobileValue: "text-2xl font-bold",
    mobileLabel: "text-sm text-muted-foreground",
    primaryColor: "text-primary",
    emeraldColor: "text-emerald-600",
    blueColor: "text-blue-600",
    purpleColor: "text-purple-600",
  },
  pagination: {
    container: "flex items-center justify-between pt-4",
    controls: "flex gap-2",
  },
  empty: {
    container: "flex flex-col items-center justify-center py-12",
    content: "text-center space-y-2",
    title: "text-lg font-semibold",
    description: "text-muted-foreground",
    button: "mt-4",
  },
  icons: {
    sort: "ml-2 h-4 w-4",
    action: "h-3 w-3 sm:h-4 sm:w-4",
  },
}

const students = [
  {
    id: 1,
    name: "Emma Johnson",
    email: "emma.johnson@school.edu",
    phone: "(555) 123-4567",
    grade: "10A",
    section: "Science",
    gender: "Female",
    gpa: 3.8,
    attendance: 95,
    status: "active",
    avatar: "/diverse-student-girl.png",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@school.edu",
    phone: "(555) 234-5678",
    grade: "10B",
    section: "Mathematics",
    gender: "Male",
    gpa: 3.9,
    attendance: 92,
    status: "active",
    avatar: "/student-boy.png",
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@school.edu",
    phone: "(555) 345-6789",
    grade: "11A",
    section: "Arts",
    gender: "Female",
    gpa: 3.7,
    attendance: 88,
    status: "active",
    avatar: "/student-girl-2.png",
  },
  {
    id: 4,
    name: "David Rodriguez",
    email: "david.rodriguez@school.edu",
    phone: "(555) 456-7890",
    grade: "10A",
    section: "Science",
    gender: "Male",
    gpa: 3.5,
    attendance: 90,
    status: "active",
    avatar: "/student-boy-2.png",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@school.edu",
    phone: "(555) 567-8901",
    grade: "11B",
    section: "Commerce",
    gender: "Female",
    gpa: 4.0,
    attendance: 98,
    status: "active",
    avatar: "/student-girl-3.png",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.wilson@school.edu",
    phone: "(555) 678-9012",
    grade: "10B",
    section: "Mathematics",
    gender: "Male",
    gpa: 3.2,
    attendance: 85,
    status: "inactive",
    avatar: "/student-boy-3.png",
  },
  {
    id: 7,
    name: "Maria Garcia",
    email: "maria.garcia@school.edu",
    phone: "(555) 789-0123",
    grade: "11A",
    section: "Arts",
    gender: "Female",
    gpa: 3.6,
    attendance: 93,
    status: "active",
    avatar: "/diverse-student-girl.png",
  },
  {
    id: 8,
    name: "Alex Kim",
    email: "alex.kim@school.edu",
    phone: "(555) 890-1234",
    grade: "10A",
    section: "Commerce",
    gender: "Male",
    gpa: 3.4,
    attendance: 87,
    status: "active",
    avatar: "/student-boy.png",
  },
]

type SortField = "name" | "grade" | "section" | "gpa" | "attendance"
type SortDirection = "asc" | "desc"

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [selectedSection, setSelectedSection] = useState("all")
  const [selectedGender, setSelectedGender] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = selectedGrade === "all" || student.grade === selectedGrade
    const matchesSection = selectedSection === "all" || student.section === selectedSection
    const matchesGender = selectedGender === "all" || student.gender === selectedGender
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus

    return matchesSearch && matchesGrade && matchesSection && matchesGender && matchesStatus
  })

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const totalPages = Math.ceil(sortedStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = sortedStudents.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronsUpDown className={styles.icons.sort} />
    }
    return sortDirection === "asc" ? (
      <ChevronUp className={styles.icons.sort} />
    ) : (
      <ChevronDown className={styles.icons.sort} />
    )
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return "bg-primary text-primary-foreground"
    if (gpa >= 3.0) return "bg-secondary text-secondary-foreground"
    return "bg-muted text-muted-foreground"
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return styles.stats.primaryColor
    if (attendance >= 85) return "text-secondary"
    return "text-destructive"
  }

  return (
    <div className={styles.layout.container}>
      {/* Header */}
      <div className={styles.layout.header}>
        <div className={styles.layout.headerContent}>
          <h1 className={styles.text.title}>Students</h1>
          <p className={styles.text.subtitle}>Manage and track your students' information and progress.</p>
        </div>
        <Button className={styles.button.primary}>
          <Plus className={styles.button.icon} />
          Add Student
        </Button>
      </div>

      {/* Stats Cards - Desktop */}
      <div className={styles.card.desktopOnly}>
        <Card>
          <CardHeader className={styles.card.header}>
            <CardTitle className={styles.text.cardTitle}>Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.text.statValue}>{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={styles.card.header}>
            <CardTitle className={styles.text.cardTitle}>Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.text.statValue}>{students.filter((s) => s.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={styles.card.header}>
            <CardTitle className={styles.text.cardTitle}>Average GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.text.statValue}>
              {(students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(1)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className={styles.card.header}>
            <CardTitle className={styles.text.cardTitle}>Avg Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.text.statValue}>
              {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Summary Card - Mobile */}
      <Card className={styles.card.mobileOnly}>
        <CardHeader className={styles.card.mobileStatsHeader}>
          <CardTitle className={styles.text.cardTitleLarge}>Student Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.layout.mobileStatsGrid}>
            <div className={styles.stats.mobileContainer}>
              <div className={`${styles.stats.mobileValue} ${styles.stats.primaryColor}`}>{students.length}</div>
              <div className={styles.stats.mobileLabel}>Total Students</div>
            </div>
            <div className={styles.stats.mobileContainer}>
              <div className={`${styles.stats.mobileValue} ${styles.stats.emeraldColor}`}>
                {students.filter((s) => s.status === "active").length}
              </div>
              <div className={styles.stats.mobileLabel}>Active Students</div>
            </div>
            <div className={styles.stats.mobileContainer}>
              <div className={`${styles.stats.mobileValue} ${styles.stats.blueColor}`}>
                {(students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(1)}
              </div>
              <div className={styles.stats.mobileLabel}>Average GPA</div>
            </div>
            <div className={styles.stats.mobileContainer}>
              <div className={`${styles.stats.mobileValue} ${styles.stats.purpleColor}`}>
                {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
              </div>
              <div className={styles.stats.mobileLabel}>Avg Attendance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Student Directory</CardTitle>
          <CardDescription>Search and filter students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={styles.layout.filtersContainer}>
            <div className={styles.input.searchContainer}>
              <Search className={styles.input.searchIcon} />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.input.search}
              />
            </div>
            <div className={styles.layout.filtersRow}>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className={styles.select.trigger}>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="10A">Grade 10A</SelectItem>
                  <SelectItem value="10B">Grade 10B</SelectItem>
                  <SelectItem value="11A">Grade 11A</SelectItem>
                  <SelectItem value="11B">Grade 11B</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className={styles.select.trigger}>
                  <SelectValue placeholder="Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Commerce">Commerce</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className={styles.select.trigger}>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className={styles.select.trigger}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className={styles.card.headerWithActions}>
            <div>
              <CardTitle>Students ({sortedStudents.length})</CardTitle>
              <CardDescription>
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedStudents.length)} of{" "}
                {sortedStudents.length} students
              </CardDescription>
            </div>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className={styles.select.paginationTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className={styles.table.container}>
            <Table className={styles.table.base}>
              <TableHeader>
                <TableRow>
                  <TableHead className={styles.table.headerWithWidth} onClick={() => handleSort("name")}>
                    <div className={styles.avatar.container}>
                      Student
                      <SortIcon field="name" />
                    </div>
                  </TableHead>
                  <TableHead className={styles.table.headerSmall} onClick={() => handleSort("grade")}>
                    <div className={styles.avatar.container}>
                      Grade
                      <SortIcon field="grade" />
                    </div>
                  </TableHead>
                  <TableHead className={styles.table.headerMedium} onClick={() => handleSort("section")}>
                    <div className={styles.avatar.container}>
                      Section
                      <SortIcon field="section" />
                    </div>
                  </TableHead>
                  <TableHead className={styles.table.headerHidden}>Gender</TableHead>
                  <TableHead
                    className={`${styles.table.header} ${styles.table.headerHidden}`}
                    onClick={() => handleSort("gpa")}
                  >
                    <div className={styles.avatar.container}>
                      GPA
                      <SortIcon field="gpa" />
                    </div>
                  </TableHead>
                  <TableHead
                    className={`${styles.table.header} ${styles.table.headerHidden}`}
                    onClick={() => handleSort("attendance")}
                  >
                    <div className={styles.avatar.container}>
                      Attendance
                      <SortIcon field="attendance" />
                    </div>
                  </TableHead>
                  <TableHead className={styles.table.headerSmall}>Status</TableHead>
                  <TableHead className={styles.table.headerContact}>Contact</TableHead>
                  <TableHead className={styles.table.headerActions}></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStudents.map((student) => (
                  <TableRow key={student.id} className={styles.table.row}>
                    <TableCell className={styles.table.cell}>
                      <div className={styles.avatar.container}>
                        <Avatar className={styles.avatar.base}>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback className={styles.avatar.fallback}>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className={styles.avatar.content}>
                          <div className={styles.avatar.name}>{student.name}</div>
                          <div className={styles.avatar.email}>{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className={`font-medium ${styles.table.cell}`}>{student.grade}</TableCell>
                    <TableCell className={styles.table.cellSection}>{student.section}</TableCell>
                    <TableCell className={styles.table.cellHidden}>{student.gender}</TableCell>
                    <TableCell className={styles.table.cellHidden}>
                      <Badge className={`${styles.badge.gpa} ${getGPAColor(student.gpa)}`}>{student.gpa}</Badge>
                    </TableCell>
                    <TableCell className={styles.table.cellHidden}>
                      <span className={`font-medium text-sm ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell className={styles.table.cell}>
                      <Badge
                        variant={student.status === "active" ? "default" : "secondary"}
                        className={styles.badge.status}
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell className={styles.table.cellContact}>{student.phone}</TableCell>
                    <TableCell className={styles.table.cell}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7">
                            <MoreHorizontal className={styles.icons.action} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <a href={`/students/${student.id}`}>View Profile</a>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Student</DropdownMenuItem>
                          <DropdownMenuItem>View Grades</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove Student</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination.container}>
              <div className={styles.text.description}>
                Page {currentPage} of {totalPages}
              </div>
              <div className={styles.pagination.controls}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {sortedStudents.length === 0 && (
            <div className={styles.empty.container}>
              <div className={styles.empty.content}>
                <h3 className={styles.empty.title}>No students found</h3>
                <p className={styles.empty.description}>Try adjusting your search criteria or add a new student.</p>
                <Button className={styles.empty.button}>
                  <Plus className={styles.button.icon} />
                  Add Student
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
