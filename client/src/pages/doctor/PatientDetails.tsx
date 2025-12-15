import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VitalCard } from "@/components/VitalCard";
import { Heart, Activity, Droplet, Thermometer, Calendar, FileText, Edit, Download, Plus } from "lucide-react";

const PatientDetails = () => {
  const { id } = useParams();
  
  // Mock patient data - in real app, this would be fetched based on the ID
  const patient = {
    id: parseInt(id || "1"),
    name: "John Doe",
    age: 34,
    gender: "Male",
    bloodType: "O+",
    phone: "+1-555-0123",
    email: "john.doe@email.com",
    address: "123 Health St, Medical City, MC 12345",
    emergencyContact: "Jane Doe (+1-555-0199)",
    condition: "Hypertension",
    status: "stable",
    riskLevel: "low",
    avatar: "/placeholder.svg",
    joinDate: "2023-06-15"
  };

  const vitals = [
    {
      title: "Heart Rate",
      value: 72,
      unit: "bpm",
      status: "normal" as const,
      trend: "stable" as const,
      icon: Heart,
      lastUpdated: "2 min ago"
    },
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "normal" as const,
      trend: "down" as const,
      icon: Activity,
      lastUpdated: "5 min ago"
    },
    {
      title: "Oxygen Saturation",
      value: 98,
      unit: "%",
      status: "normal" as const,
      trend: "up" as const,
      icon: Droplet,
      lastUpdated: "3 min ago"
    },
    {
      title: "Temperature",
      value: 98.6,
      unit: "°F",
      status: "normal" as const,
      trend: "stable" as const,
      icon: Thermometer,
      lastUpdated: "10 min ago"
    }
  ];

  const medicalHistory = [
    {
      date: "2024-01-15",
      type: "Consultation",
      diagnosis: "Hypertension - Well controlled",
      notes: "Blood pressure stable. Continue current medication. Patient reports feeling well.",
      prescription: "Lisinopril 10mg daily"
    },
    {
      date: "2024-01-08",
      type: "Lab Results",
      diagnosis: "Complete Blood Count - Normal",
      notes: "All blood parameters within normal range. Cholesterol slightly elevated.",
      prescription: "Continue statin therapy"
    },
    {
      date: "2023-12-20",
      type: "Follow-up",
      diagnosis: "Hypertension management",
      notes: "Medication adjustment showing positive results. Patient adherent to treatment plan.",
      prescription: "Increased Lisinopril to 10mg"
    }
  ];

  const currentMedications = [
    {
      medication: "Lisinopril 10mg",
      frequency: "Once daily",
      prescribed: "2024-01-15",
      instructions: "Take with food in the morning"
    },
    {
      medication: "Atorvastatin 20mg",
      frequency: "Once daily",
      prescribed: "2023-12-20",
      instructions: "Take in the evening"
    }
  ];

  const upcomingAppointments = [
    {
      date: "2024-01-22",
      time: "2:00 PM",
      type: "Follow-up",
      status: "confirmed"
    },
    {
      date: "2024-02-15",
      time: "10:30 AM",
      type: "Lab Review",
      status: "scheduled"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-success/10 text-success border-success/20';
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'monitoring': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={patient.avatar} />
              <AvatarFallback className="text-lg">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{patient.name}</h1>
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {patient.age} years old • {patient.gender} • Patient since {new Date(patient.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Appointment
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Update Record
            </Button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Primary Condition</p>
                <p className="font-semibold text-foreground">{patient.condition}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="font-semibold text-foreground">{patient.bloodType}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="font-semibold text-foreground capitalize">{patient.riskLevel}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Last Visit</p>
                <p className="font-semibold text-foreground">Jan 15, 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Vitals */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Current Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitals.map((vital, index) => (
              <VitalCard key={index} {...vital} />
            ))}
          </div>
        </section>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="charts">Vital Charts</TabsTrigger>
          </TabsList>

          {/* Medical History Tab */}
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Medical History</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Record
              </Button>
            </div>
            
            <div className="space-y-4">
              {medicalHistory.map((record, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-foreground">{record.type}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="font-medium text-foreground">{record.diagnosis}</p>
                        <p className="text-sm text-muted-foreground">{record.notes}</p>
                        {record.prescription && (
                          <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm">
                              <span className="font-medium">Prescription:</span> {record.prescription}
                            </p>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Current Medications Tab */}
          <TabsContent value="medications" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Current Medications</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Prescribe Medication
              </Button>
            </div>
            
            <div className="grid gap-4">
              {currentMedications.map((med, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-foreground">{med.medication}</h4>
                        <p className="text-sm text-muted-foreground">
                          {med.frequency} • Prescribed {new Date(med.prescribed).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-foreground">{med.instructions}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Renew</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Upcoming Appointments</h3>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule New
              </Button>
            </div>
            
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{appointment.type}</h4>
                          <Badge variant="outline">{appointment.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Information Tab */}
          <TabsContent value="contact" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{patient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium text-foreground">{patient.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emergency Contact</p>
                    <p className="font-medium text-foreground">{patient.emergencyContact}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Type</p>
                    <p className="font-medium text-foreground">{patient.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Known Allergies</p>
                    <p className="font-medium text-foreground">Penicillin</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Conditions</p>
                    <p className="font-medium text-foreground">{patient.condition}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Insurance</p>
                    <p className="font-medium text-foreground">Blue Cross Blue Shield</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vital Charts Tab */}
          <TabsContent value="charts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs Trends</CardTitle>
                <CardDescription>Historical data visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4" />
                    <p>Vital signs charts would be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
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

export default PatientDetails;