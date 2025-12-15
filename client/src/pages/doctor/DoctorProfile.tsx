import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Stethoscope, MapPin, Clock, Camera, Star, Shield, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const DoctorProfile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    specialization: "Cardiologist",
    licenseNumber: "MD123456789",
    experience: "15 years",
    education: "Harvard Medical School",
    clinicName: "Heart Care Center",
    clinicAddress: "123 Medical Plaza, Health City, HC 12345",
    about: "Experienced cardiologist specializing in preventive care and heart disease management. Committed to providing personalized healthcare solutions.",
    consultationFee: "150",
    languages: "English, Spanish, French"
  });

  const [availabilityData, setAvailabilityData] = useState({
    monday: { available: true, startTime: "09:00", endTime: "17:00" },
    tuesday: { available: true, startTime: "09:00", endTime: "17:00" },
    wednesday: { available: true, startTime: "09:00", endTime: "17:00" },
    thursday: { available: true, startTime: "09:00", endTime: "17:00" },
    friday: { available: true, startTime: "09:00", endTime: "15:00" },
    saturday: { available: false, startTime: "10:00", endTime: "14:00" },
    sunday: { available: false, startTime: "10:00", endTime: "14:00" }
  });

  const achievements = [
    {
      title: "Board Certified Cardiologist",
      organization: "American Board of Internal Medicine",
      year: "2015"
    },
    {
      title: "Excellence in Patient Care Award",
      organization: "Medical Association",
      year: "2022"
    },
    {
      title: "Research Publication",
      organization: "Journal of Cardiology",
      year: "2023"
    }
  ];

  const statistics = [
    { label: "Total Patients", value: "247" },
    { label: "Years of Experience", value: "15" },
    { label: "Patient Rating", value: "4.8/5" },
    { label: "Consultations This Month", value: "89" }
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your professional profile has been successfully updated."
    });
  };

  const handleSaveAvailability = () => {
    toast({
      title: "Availability Updated",
      description: "Your schedule availability has been updated."
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Professional Profile</h1>
          <p className="text-muted-foreground">Manage your professional information and settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Statistics Cards */}
              <div className="lg:col-span-1 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {statistics.map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Profile Form */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      Professional Information
                    </CardTitle>
                    <CardDescription>Update your professional details and credentials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-lg">{user?.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">
                          Professional photo for patient bookings
                        </p>
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          value={profileData.specialization}
                          onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Professional Details</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="license">License Number</Label>
                          <Input
                            id="license"
                            value={profileData.licenseNumber}
                            onChange={(e) => setProfileData({...profileData, licenseNumber: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input
                            id="experience"
                            value={profileData.experience}
                            onChange={(e) => setProfileData({...profileData, experience: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="education">Education</Label>
                          <Input
                            id="education"
                            value={profileData.education}
                            onChange={(e) => setProfileData({...profileData, education: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="languages">Languages</Label>
                          <Input
                            id="languages"
                            value={profileData.languages}
                            onChange={(e) => setProfileData({...profileData, languages: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Clinic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">Clinic Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="clinicName">Clinic Name</Label>
                          <Input
                            id="clinicName"
                            value={profileData.clinicName}
                            onChange={(e) => setProfileData({...profileData, clinicName: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fee">Consultation Fee (₹)</Label>
                          <Input
                            id="fee"
                            value={profileData.consultationFee}
                            onChange={(e) => setProfileData({...profileData, consultationFee: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="clinicAddress">Clinic Address</Label>
                        <Textarea
                          id="clinicAddress"
                          value={profileData.clinicAddress}
                          onChange={(e) => setProfileData({...profileData, clinicAddress: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="about">About</Label>
                        <Textarea
                          id="about"
                          value={profileData.about}
                          onChange={(e) => setProfileData({...profileData, about: e.target.value})}
                          placeholder="Brief description about your practice and expertise"
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="destructive" onClick={handleLogout}>
                        Sign Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Schedule Availability
                </CardTitle>
                <CardDescription>Set your working hours for each day of the week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(availabilityData).map(([day, schedule]) => (
                  <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-24">
                        <h4 className="font-medium text-foreground capitalize">{day}</h4>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          variant={schedule.available ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAvailabilityData({
                            ...availabilityData,
                            [day]: { ...schedule, available: !schedule.available }
                          })}
                        >
                          {schedule.available ? "Available" : "Unavailable"}
                        </Button>
                        
                        {schedule.available && (
                          <>
                            <Input
                              type="time"
                              value={schedule.startTime}
                              onChange={(e) => setAvailabilityData({
                                ...availabilityData,
                                [day]: { ...schedule, startTime: e.target.value }
                              })}
                              className="w-32"
                            />
                            <span className="text-muted-foreground">to</span>
                            <Input
                              type="time"
                              value={schedule.endTime}
                              onChange={(e) => setAvailabilityData({
                                ...availabilityData,
                                [day]: { ...schedule, endTime: e.target.value }
                              })}
                              className="w-32"
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button onClick={handleSaveAvailability}>
                    Save Availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Professional Achievements
                  </CardTitle>
                  <CardDescription>Your certifications and awards</CardDescription>
                </div>
                <Button>Add Achievement</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                      <Badge variant="outline">{achievement.year}</Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">New Patient Requests</h4>
                      <p className="text-sm text-muted-foreground">Get notified when patients book appointments</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Critical Patient Alerts</h4>
                      <p className="text-sm text-muted-foreground">Urgent health alerts from patients</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Schedule Reminders</h4>
                      <p className="text-sm text-muted-foreground">Reminders for upcoming appointments</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Export Patient Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorProfile;