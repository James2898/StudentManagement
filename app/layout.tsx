import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { MobileNav } from "@/components/mobile-nav"

export const metadata: Metadata = {
  title: "EduManage - Student Management System",
  description: "Professional student management system for teachers",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            {/* Desktop Sidebar - hidden on mobile */}
            <div className="hidden md:block">
              <AppSidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Mobile Navigation - shown only on mobile */}
              <MobileNav />

              {/* Page Content */}
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
