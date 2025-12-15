import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Calendar, Clock, MapPin, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: "15 years",
      location: "Heart Care Center",
      avatar: "/placeholder.svg",
      nextAvailable: "Tomorrow 2:00 PM",
      fee: "₹12,000"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Practice",
      rating: 4.9,
      experience: "12 years",
      location: "Family Health Clinic",
      avatar: "/placeholder.svg",
      nextAvailable: "Today 4:30 PM",
      fee: "₹8,000"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      rating: 4.7,
      experience: "10 years",
      location: "Skin Care Institute",
      avatar: "/placeholder.svg",
      nextAvailable: "Friday 10:00 AM",
      fee: "₹9,600"
    }
  ];

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const handleBookAppointment = (doctorName: string, time: string) => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctorName} at ${time} has been confirmed.`
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book an Appointment</h1>
          <p className="text-muted-foreground">Find and book appointments with available doctors</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search for doctors or specialties</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter doctor name or specialty..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button className="mt-6">Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div className="space-y-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Doctor Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={doctor.avatar} />
                      <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                        <p className="text-primary font-medium">{doctor.specialty}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-warning text-warning" />
                          <span>{doctor.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-success border-success">
                          Available {doctor.nextAvailable}
                        </Badge>
                        <span className="text-lg font-semibold text-foreground">{doctor.fee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="lg:w-80">
                    <h4 className="font-medium text-foreground mb-3">Available Times</h4>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookAppointment(doctor.name, time)}
                          className="text-xs"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleBookAppointment(doctor.name, "next available slot")}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;