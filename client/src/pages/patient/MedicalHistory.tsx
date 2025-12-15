import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, Pill, Activity, TestTube } from "lucide-react";

const MedicalHistory = () => {
  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      prescribedBy: "Dr. Sarah Johnson",
      date: "2024-01-10",
      duration: "30 days",
      instructions: "Take once daily with food",
      status: "active"
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      prescribedBy: "Dr. Michael Chen",
      date: "2024-01-05",
      duration: "90 days",
      instructions: "Take twice daily before meals",
      status: "active"
    }
  ];

  const labReports = [
    {
      id: 1,
      testName: "Complete Blood Count",
      date: "2024-01-12",
      doctor: "Dr. Sarah Johnson",
      results: "Normal",
      status: "completed"
    },
    {
      id: 2,
      testName: "Lipid Panel",
      date: "2024-01-08",
      doctor: "Dr. Michael Chen",
      results: "Slightly Elevated",
      status: "completed"
    },
    {
      id: 3,
      testName: "HbA1c",
      date: "2024-01-05",
      doctor: "Dr. Michael Chen",
      results: "Normal",
      status: "completed"
    }
  ];

  const consultationHistory = [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      diagnosis: "Hypertension - Well controlled",
      notes: "Blood pressure stable. Continue current medication.",
      type: "Follow-up"
    },
    {
      id: 2,
      date: "2024-01-10",
      doctor: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      diagnosis: "Eczema",
      notes: "Prescribed topical steroid. Follow up in 2 weeks.",
      type: "Consultation"
    },
    {
      id: 3,
      date: "2024-01-05",
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      diagnosis: "Type 2 Diabetes - Well managed",
      notes: "HbA1c levels good. Continue current treatment plan.",
      type: "Check-up"
    }
  ];

  const vitalTrends = [
    {
      vital: "Blood Pressure",
      currentValue: "120/80 mmHg",
      trend: "Stable",
      lastMonth: "125/85 mmHg",
      status: "normal"
    },
    {
      vital: "Heart Rate",
      currentValue: "72 bpm",
      trend: "Improved",
      lastMonth: "78 bpm",
      status: "normal"
    },
    {
      vital: "Weight",
      currentValue: "165 lbs",
      trend: "Decreased",
      lastMonth: "170 lbs",
      status: "normal"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success border-success/20';
      case 'completed': return 'bg-primary/10 text-primary border-primary/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Improved': return 'text-success';
      case 'Stable': return 'text-primary';
      case 'Decreased': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Medical History</h1>
            <p className="text-muted-foreground">Your complete health records and medical timeline</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="vitals">Vital Trends</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Lab results uploaded</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Prescription updated</p>
                        <p className="text-xs text-muted-foreground">5 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Appointment completed</p>
                        <p className="text-xs text-muted-foreground">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-success" />
                    Health Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Blood Type</p>
                        <p className="font-medium text-foreground">O+</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Allergies</p>
                        <p className="font-medium text-foreground">Penicillin</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Conditions</p>
                        <p className="font-medium text-foreground">Hypertension</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Emergency Contact</p>
                        <p className="font-medium text-foreground">Jane Doe</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="space-y-4">
            {consultationHistory.map((consultation) => (
              <Card key={consultation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{consultation.doctor}</h3>
                        <Badge variant="outline">{consultation.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(consultation.date).toLocaleDateString()}</span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium text-foreground">Diagnosis:</p>
                          <p className="text-sm text-muted-foreground">{consultation.diagnosis}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Notes:</p>
                          <p className="text-sm text-muted-foreground">{consultation.notes}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-4">
            {prescriptions.map((prescription) => (
              <Card key={prescription.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Pill className="h-8 w-8 text-primary" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{prescription.medication}</h3>
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Prescribed by {prescription.prescribedBy}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {new Date(prescription.date).toLocaleDateString()}</span>
                          <span>Duration: {prescription.duration}</span>
                        </div>
                        <p className="text-sm text-foreground font-medium">{prescription.instructions}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Lab Reports Tab */}
          <TabsContent value="lab-reports" className="space-y-4">
            {labReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <TestTube className="h-8 w-8 text-success" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{report.testName}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Ordered by {report.doctor}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Date: {new Date(report.date).toLocaleDateString()}</span>
                          <span className="font-medium text-foreground">Results: {report.results}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Vital Trends Tab */}
          <TabsContent value="vitals" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vitalTrends.map((vital, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{vital.vital}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{vital.currentValue}</p>
                        <p className={`text-sm font-medium ${getTrendColor(vital.trend)}`}>
                          {vital.trend}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Previous: {vital.lastMonth}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MedicalHistory;