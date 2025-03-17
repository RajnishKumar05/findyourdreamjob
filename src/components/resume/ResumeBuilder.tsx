"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2, Download, MoveVertical, FileType } from "lucide-react";

type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Experience = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Skill = {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
};

type ResumeData = {
  profile: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: {
    id: string;
    name: string;
    description: string;
    technologies: string;
    link: string;
  }[];
};

export function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [resumeData, setResumeData] = useState<ResumeData>({
    profile: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    education: [],
    experience: [],
    skills: [],
    projects: []
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value
      }
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: "",
      level: "Intermediate"
    };
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string | "Beginner" | "Intermediate" | "Advanced" | "Expert") => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const downloadResume = (format: 'pdf' | 'docx') => {
    alert(`Downloading resume as ${format.toUpperCase()}...`);
    // In a real app, use jsPDF or similar to generate the PDF
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Resume Builder</h2>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => downloadResume('docx')}>
              <FileType className="mr-2 h-4 w-4" /> DOCX
            </Button>
            <Button onClick={() => downloadResume('pdf')}>
              <Download className="mr-2 h-4 w-4" /> PDF
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border mb-6">
          <h3 className="text-lg font-medium mb-3">Choose Template</h3>
          <div className="grid grid-cols-3 gap-3">
            <Card 
              className={`cursor-pointer border-2 ${activeTemplate === 'modern' ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setActiveTemplate('modern')}
            >
              <CardContent className="p-2">
                <div className="aspect-w-8.5 aspect-h-11 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-sm font-medium">Modern</span>
                </div>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer border-2 ${activeTemplate === 'classic' ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setActiveTemplate('classic')}
            >
              <CardContent className="p-2">
                <div className="aspect-w-8.5 aspect-h-11 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-sm font-medium">Classic</span>
                </div>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer border-2 ${activeTemplate === 'creative' ? 'border-blue-500' : 'border-transparent'}`}
              onClick={() => setActiveTemplate('creative')}
            >
              <CardContent className="p-2">
                <div className="aspect-w-8.5 aspect-h-11 bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-sm font-medium">Creative</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={resumeData.profile.name} 
                      onChange={handleProfileChange} 
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={resumeData.profile.title} 
                      onChange={handleProfileChange} 
                      placeholder="Frontend Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      value={resumeData.profile.email} 
                      onChange={handleProfileChange} 
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={resumeData.profile.phone} 
                      onChange={handleProfileChange} 
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={resumeData.profile.location} 
                      onChange={handleProfileChange} 
                      placeholder="Mumbai, India"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea 
                      id="summary" 
                      name="summary" 
                      value={resumeData.profile.summary} 
                      onChange={handleProfileChange} 
                      placeholder="A brief summary of your professional background and skills"
                      rows={5}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <Card key={edu.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="flex items-center">
                      <MoveVertical className="h-4 w-4 mr-2 cursor-move" />
                      Education #{index + 1}
                    </CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                      <Input 
                        id={`school-${edu.id}`} 
                        value={edu.school} 
                        onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} 
                        placeholder="University name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input 
                        id={`degree-${edu.id}`} 
                        value={edu.degree} 
                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} 
                        placeholder="Bachelor's, Master's, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input 
                        id={`field-${edu.id}`} 
                        value={edu.fieldOfStudy} 
                        onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)} 
                        placeholder="Computer Science, Economics, etc."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor={`eduStart-${edu.id}`}>Start Date</Label>
                        <Input 
                          id={`eduStart-${edu.id}`} 
                          type="month" 
                          value={edu.startDate} 
                          onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`eduEnd-${edu.id}`}>End Date</Label>
                        <Input 
                          id={`eduEnd-${edu.id}`} 
                          type="month" 
                          value={edu.endDate} 
                          onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`eduDesc-${edu.id}`}>Description</Label>
                      <Textarea 
                        id={`eduDesc-${edu.id}`} 
                        value={edu.description} 
                        onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} 
                        placeholder="Describe your academic achievements, GPA, relevant coursework, etc."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              onClick={addEducation}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <Card key={exp.id}>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle className="flex items-center">
                      <MoveVertical className="h-4 w-4 mr-2 cursor-move" />
                      Experience #{index + 1}
                    </CardTitle>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input 
                        id={`company-${exp.id}`} 
                        value={exp.company} 
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} 
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`position-${exp.id}`}>Position</Label>
                      <Input 
                        id={`position-${exp.id}`} 
                        value={exp.position} 
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} 
                        placeholder="Job title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`expLocation-${exp.id}`}>Location</Label>
                      <Input 
                        id={`expLocation-${exp.id}`} 
                        value={exp.location} 
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)} 
                        placeholder="City, Country or Remote"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor={`expStart-${exp.id}`}>Start Date</Label>
                        <Input 
                          id={`expStart-${exp.id}`} 
                          type="month" 
                          value={exp.startDate} 
                          onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`expEnd-${exp.id}`}>End Date</Label>
                        <Input 
                          id={`expEnd-${exp.id}`} 
                          type="month" 
                          value={exp.endDate} 
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`expDesc-${exp.id}`}>Description</Label>
                      <Textarea 
                        id={`expDesc-${exp.id}`} 
                        value={exp.description} 
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} 
                        placeholder="Describe your responsibilities, achievements, and technologies used"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              onClick={addExperience}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumeData.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input 
                          value={skill.name} 
                          onChange={(e) => updateSkill(skill.id, 'name', e.target.value)} 
                          placeholder="Skill name (e.g., React, Python, Project Management)"
                        />
                      </div>
                      <select 
                        className="border rounded-md px-3 py-2"
                        value={skill.level}
                        onChange={(e) => updateSkill(skill.id, 'level', e.target.value as "Beginner" | "Intermediate" | "Advanced" | "Expert")}
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500"
                        onClick={() => removeSkill(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    onClick={addSkill}
                    className="w-full"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Resume Preview */}
      <div className="sticky top-4 h-[calc(100vh-120px)] overflow-auto bg-white border rounded-lg shadow-md">
        <div className="p-8">
          <h2 className="text-xl font-semibold mb-4">Resume Preview</h2>
          <div className="w-full bg-white border p-8 min-h-[1056px]">
            {/* Modern Template Preview */}
            {activeTemplate === 'modern' && (
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b pb-6">
                  <h1 className="text-2xl font-bold">{resumeData.profile.name || 'Your Name'}</h1>
                  <p className="text-blue-600">{resumeData.profile.title || 'Professional Title'}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-zinc-600">
                    {resumeData.profile.email && (
                      <span>{resumeData.profile.email}</span>
                    )}
                    {resumeData.profile.phone && (
                      <span>{resumeData.profile.phone}</span>
                    )}
                    {resumeData.profile.location && (
                      <span>{resumeData.profile.location}</span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {resumeData.profile.summary && (
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-800 mb-2">Profile</h2>
                    <p className="text-sm text-zinc-600">{resumeData.profile.summary}</p>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-800 mb-3">Experience</h2>
                    <div className="space-y-4">
                      {resumeData.experience.map(exp => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{exp.position || 'Position'}</h3>
                              <p className="text-sm">{exp.company || 'Company'}, {exp.location || 'Location'}</p>
                            </div>
                            <p className="text-sm text-zinc-500">
                              {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Start Date'} - 
                              {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Present'}
                            </p>
                          </div>
                          <p className="text-sm mt-2">{exp.description || 'Description of your responsibilities and achievements'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-800 mb-3">Education</h2>
                    <div className="space-y-4">
                      {resumeData.education.map(edu => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{edu.degree || 'Degree'} in {edu.fieldOfStudy || 'Field of Study'}</h3>
                              <p className="text-sm">{edu.school || 'School/University'}</p>
                            </div>
                            <p className="text-sm text-zinc-500">
                              {edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'Start Date'} - 
                              {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : 'End Date'}
                            </p>
                          </div>
                          <p className="text-sm mt-2">{edu.description || 'Description of your academic achievements'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-zinc-800 mb-3">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map(skill => (
                        <span key={skill.id} className="bg-zinc-100 px-3 py-1 rounded-full text-sm">
                          {skill.name} ({skill.level})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Show other templates here */}
            {activeTemplate === 'classic' && (
              <div className="text-center p-8">
                <h2 className="text-lg">Classic template preview coming soon</h2>
              </div>
            )}

            {activeTemplate === 'creative' && (
              <div className="text-center p-8">
                <h2 className="text-lg">Creative template preview coming soon</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 