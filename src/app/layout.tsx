
"use client";

import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

import {
  Book,
  Code,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const fontBody = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

// export const metadata: Metadata = {
//   title: 'ReactReady',
//   description: 'Your Interview Prep Companion for React & React Native',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname === '/onboarding') {
    return (
      <html lang="en" className="dark">
         <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
        </head>
        <body className={cn("font-body antialiased", fontBody.variable, fontCode.variable)}>
          <main className="p-4">{children}</main>
          <Toaster />
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="dark">
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", fontBody.variable, fontCode.variable)}>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 p-2">
                <GraduationCap className="size-6 text-primary" />
                <h1 className="text-lg font-semibold">ReactReady</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/" tooltip="Dashboard">
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/practice" tooltip="Practice">
                    <Code />
                    Practice
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/mock-interviews" tooltip="Mock Interviews">
                    <MessageCircle />
                    Mock Interviews
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarGroup>
                <SidebarGroupLabel>Learn</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton href="/learn/react-fundamentals">
                      <Book />
                      React Fundamentals
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton href="/learn/advanced-react">
                      <Book />
                      Advanced React
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                   <SidebarMenuItem>
                    <SidebarMenuButton href="/learn/react-native">
                      <Book />
                      React Native
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <header className="flex h-12 items-center justify-between border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h2 className="text-lg font-semibold">Dashboard</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/settings">
                  <Button variant="ghost" size="icon">
                    <Settings />
                  </Button>
                </Link>
              </div>
            </header>
            <main className="p-4">{children}</main>
            <Toaster />
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
