import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Video, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const PatientAppointments = () => {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-15",
      time: "2:00 PM",
      type: "Follow-up",
      status: "confirmed",
      location: "Heart Care Center",
      avatar: "/placeholder.svg",
      isVirtual: false
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Practice",
      date: "2024-01-18",
      time: "10:30 AM",
      type: "Check-up",
      status: "confirmed",
      location: "Virtual Consultation",
      avatar: "/placeholder.svg",
      isVirtual: true
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      date: "2024-01-10",
      time: "3:00 PM",
      type: "Consultation",
      status: "completed",
      location: "Skin Care Institute",
      avatar: "/placeholder.svg",
      isVirtual: false
    },
    {
      id: 4,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-05",
      time: "11:00 AM",
      type: "Initial Consultation",
      status: "completed",
      location: "Heart Care Center",
      avatar: "/placeholder.svg",
      isVirtual: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'completed': return 'bg-muted/50 text-muted-foreground border-muted/20';
      case 'cancelled': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Appointments</h1>
            <p className="text-muted-foreground">Manage your upcoming and past appointments</p>
          </div>
          <Link to="/patient/book-appointment">
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Book New Appointment
            </Button>
          </Link>
        </div>

        <div className="space-y-8">
          {/* Upcoming Appointments */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-2 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.avatar} />
                          <AvatarFallback>
                            {appointment.doctor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{appointment.doctor}</h3>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {appointment.isVirtual ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <MapPin className="h-4 w-4" />
                              )}
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {appointment.isVirtual && (
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {upcomingAppointments.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No upcoming appointments</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule your next appointment to stay on top of your health
                    </p>
                    <Link to="/patient/book-appointment">
                      <Button>Book an Appointment</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Past Appointments */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={appointment.avatar} />
                          <AvatarFallback>
                            {appointment.doctor.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{appointment.doctor}</h3>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Book Follow-up
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;