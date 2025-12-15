import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, Edit, Trash2, Users } from "lucide-react";

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Mock schedule data
  const timeSlots = [
    "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  const appointments = [
    {
      id: 1,
      time: "9:00 AM",
      patient: "John Doe",
      type: "Follow-up",
      duration: 30,
      status: "confirmed"
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Sarah Wilson",
      type: "Check-up",
      duration: 45,
      status: "confirmed"
    },
    {
      id: 3,
      time: "2:00 PM",
      patient: "Michael Brown",
      type: "Consultation",
      duration: 60,
      status: "pending"
    },
    {
      id: 4,
      time: "3:30 PM",
      patient: "Emma Davis",
      type: "Emergency",
      duration: 30,
      status: "urgent"
    }
  ];

  const weekDays = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success/10 text-success border-success/20';
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'urgent': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const isSlotBooked = (time: string) => {
    return appointments.some(apt => apt.time === time);
  };

  const getAppointmentForSlot = (time: string) => {
    return appointments.find(apt => apt.time === time);
  };

  const stats = [
    {
      title: "Today's Appointments",
      value: appointments.length,
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Available Slots",
      value: timeSlots.length - appointments.length,
      icon: Clock,
      color: "text-success"
    },
    {
      title: "Pending Confirmations",
      value: appointments.filter(a => a.status === 'pending').length,
      icon: Users,
      color: "text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Schedule Management</h1>
            <p className="text-muted-foreground">Manage your appointment schedule and availability</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Set Availability
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Block Time Slot
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar & Date Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Calendar
                </CardTitle>
                <CardDescription>Select a date to view schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mini Calendar - Simplified */}
                  <div className="border rounded-lg p-4">
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-foreground">January 2024</h3>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-xs">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                        <div key={day} className="text-center p-2 text-muted-foreground font-medium">
                          {day}
                        </div>
                      ))}
                      {/* Sample calendar dates */}
                      {Array.from({length: 31}, (_, i) => (
                        <button
                          key={i}
                          className={`text-center p-2 rounded-md hover:bg-muted ${
                            i + 1 === 16 ? 'bg-primary text-primary-foreground' : 'text-foreground'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="h-4 w-4 mr-2" />
                      View Week
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Month
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>January 16, 2024 - Tuesday</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Appointment
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {timeSlots.map((time, index) => {
                    const appointment = getAppointmentForSlot(time);
                    const isBooked = !!appointment;
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                          isBooked ? 'bg-muted/50 border-primary/20' : 'hover:bg-muted/30'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 text-sm font-medium text-muted-foreground">
                            {time}
                          </div>
                          
                          {isBooked && appointment ? (
                            <div className="flex items-center gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-foreground">{appointment.patient}</h4>
                                  <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.type} • {appointment.duration} minutes
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              Available slot
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {isBooked ? (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Book
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Weekly Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weekly Overview</CardTitle>
            <CardDescription>Your schedule for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day, index) => (
                <div key={day} className="space-y-2">
                  <div className="text-center">
                    <h4 className="font-medium text-foreground">{day}</h4>
                    <p className="text-sm text-muted-foreground">
                      Jan {16 + index - 1}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    {/* Sample appointments for each day */}
                    {index === 1 && ( // Tuesday (today)
                      <div className="space-y-1">
                        {appointments.slice(0, 2).map((apt) => (
                          <div key={apt.id} className="text-xs p-2 bg-primary/10 text-primary rounded border-l-2 border-primary">
                            <div>{apt.time}</div>
                            <div className="font-medium">{apt.patient}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {index === 2 && ( // Wednesday
                      <div className="text-xs p-2 bg-success/10 text-success rounded border-l-2 border-success">
                        <div>10:00 AM</div>
                        <div className="font-medium">Lisa Chen</div>
                      </div>
                    )}
                    
                    {index === 4 && ( // Friday
                      <div className="space-y-1">
                        <div className="text-xs p-2 bg-warning/10 text-warning rounded border-l-2 border-warning">
                          <div>9:30 AM</div>
                          <div className="font-medium">Robert Johnson</div>
                        </div>
                        <div className="text-xs p-2 bg-primary/10 text-primary rounded border-l-2 border-primary">
                          <div>2:00 PM</div>
                          <div className="font-medium">Emma Wilson</div>
                        </div>
                      </div>
                    )}
                    
                    {![1, 2, 4].includes(index) && (
                      <div className="text-xs text-muted-foreground text-center py-4">
                        No appointments
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScheduleManagement;