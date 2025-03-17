"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Briefcase, Banknote } from "lucide-react";
import Link from "next/link";

// Mock data for jobs with location coordinates
const MOCK_JOBS = [
  {
    id: "job1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Mumbai, India",
    salary: "₹10-15 LPA",
    type: "Full-time",
    lat: 19.0760,
    lng: 72.8777,
    skills: ["React", "TypeScript", "CSS"],
  },
  {
    id: "job2",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Bangalore, India",
    salary: "₹15-20 LPA",
    type: "Full-time",
    lat: 12.9716,
    lng: 77.5946,
    skills: ["Node.js", "MongoDB", "AWS"],
  },
  {
    id: "job3",
    title: "Product Designer",
    company: "CreativeMinds",
    location: "Delhi, India",
    salary: "₹8-12 LPA",
    type: "Full-time",
    lat: 28.7041,
    lng: 77.1025,
    skills: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    id: "job4",
    title: "Data Analyst",
    company: "InfoTech",
    location: "Hyderabad, India",
    salary: "₹8-12 LPA",
    type: "Remote",
    lat: 17.3850,
    lng: 78.4867,
    skills: ["Python", "SQL", "Excel"],
  },
  {
    id: "job5",
    title: "DevOps Engineer",
    company: "CloudNative",
    location: "Pune, India",
    salary: "₹18-25 LPA",
    type: "Hybrid",
    lat: 18.5204,
    lng: 73.8567,
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
];

export default function JobMapPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [distance, setDistance] = useState(50);
  const [jobType, setJobType] = useState<string[]>([]);

  const toggleJobType = (type: string) => {
    if (jobType.includes(type)) {
      setJobType(jobType.filter(t => t !== type));
    } else {
      setJobType([...jobType, type]);
    }
  };

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = jobType.length === 0 || jobType.includes(job.type);
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Find Jobs Near You</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters Panel */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
              
              <div className="space-y-2">
                <Label>Distance</Label>
                <div className="flex justify-between mb-1 text-sm text-gray-500">
                  <span>0 km</span>
                  <span>{distance} km</span>
                  <span>100 km</span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  value={[distance]}
                  onValueChange={(value) => setDistance(value[0])}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Job Type</Label>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Full-time", "Part-time", "Contract", "Remote", "Hybrid"].map((type) => (
                    <Badge
                      key={type}
                      variant={jobType.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleJobType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Job List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y max-h-[400px] overflow-y-auto">
                {filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedJob === job.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedJob(job.id)}
                  >
                    <h3 className="font-medium text-blue-600">{job.title}</h3>
                    <p className="text-sm text-gray-700">{job.company}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {job.skills.slice(0, 2).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Map Section */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="bg-gray-100 h-full relative">
                {/* This would be replaced by an actual map component like Google Maps */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">Interactive Map</p>
                    <p className="text-sm text-gray-500 mb-4">
                      This would display an interactive map with job markers.<br />
                      In a real implementation, use Google Maps or similar API.
                    </p>
                    <div className="grid grid-cols-5 gap-4 p-4">
                      {MOCK_JOBS.map((job) => (
                        <div 
                          key={job.id}
                          className={`
                            absolute p-2 rounded-full bg-blue-500 text-white text-xs
                            transform -translate-x-1/2 -translate-y-1/2
                            hover:z-10 hover:scale-110 transition-transform
                            ${selectedJob === job.id ? 'ring-2 ring-offset-2 ring-blue-500 z-20' : ''}
                          `}
                          style={{
                            // Converting geographic coordinates to relative positions in the container
                            // This is a very simplified approximation for illustration
                            left: `${((job.lng - 70) / 10) * 100}%`,
                            top: `${((30 - job.lat) / 20) * 100}%`,
                          }}
                          onClick={() => setSelectedJob(job.id)}
                          title={`${job.title} at ${job.company}`}
                        >
                          <MapPin className="h-4 w-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Job details card that appears when a job is selected */}
                {selectedJob && (
                  <div className="absolute bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg p-4 z-30">
                    {(() => {
                      const job = MOCK_JOBS.find(j => j.id === selectedJob);
                      if (!job) return null;
                      
                      return (
                        <>
                          <h3 className="font-medium text-lg">{job.title}</h3>
                          <p className="text-gray-700">{job.company}</p>
                          
                          <div className="grid grid-cols-1 gap-2 mt-3">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="h-4 w-4 text-gray-500" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Banknote className="h-4 w-4 text-gray-500" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {job.skills.map((skill, i) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          
                          <Link href={`/dashboard/jobs/${job.id}`}>
                            <Button className="w-full mt-4">View Job Details</Button>
                          </Link>
                        </>
                      );
                    })()}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>Note: This is a simplified map visualization. In a production environment, integrate with Google Maps or Mapbox API for accurate geolocation features.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 