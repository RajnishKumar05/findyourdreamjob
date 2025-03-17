"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Briefcase, Users, Search } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white/50 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-zinc-900" />
            <span className="text-xl font-bold text-zinc-900">JobFinder</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/jobs" className="text-zinc-700 hover:text-zinc-900">
              Browse Jobs
            </Link>
            <Link href="/employers" className="text-zinc-700 hover:text-zinc-900">
              For Employers
            </Link>
            <Link href="/about" className="text-zinc-700 hover:text-zinc-900">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/login")}>
              Log In
            </Button>
            <Button onClick={() => router.push("/register")}>Sign Up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-br from-zinc-50 to-zinc-100">
        <div className="container mx-auto py-20 px-4 md:px-6 flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
              Find Your Dream Job <span className="text-blue-600">Today</span>
            </h1>
            <p className="text-lg text-zinc-700 max-w-2xl">
              Connect with top employers, build your professional profile, and discover opportunities that match your skills and aspirations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={() => router.push("/register?role=employee")}>
                Find Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push("/register?role=employer")}>
                Post a Job <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-200 p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Job Search</h2>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Job title, keyword, or company" 
                    className="w-full rounded-md border border-zinc-300 pl-10 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <div className="flex gap-4">
                    <select className="flex-1 rounded-md border border-zinc-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">All Categories</option>
                      <option value="tech">Technology</option>
                      <option value="marketing">Marketing</option>
                      <option value="design">Design</option>
                      <option value="sales">Sales</option>
                    </select>
                    <select className="flex-1 rounded-md border border-zinc-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Any Location</option>
                      <option value="remote">Remote</option>
                      <option value="india">India</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Search Jobs
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose JobFinder</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-zinc-50 rounded-xl p-6 border border-zinc-200"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
              <p className="text-zinc-700">Our AI-powered system matches your skills and preferences with the perfect opportunities.</p>
            </motion.div>
            
            <motion.div 
              className="bg-zinc-50 rounded-xl p-6 border border-zinc-200"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect with Employers</h3>
              <p className="text-zinc-700">Build your professional network and connect directly with hiring managers.</p>
            </motion.div>
            
            <motion.div 
              className="bg-zinc-50 rounded-xl p-6 border border-zinc-200"
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Profile</h3>
              <p className="text-zinc-700">Create a standout profile and resume to showcase your skills and experience.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JobFinder</h3>
              <p className="text-zinc-400">Connecting talent with opportunity.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Job Seekers</h4>
              <ul className="space-y-2">
                <li><Link href="/jobs" className="text-zinc-400 hover:text-white">Browse Jobs</Link></li>
                <li><Link href="/resume" className="text-zinc-400 hover:text-white">Create Resume</Link></li>
                <li><Link href="/career-advice" className="text-zinc-400 hover:text-white">Career Advice</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Employers</h4>
              <ul className="space-y-2">
                <li><Link href="/post-job" className="text-zinc-400 hover:text-white">Post a Job</Link></li>
                <li><Link href="/pricing" className="text-zinc-400 hover:text-white">Pricing</Link></li>
                <li><Link href="/resources" className="text-zinc-400 hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-zinc-400 hover:text-white">About Us</Link></li>
                <li><Link href="/contact" className="text-zinc-400 hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-zinc-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500">
            <p>&copy; {new Date().getFullYear()} JobFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Add navigation links to help users find the correct routes */}
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/dashboard/jobs" className="text-blue-600 hover:underline">
            Browse Jobs
          </Link>
          <Link href="/dashboard/job-map" className="text-blue-600 hover:underline">
            Job Map
          </Link>
          <Link href="/dashboard/resume-builder" className="text-blue-600 hover:underline">
            Resume Builder
          </Link>
          <Link href="/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
