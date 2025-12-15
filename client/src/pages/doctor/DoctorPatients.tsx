import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Users, AlertTriangle, Heart, Calendar, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const DoctorPatients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const patients = [
    {
      id: 1,
      name: "John Doe",
      age: 34,
      condition: "Hypertension",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-22",
      status: "stable",
      riskLevel: "low",
      avatar: "/placeholder.svg",
      vitals: {
        heartRate: 72,
        bloodPressure: "120/80",
        lastUpdate: "2 hours ago"
      }
    },
    {
      id: 2,
      name: "Sarah Wilson",
      age: 28,
      condition: "Type 2 Diabetes",
      lastVisit: "2024-01-12",
      nextAppointment: "2024-01-19",
      status: "monitoring",
      riskLevel: "medium",
      avatar: "/placeholder.svg",
      vitals: {
        heartRate: 68,
        bloodPressure: "118/75",
        lastUpdate: "1 hour ago"
      }
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 56,
      condition: "Heart Disease",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-17",
      status: "critical",
      riskLevel: "high",
      avatar: "/placeholder.svg",
      vitals: {
        heartRate: 95,
        bloodPressure: "180/120",
        lastUpdate: "30 min ago"
      }
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 42,
      condition: "Asthma",
      lastVisit: "2024-01-08",
      nextAppointment: "2024-01-25",
      status: "stable",
      riskLevel: "low",
      avatar: "/placeholder.svg",
      vitals: {
        heartRate: 70,
        bloodPressure: "115/70",
        lastUpdate: "4 hours ago"
      }
    },
    {
      id: 5,
      name: "Michael Brown",
      age: 39,
      condition: "Anxiety Disorder",
      lastVisit: "2024-01-14",
      nextAppointment: "2024-01-21",
      status: "improving",
      riskLevel: "low",
      avatar: "/placeholder.svg",
      vitals: {
        heartRate: 74,
        bloodPressure: "122/78",
        lastUpdate: "6 hours ago"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-success/10 text-success border-success/20';
      case 'improving': return 'bg-primary/10 text-primary border-primary/20';
      case 'monitoring': return 'bg-warning/10 text-warning border-warning/20';
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statsData = [
    {
      title: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Critical Cases",
      value: patients.filter(p => p.status === 'critical').length,
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Stable Patients",
      value: patients.filter(p => p.status === 'stable').length,
      icon: Heart,
      color: "text-success"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Patients</h1>
            <p className="text-muted-foreground">Manage and monitor all your patients</p>
          </div>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Add New Patient
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search patients by name or condition..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="space-y-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={patient.avatar} />
                      <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{patient.name}</h3>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{patient.age} years old</span>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">
                        Primary Condition: <span className="font-medium text-foreground">{patient.condition}</span>
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Last Visit: {new Date(patient.lastVisit).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Next: {new Date(patient.nextAppointment).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className={`font-medium ${getRiskColor(patient.riskLevel)}`}>
                          {patient.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {/* Vital Signs */}
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-vitals-heart" />
                        <span className="text-sm font-medium">{patient.vitals.heartRate} bpm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-vitals-bp" />
                        <span className="text-sm font-medium">{patient.vitals.bloodPressure}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{patient.vitals.lastUpdate}</p>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link to={`/doctor/patient/${patient.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium text-foreground mb-2">No patients found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? `No patients match "${searchQuery}"` : "You haven't added any patients yet"}
              </p>
              {!searchQuery && (
                <Button>
                  <Users className="h-4 w-4 mr-2" />
                  Add Your First Patient
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DoctorPatients;