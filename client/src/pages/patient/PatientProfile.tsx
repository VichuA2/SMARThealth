import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Phone, Mail, Calendar, Edit, Camera, Watch, Shield, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const PatientProfile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    bloodType: "O+",
    height: "5'10\"",
    weight: "165 lbs",
    emergencyContact: "Jane Doe",
    emergencyPhone: "+1-555-0199"
  });

  const connectedDevices = [
    {
      name: "Apple Watch Series 9",
      type: "Smartwatch",
      status: "Connected",
      lastSync: "2 minutes ago"
    },
    {
      name: "iPhone Health App",
      type: "Health App",
      status: "Connected",
      lastSync: "5 minutes ago"
    }
  ];

  const privacySettings = [
    {
      title: "Share health data with doctors",
      description: "Allow your healthcare providers to access your health metrics",
      enabled: true
    },
    {
      title: "Emergency health access",
      description: "Make critical health info available in emergencies",
      enabled: true
    },
    {
      title: "Health insights notifications",
      description: "Receive AI-powered health recommendations",
      enabled: false
    }
  ];

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated."
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile & Settings</h1>
          <p className="text-muted-foreground">Manage your account and health preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="devices">Connected Devices</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details and health information</CardDescription>
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
                      Upload a new profile picture
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
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                    />
                  </div>
                </div>

                {/* Health Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Health Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bloodType">Blood Type</Label>
                      <Input
                        id="bloodType"
                        value={profileData.bloodType}
                        onChange={(e) => setProfileData({...profileData, bloodType: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        value={profileData.height}
                        onChange={(e) => setProfileData({...profileData, height: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight</Label>
                      <Input
                        id="weight"
                        value={profileData.weight}
                        onChange={(e) => setProfileData({...profileData, weight: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Emergency Contact</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        value={profileData.emergencyPhone}
                        onChange={(e) => setProfileData({...profileData, emergencyPhone: e.target.value})}
                      />
                    </div>
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
          </TabsContent>

          {/* Connected Devices Tab */}
          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Watch className="h-5 w-5 text-primary" />
                  Connected Devices
                </CardTitle>
                <CardDescription>Manage your health monitoring devices and apps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedDevices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Watch className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{device.name}</h4>
                        <p className="text-sm text-muted-foreground">{device.type}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-success/10 text-success border-success/20">
                            {device.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">Last sync: {device.lastSync}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Watch className="h-4 w-4 mr-2" />
                  Connect New Device
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your data sharing and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {privacySettings.map((setting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{setting.title}</h4>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      {setting.enabled ? "Enabled" : "Disabled"}
                    </Button>
                  </div>
                ))}

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-medium text-foreground">Data Management</h3>
                  <div className="flex gap-4">
                    <Button variant="outline">
                      Export My Data
                    </Button>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how and when you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Appointment Reminders</h4>
                      <p className="text-sm text-muted-foreground">Get notified before appointments</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Health Alerts</h4>
                      <p className="text-sm text-muted-foreground">Critical health notifications</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Medication Reminders</h4>
                      <p className="text-sm text-muted-foreground">Reminders to take medications</p>
                    </div>
                    <Button variant="outline" size="sm">Disabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">Health Tips</h4>
                      <p className="text-sm text-muted-foreground">Weekly health insights and tips</p>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientProfile;