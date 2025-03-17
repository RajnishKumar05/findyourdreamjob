"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Briefcase,
  Home,
  User,
  FileText,
  Building,
  PenTool,
  MessageSquare
} from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      employerOnly: false,
      employeeOnly: false,
    },
    {
      href: "/dashboard/profile",
      label: "My Profile",
      icon: <User className="h-5 w-5" />,
      employerOnly: false,
      employeeOnly: false,
    },
    {
      href: "/dashboard/resume-builder",
      label: "Resume Builder",
      icon: <FileText className="h-5 w-5" />,
      employerOnly: false,
      employeeOnly: true,
    },
    {
      href: "/dashboard/jobs",
      label: "Find Jobs",
      icon: <Briefcase className="h-5 w-5" />,
      employerOnly: false,
      employeeOnly: true,
    },
    {
      href: "/dashboard/applications",
      label: "My Applications",
      icon: <FileText className="h-5 w-5" />,
      employerOnly: false,
      employeeOnly: true,
    },
    {
      href: "/dashboard/company",
      label: "Company Profile",
      icon: <Building className="h-5 w-5" />,
      employerOnly: true,
      employeeOnly: false,
    },
    {
      href: "/dashboard/post-job",
      label: "Post a Job",
      icon: <PenTool className="h-5 w-5" />,
      employerOnly: true,
      employeeOnly: false,
    },
    {
      href: "/dashboard/manage-jobs",
      label: "Manage Jobs",
      icon: <Briefcase className="h-5 w-5" />,
      employerOnly: true,
      employeeOnly: false,
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      employerOnly: false,
      employeeOnly: false,
    },
  ];

  const filteredNavLinks = navLinks.filter((link) => {
    if (user?.role === "employer" && link.employeeOnly) return false;
    if (user?.role === "employee" && link.employerOnly) return false;
    return true;
  });

  // Determine if link is active
  const isActiveLink = (path: string) => {
    return pathname === path;
  };

  return (
    <aside className="hidden md:block w-64 bg-white border-r border-zinc-200 h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-zinc-900" />
          <span className="text-xl font-bold text-zinc-900">JobFinder</span>
        </Link>
      </div>
      <nav className="mt-2 px-3 py-2">
        {filteredNavLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 my-1 rounded-md transition-colors ${
              isActiveLink(link.href)
                ? "bg-blue-50 text-blue-600"
                : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 