import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VitalCard } from "@/components/VitalCard";
import { Heart, Droplet, Thermometer, Activity, Calendar, FileText, Bot, Settings, Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const PatientDashboard = () => {
  const { user } = useAuth();

  // Mock vital signs data
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

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Tomorrow",
      time: "2:00 PM",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      date: "Friday",
      time: "10:30 AM",
      type: "Check-up"
    }
  ];

  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule with available doctors",
      icon: Calendar,
      link: "/patient/book-appointment",
      color: "text-primary"
    },
    {
      title: "Medical Documents",
      description: "Upload & view X-rays, reports",
      icon: Upload,
      link: "/patient/documents",
      color: "text-info"
    },
    {
      title: "Medical History",
      description: "View your complete records",
      icon: FileText,
      link: "/patient/medical-history",
      color: "text-success"
    },
    {
      title: "AI Health Assistant",
      description: "Get symptom advice",
      icon: Bot,
      link: "/patient/ai-chatbot",
      color: "text-warning"
    },
    {
      title: "Profile & Settings",
      description: "Manage your account",
      icon: Settings,
      link: "/patient/profile",
      color: "text-muted-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Here's your health overview for today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live monitoring active</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Vital Signs */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Live Vital Signs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vitals.map((vital, index) => (
              <VitalCard
                key={index}
                {...vital}
              />
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Upcoming Appointments
                  </CardTitle>
                  <CardDescription>Your scheduled visits</CardDescription>
                </div>
                <Link to="/patient/appointments">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{appointment.doctor}</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {appointment.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                ))}
                
                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                    <Link to="/patient/book-appointment">
                      <Button>Book Your First Appointment</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your health journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.link} className="block">
                    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <div>
                        <h4 className="font-medium text-foreground">{action.title}</h4>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Health Insights */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-success" />
                Health Insights
              </CardTitle>
              <CardDescription>Based on your recent data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-success">Excellent Heart Rate</h4>
                  <p className="text-sm text-muted-foreground">
                    Your resting heart rate has been consistently in the healthy range.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Good Blood Pressure</h4>
                  <p className="text-sm text-muted-foreground">
                    Your blood pressure readings show improvement over the past week.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-warning">Reminder</h4>
                  <p className="text-sm text-muted-foreground">
                    Don't forget to take your evening medication at 8 PM today.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default PatientDashboard;