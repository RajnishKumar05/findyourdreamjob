"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Globe, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Form schema validation
const companySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  size: z.string(),
  founded: z.string()
    .refine(val => !val || /^\d{4}$/.test(val), {
      message: "Please enter a valid year (YYYY)",
    }),
  headquarters: z.string(),
  about: z.string().min(10, "About section must be at least 10 characters"),
  mission: z.string(),
  culture: z.string(),
  benefits: z.string(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string(),
  address: z.string(),
  socialLinkedin: z.string().url("Please enter a valid LinkedIn URL").or(z.string().length(0)),
  socialTwitter: z.string().url("Please enter a valid Twitter URL").or(z.string().length(0)),
  socialFacebook: z.string().url("Please enter a valid Facebook URL").or(z.string().length(0))
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function CompanyProfilePage() {
  const { user } = useAuth();
  const [logo, setLogo] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Initialize form
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      website: "",
      industry: "",
      size: "",
      founded: "",
      headquarters: "",
      about: "",
      mission: "",
      culture: "",
      benefits: "",
      email: "",
      phone: "",
      address: "",
      socialLinkedin: "",
      socialTwitter: "",
      socialFacebook: ""
    }
  });
  
  // Fetch company profile data from Firestore
  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        // For testing without auth
        const userId = user?.uid || "test-user-id";
        
        const companyRef = doc(db, "companies", userId);
        const docSnap = await getDoc(companyRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Update form with database values
          form.reset({
            name: data.name || "",
            website: data.website || "",
            industry: data.industry || "",
            size: data.size || "",
            founded: data.founded || "",
            headquarters: data.headquarters || "",
            about: data.about || "",
            mission: data.mission || "",
            culture: data.culture || "",
            benefits: data.benefits || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            socialLinkedin: data.socialLinkedin || "",
            socialTwitter: data.socialTwitter || "",
            socialFacebook: data.socialFacebook || ""
          });
          
          // Update logo if it exists
          if (data.logo) {
            setLogo(data.logo);
          }
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
        setMessage({
          type: 'error',
          text: 'Failed to load company profile data. Please try again later.'
        });
      }
    };
    
    fetchCompanyProfile();
  }, [user, form]);
  
  // Submit form handler
  const onSubmit = async (values: CompanyFormValues) => {
    setIsSaving(true);
    setMessage(null);
    
    try {
      // For testing without auth
      const userId = user?.uid || "test-user-id";
      
      const companyRef = doc(db, "companies", userId);
      const docSnap = await getDoc(companyRef);
      
      const companyData = {
        ...values,
        logo: logo,
        updatedAt: new Date().toISOString(),
        userId: userId
      };
      
      if (docSnap.exists()) {
        await updateDoc(companyRef, companyData);
      } else {
        await setDoc(companyRef, {
          ...companyData,
          createdAt: new Date().toISOString()
        });
      }
      
      setMessage({
        type: 'success',
        text: 'Company profile updated successfully!'
      });
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setMessage(prev => prev?.type === 'success' ? null : prev);
      }, 3000);
      
    } catch (error) {
      console.error("Error saving company profile:", error);
      setMessage({
        type: 'error',
        text: 'Failed to update company profile. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle logo upload
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsSaving(true);
      
      // For testing purposes, we'll just use a mock URL instead of actually uploading
      // In a real app, you would use Firebase Storage
      if (process.env.NODE_ENV === 'development') {
        // Create a mock company logo URL using UI Avatars
        const companyName = form.getValues('name') || 'Company';
        const mockLogoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=0D8ABC&color=fff&size=256`;
        setLogo(mockLogoUrl);
        setIsSaving(false);
        return;
      }
      
      // For production, use Firebase Storage
      const storage = getStorage();
      const userId = user?.uid || "test-user-id";
      const logoRef = ref(storage, `companies/${userId}/logo_${Date.now()}`);
      
      await uploadBytes(logoRef, file);
      const downloadURL = await getDownloadURL(logoRef);
      
      setLogo(downloadURL);
    } catch (error) {
      console.error("Error uploading logo:", error);
      setMessage({
        type: 'error',
        text: 'Failed to upload logo. Please try again.'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Company Profile</h1>
      
      {message && (
        <div className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <p>{message.text}</p>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="bg-gray-50 p-6 border-b flex items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-2 border-white shadow-sm">
              {logo ? (
                <AvatarImage src={logo} alt="Company Logo" />
              ) : (
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  <Building className="h-10 w-10" />
                </AvatarFallback>
              )}
            </Avatar>
            <label 
              htmlFor="logo-upload" 
              className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity"
            >
              <Upload className="h-6 w-6" />
            </label>
            <input 
              id="logo-upload" 
              type="file" 
              accept="image/*" 
              className="sr-only" 
              onChange={handleLogoUpload}
              disabled={isSaving}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {form.watch('name') || 'Your Company Name'}
            </h2>
            <p className="text-gray-500 flex items-center gap-1 mt-1">
              <Globe className="h-4 w-4" />
              {form.watch('website') ? (
                <a href={form.watch('website')} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {form.watch('website')}
                </a>
              ) : (
                'Website URL'
              )}
            </p>
            <p className="text-gray-500 mt-1">{form.watch('industry') || 'Industry'}</p>
          </div>
        </div>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic Information</TabsTrigger>
                <TabsTrigger value="about">About Company</TabsTrigger>
                <TabsTrigger value="contact">Contact Details</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name*</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry*</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Technology, Healthcare, Finance" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 1-10, 11-50, 51-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="founded"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founded Year</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2010" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="headquarters"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Headquarters</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Bengaluru, India" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="about" className="space-y-4">
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About Company*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your company..." 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mission"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mission & Vision</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your company's mission and vision..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="culture"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Culture</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your company culture..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Benefits</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List benefits like health insurance, remote work policy, etc." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="contact" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email*</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 98765 43210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Full company address..." 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="social" className="space-y-4">
                <FormField
                  control={form.control}
                  name="socialLinkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://linkedin.com/company/yourcompany" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialTwitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/yourcompany" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="socialFacebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/yourcompany" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            
            <div className="pt-4 border-t flex items-center justify-between mt-6">
              <div className="text-sm text-gray-500">
                * Required fields
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Company Profile'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
} 