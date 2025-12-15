import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, AlertTriangle, Clock, Search, Heart, Activity } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { user } = useAuth();

  const todayAppointments = [
    {
      id: 1,
      patient: "John Doe",
      time: "9:00 AM",
      type: "Check-up",
      status: "confirmed",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      patient: "Sarah Wilson",
      time: "10:30 AM",
      type: "Follow-up",
      status: "confirmed",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      patient: "Michael Brown",
      time: "2:00 PM",
      type: "Consultation",
      status: "pending",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      patient: "Emma Davis",
      time: "3:30 PM",
      type: "Emergency",
      status: "urgent",
      avatar: "/placeholder.svg"
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      patient: "Robert Johnson",
      alert: "High Blood Pressure",
      value: "180/120 mmHg",
      time: "5 min ago",
      severity: "critical"
    },
    {
      id: 2,
      patient: "Lisa Chen",
      alert: "Low Heart Rate",
      value: "45 bpm",
      time: "12 min ago",
      severity: "warning"
    },
    {
      id: 3,
      patient: "David Miller",
      alert: "High Temperature",
      value: "102.5°F",
      time: "18 min ago",
      severity: "warning"
    }
  ];

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Total Patients",
      value: 247,
      icon: Users,
      color: "text-success"
    },
    {
      title: "Critical Alerts",
      value: criticalAlerts.length,
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Pending Reviews",
      value: 12,
      icon: Clock,
      color: "text-warning"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'urgent': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-destructive text-destructive bg-destructive/5';
      case 'warning': return 'border-warning text-warning bg-warning/5';
      default: return 'border-muted text-muted-foreground bg-muted/5';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning, {user?.name}!</h1>
            <p className="text-muted-foreground">You have {todayAppointments.length} appointments today</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Stats Overview */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
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
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Today's Schedule
                  </CardTitle>
                  <CardDescription>Your appointments for today</CardDescription>
                </div>
                <Link to="/doctor/schedule">
                  <Button variant="outline" size="sm">Manage Schedule</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={appointment.avatar} />
                        <AvatarFallback>{appointment.patient.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {appointment.time} • {appointment.type}
                        </p>
                      </div>
                    </div>
                    <Link to={`/doctor/patient/${appointment.id}`}>
                      <Button size="sm" variant="outline">
                        View Patient
                      </Button>
                    </Link>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Critical Alerts */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Critical Alerts
                </CardTitle>
                <CardDescription>Patients requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-2 ${getSeverityColor(alert.severity)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{alert.patient}</h4>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm font-medium">{alert.alert}</p>
                    <p className="text-lg font-bold">{alert.value}</p>
                    <Button size="sm" className="w-full mt-2">
                      Review Patient
                    </Button>
                  </div>
                ))}
                
                {criticalAlerts.length === 0 && (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-success mx-auto mb-4" />
                    <p className="text-success font-medium">All patients stable</p>
                    <p className="text-sm text-muted-foreground">No critical alerts at this time</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions & Patient Metrics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Link to="/doctor/patients">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Patients
                  </Button>
                </Link>
                <Link to="/doctor/schedule">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Manage Schedule
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="h-4 w-4 mr-2" />
                  Health Analytics
                </Button>
                <Link to="/doctor/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Profile Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest patient updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-foreground">Updated prescription for John Doe</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-foreground">Reviewed lab results for Sarah Wilson</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-foreground">Completed consultation with Michael Brown</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;