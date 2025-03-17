"use client";

import React, { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Briefcase, Banknote, Filter, X } from "lucide-react";

// Mock jobs data
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "Remote, India",
    type: "Full-time",
    salary: "₹25L - ₹35L",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    logo: "https://ui-avatars.com/api/?name=TC&background=0D8ABC&color=fff"
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
    type: "Full-time",
    salary: "₹20L - ₹30L",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    featured: true,
    logo: "https://ui-avatars.com/api/?name=CS&background=0984E3&color=fff"
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
    company: "ProductHub",
    location: "Pune, India",
    type: "Full-time",
    salary: "₹28L - ₹35L",
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
    logo: "https://ui-avatars.com/api/?name=PH&background=FF9F43&color=fff"
  },
  {
    id: "7",
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Gurgaon, India",
    type: "Contract",
    salary: "₹12L - ₹18L",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    skills: ["React Native", "iOS", "Android", "Flutter"],
    logo: "https://ui-avatars.com/api/?name=AW&background=20BF6B&color=fff"
  },
  {
    id: "8",
    title: "Backend Engineer",
    company: "ServerLogic",
    location: "Chennai, India",
    type: "Part-time",
    salary: "₹10L - ₹15L",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    skills: ["Java", "Spring Boot", "Microservices", "SQL"],
    logo: "https://ui-avatars.com/api/?name=SL&background=A3CB38&color=fff"
  }
];

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
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Job type filter
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);
    
    // Salary filter - simplified for the example
    const minSalary = parseInt(job.salary.split('₹')[1].split('L')[0]);
    const matchesSalary = minSalary >= salaryRange[0] && minSalary <= salaryRange[1];
    
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
                    {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
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