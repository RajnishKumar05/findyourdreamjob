"use client";

import React, { useState } from "react";
import { JobCard, Job } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X } from "lucide-react";

// Mock jobs data
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "Mumbai, India",
    type: "Remote",
    salary: "₹20L - ₹30L",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    skills: ["React", "TypeScript", "Redux", "Node.js"],
    featured: true,
    logo: "https://ui-avatars.com/api/?name=TC&background=0052CC&color=fff"
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹18L - ₹25L",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    skills: ["React", "Node.js", "MongoDB", "Express"],
    logo: "https://ui-avatars.com/api/?name=IT&background=6C5CE7&color=fff"
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Creative Designs",
    location: "Delhi, India",
    type: "Full-time",
    salary: "₹15L - ₹22L",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    skills: ["Figma", "Adobe XD", "UI Design", "User Research"],
    logo: "https://ui-avatars.com/api/?name=CD&background=00B894&color=fff"
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Hyderabad, India",
    type: "Remote",
    salary: "₹20L - ₹28L",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    featured: true,
    logo: "https://ui-avatars.com/api/?name=CS&background=FD9644&color=fff"
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "Analytics Pro",
    location: "Mumbai, India",
    type: "Remote",
    salary: "₹18L - ₹25L",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Data Visualization"],
    logo: "https://ui-avatars.com/api/?name=AP&background=74B9FF&color=fff"
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Product First",
    location: "Pune, India",
    type: "Full-time",
    salary: "₹30L - ₹40L",
    postedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    skills: ["Product Strategy", "Agile", "User Stories", "Roadmapping"],
    logo: "https://ui-avatars.com/api/?name=PF&background=ED4C67&color=fff"
  },
  {
    id: "7",
    title: "Mobile Developer",
    company: "App Masters",
    location: "Noida, India",
    type: "Contract",
    salary: "₹15L - ₹25L",
    postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    skills: ["React Native", "Flutter", "iOS", "Android"],
    logo: "https://ui-avatars.com/api/?name=AM&background=A3CB38&color=fff"
  },
  {
    id: "8",
    title: "Technical Writer",
    company: "TechDocs",
    location: "Remote",
    type: "Part-time",
    salary: "₹8L - ₹15L",
    postedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
    skills: ["Technical Writing", "Documentation", "API Docs", "Markdown"],
    logo: "https://ui-avatars.com/api/?name=TD&background=5758BB&color=fff"
  },
  {
    id: "9",
    title: "QA Engineer",
    company: "Quality First",
    location: "Chennai, India",
    type: "Full-time",
    salary: "₹12L - ₹18L",
    postedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    skills: ["Manual Testing", "Automated Testing", "Selenium", "JIRA"],
    logo: "https://ui-avatars.com/api/?name=QF&background=F78FB3&color=fff"
  },
  {
    id: "10",
    title: "Backend Developer",
    company: "ServerSide",
    location: "Kolkata, India",
    type: "Internship",
    salary: "₹5L - ₹8L",
    postedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
    skills: ["Java", "Spring Boot", "MySQL", "REST APIs"],
    logo: "https://ui-avatars.com/api/?name=SS&background=574B90&color=fff"
  }
];

// Type filter buttons
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Remote", "Internship"];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 40]);
  const [activeFilters, setActiveFilters] = useState(false);
  
  const toggleJobType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };
  
  const clearFilters = () => {
    setSelectedTypes([]);
    setSalaryRange([0, 40]);
    setActiveFilters(false);
  };
  
  const toggleFilters = () => {
    setActiveFilters(!activeFilters);
  };
  
  const filteredJobs = MOCK_JOBS.filter(job => {
    // Search term filter
    const matchesSearch = 
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Job type filter
    const matchesType = 
      selectedTypes.length === 0 || 
      selectedTypes.includes(job.type);
    
    // Salary filter (simplified)
    // Convert salary range from "₹XL - ₹YL" to numbers for comparison
    const salaryText = job.salary;
    const salaryMatch = salaryText.match(/₹(\d+)L\s*-\s*₹(\d+)L/);
    const minSalary = salaryMatch ? parseInt(salaryMatch[1], 10) : 0;
    const maxSalary = salaryMatch ? parseInt(salaryMatch[2], 10) : 100;
    
    const matchesSalary = 
      (minSalary <= salaryRange[1] && maxSalary >= salaryRange[0]);
    
    return matchesSearch && matchesType && matchesSalary;
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Job</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search and filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg border p-4 shadow-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Job title, company, or location"
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <h3 className="font-medium">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs"
                onClick={toggleFilters}
              >
                {activeFilters ? (
                  <>
                    <X className="mr-1 h-3.5 w-3.5" />
                    Hide Filters
                  </>
                ) : (
                  <>
                    <Filter className="mr-1 h-3.5 w-3.5" />
                    Show Filters
                  </>
                )}
              </Button>
            </div>
            
            {activeFilters && (
              <div className="mt-4 space-y-5">
                <div>
                  <h4 className="text-sm font-medium mb-2">Job Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {JOB_TYPES.map((type) => (
                      <Badge
                        key={type}
                        variant={selectedTypes.includes(type) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleJobType(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Salary Range (LPA)</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 40]}
                      max={40}
                      step={1}
                      value={salaryRange}
                      onValueChange={(value) => setSalaryRange(value)}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                      <span>₹{salaryRange[0]}L</span>
                      <span>₹{salaryRange[1]}L</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
            <h3 className="font-medium mb-2">Job Search Tips</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>Use specific keywords related to the job you want</li>
              <li>Set up job alerts to get notified about new openings</li>
              <li>Tailor your resume for each application</li>
              <li>Research the company before applying</li>
              <li>Follow up after submitting your application</li>
            </ul>
          </div>
        </div>
        
        {/* Job listings */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-500">Found {filteredJobs.length} jobs</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select className="text-sm border rounded-md px-2 py-1">
                <option>Newest</option>
                <option>Relevant</option>
                <option>Salary: High to Low</option>
                <option>Salary: Low to High</option>
              </select>
            </div>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-lg p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search filters or try a different search term.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
          
          {filteredJobs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="bg-blue-50">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 