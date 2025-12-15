import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Clock, Users, Stethoscope, Calendar, Activity, CheckCircle2, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroModern from "@/assets/hero-modern.png";
import featureConnect from "@/assets/feature-connect.png";
import featureMonitor from "@/assets/feature-monitor.png";

const LandingPage = () => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Track vitals instantly with medical-grade accuracy using connected devices.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI-powered appointment management that respects your time.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your medical data is encrypted with the highest security standards.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      icon: Stethoscope,
      title: "AI Diagnostics",
      description: "Preliminary symptom checking powered by advanced medical AI.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Navbar with Glassmorphism */}
      <nav className="fixed w-full z-50 top-0 border-b border-white/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-primary to-blue-600 p-2 rounded-xl shadow-lg shadow-primary/20">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Smart Health
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How it works</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="hover:bg-primary/5">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 rounded-full px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Video */}
        {/* Background Video */}
        <div className="fixed inset-0 min-h-screen w-full h-full overflow-hidden -z-20">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px]"></div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3 animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase">The Future of Healthcare</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Healthcare <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600 animate-gradient">Reimagined</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Experience the next generation of medical care. Connect with top specialists, track your vitals in real-time, and manage your health with AI-powered insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform bg-gradient-to-r from-primary to-blue-600 border-0">
                    Start Your Journey
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg hover:bg-secondary/50 backdrop-blur-sm border-2">
                    <Play className="mr-2 h-4 w-4 fill-current" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold text-foreground">10k+</div>
                  <div className="text-sm text-muted-foreground">Active Patients</div>
                </div>
                <div className="w-px h-12 bg-border/50"></div>
                <div>
                  <div className="text-3xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
                <div className="w-px h-12 bg-border/50"></div>
                <div>
                  <div className="text-3xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10"></div>
                <img
                  src={heroModern}
                  alt="Modern Healthcare Interface"
                  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Floating Glass Cards */}
                <div className="absolute -left-6 top-1/4 z-20 animate-bounce duration-[3000ms]">
                  <div className="bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
                    <div className="bg-red-500/20 p-2 rounded-full">
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Heart Rate</p>
                      <p className="text-lg font-bold">72 BPM</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-6 bottom-1/3 z-20 animate-bounce duration-[4000ms] delay-700">
                  <div className="bg-background/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Status</p>
                      <p className="text-lg font-bold text-green-500">Normal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">Complete Healthcare Ecosystem</h2>
            <p className="text-muted-foreground text-lg">Everything you need to manage your health journey in one integrated platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group relative border-0 bg-background/50 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardContent className="p-6 relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connection Section */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
              <img src={featureConnect} alt="Patient Doctor Connection" className="w-full h-full object-cover" />
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Direct Connection with <br />
                <span className="text-primary">Medical Experts</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                No more waiting rooms or long phone queues. Connect directly with your healthcare providers through our secure encrypted channel.
              </p>

              <div className="space-y-4">
                {[
                  " instant chat with assigned doctors",
                  "Secure file sharing for reports",
                  "Video consultations on demand",
                  "Automated follow-up reminders"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/register">
                <Button variant="outline" className="mt-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                  Learn more about connections <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Section */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Advanced Analytics for <br />
                <span className="text-primary">Better Health</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Turn your health data into actionable insights. Our AI analyzes your vitals to detect trends and provide personalized recommendations.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm font-medium">Continuous Monitoring</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                  <div className="text-sm font-medium">Uptime Reliability</div>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10">
              <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
              <img src={featureMonitor} alt="Health Analytics Dashboard" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* User Type Selection (CTA) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-90"></div>
          {/* Abstract Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Health?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Join thousands of users who have already taken control of their well-being. Choose your path below.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer group">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="p-4 rounded-full bg-white/10 mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">I am a Patient</h3>
                <p className="text-blue-100 mb-6">Monitor health, book appointments, and chat with doctors.</p>
                <Link to="/register?role=patient" className="w-full">
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                    Join as Patient
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer group">
              <CardContent className="p-8 flex flex-col items-center">
                <div className="p-4 rounded-full bg-white/10 mb-6 group-hover:scale-110 transition-transform">
                  <Stethoscope className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">I am a Doctor</h3>
                <p className="text-blue-100 mb-6">Manage patients, schedules, and expand your practice.</p>
                <Link to="/register?role=doctor" className="w-full">
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                    Join as Doctor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Heart className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold">Smart Health</span>
            </div>

            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Smart Health Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;