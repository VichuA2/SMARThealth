import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User, Phone, Briefcase, MapPin, Activity, Award, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "patient" as UserRole,
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    alternativePhone: "",
    gender: "",

    // Patient Specific
    adhaar: "",
    address: "",
    bloodGroup: "",
    age: "",
    dateOfBirth: "",
    height: "",
    weight: "",

    // Doctor Specific
    hospital: "",
    branch: "",
    speciality: "",
    qualification: "",
    experience: "",
    doctorId: ""
  });

  /* Password Validation State */
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    threeOfFour: false,
    noTripleRepeat: false,
  });

  const validatePassword = (pass: string) => {
    const rules = {
      length: pass.length >= 8,
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
      noTripleRepeat: !/(.)\1\1/.test(pass),
    };

    const typeCount = [rules.lower, rules.upper, rules.number, rules.special].filter(Boolean).length;

    return {
      length: rules.length,
      threeOfFour: typeCount >= 3,
      noTripleRepeat: rules.noTripleRepeat,
      isValid: rules.length && typeCount >= 3 && rules.noTripleRepeat
    };
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pass = e.target.value;
    setFormData(prev => ({ ...prev, password: pass }));
    const validation = validatePassword(pass);
    setPasswordValidation({
      length: validation.length,
      threeOfFour: validation.threeOfFour,
      noTripleRepeat: validation.noTripleRepeat,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.password || !formData.confirmPassword) {
      toast({ variant: "destructive", title: "Error", description: "Please fill all fields" });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ variant: "destructive", title: "Error", description: "Passwords do not match" });
      return;
    }

    const validation = validatePassword(formData.password);
    if (!validation.isValid) {
      toast({ variant: "destructive", title: "Weak Password", description: "Please ensure password meets all criteria." });
      return;
    }
    setStep(2);
  };

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registeredId, setRegisteredId] = useState("");
  const [countdown, setCountdown] = useState(30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.phone) {
      toast({ variant: "destructive", title: "Error", description: "Email and Phone are required" });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        toast({ variant: "destructive", title: "Registration failed", description: data.message || "Please check your details." });
      } else {
        // Success Logic
        setRegisteredId(formData.role === 'doctor' ? data.doctorId : data.patientId);
        setRegistrationSuccess(true);
        toast({ title: "Account Created", description: "Registration successful!" });

        // Start Countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate("/login");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Connection failed. Please try again." });
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 lg:p-8 overflow-hidden font-sans">
      {/* Global Video Background */}
      <div className="fixed inset-0 min-h-screen w-full h-full overflow-hidden -z-50">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
      </div>

      <Card className="w-full max-w-6xl shadow-2xl border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden flex flex-col lg:flex-row h-full lg:h-[85vh] text-white">
        {/* Left Panel - Branding & Steps */}
        <div className="lg:w-1/3 bg-black/20 p-8 lg:p-12 relative flex flex-col justify-between border-r border-white/10">

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                <Heart className="h-6 w-6 text-blue-400 fill-blue-400" />
              </div>
              <span className="text-xl font-bold tracking-tight">Smart Health Monitor</span>
            </div>

            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-white/10 space-y-8">
                {/* Step 1 Indicator */}
                <div className={`relative transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 ${step === 1 ? 'bg-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 border-slate-600'}`}>
                    {step > 1 && <CheckCircle2 className="w-full h-full text-white" />}
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Account Setup</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">Create your secure credentials and select your role.</p>
                </div>

                {/* Step 2 Indicator */}
                <div className={`relative transition-all duration-300 ${step === 2 ? 'opacity-100' : 'opacity-60'}`}>
                  <div className={`absolute -left-[33px] top-0 w-4 h-4 rounded-full border-2 ${step === 2 ? 'bg-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-slate-800 border-slate-600'}`}></div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Profile Details</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {formData.role === 'doctor' ? 'Professional information, specialization, and clinic details.' : 'Personal health profile and contact information.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8">
            <p className="text-sm text-slate-400">
              Already have an account? <br />
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 mt-2 group">
                Sign In Here <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Form Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12 bg-transparent text-white scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <h2 className="text-2xl font-bold text-white mb-6">
            {registrationSuccess ? "Registration Successful!" : (step === 1 ? "Let's get started" : (formData.role === 'doctor' ? "Doctor Profile" : "Patient Profile"))}
          </h2>

          {registrationSuccess ? (
            <div className="space-y-6 animate-in zoom-in duration-300">
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>

                <h3 className="text-xl font-semibold text-green-400">Welcome to Smart Health!</h3>
                <p className="text-slate-300">Your account has been created successfully.</p>

                <div className="bg-black/40 p-4 rounded-lg border border-white/10 my-4">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Your {formData.role === 'doctor' ? 'Doctor' : 'Patient'} ID</p>
                  <p className="text-3xl font-mono font-bold text-white tracking-widest">{registeredId}</p>
                  <p className="text-xs text-slate-500 mt-2">Please save this ID. You will need it to login.</p>
                </div>

                <p className="text-sm text-slate-400">
                  Redirecting to login in <span className="text-white font-bold">{countdown}s</span>...
                </p>
              </div>

              <Button onClick={() => navigate("/login")} className="w-full h-12 bg-white text-black hover:bg-slate-200">
                Go to Login Now
              </Button>
            </div>
          ) : (
            <form onSubmit={step === 1 ? handleNextStep : handleSubmit} className="space-y-6 max-w-2xl">
              {step === 1 ? (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-200">Full Name</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Full Name" className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-200">Role</Label>
                      <Select onValueChange={(val) => handleChange('role', val)} defaultValue={formData.role}>
                        <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-colors">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patient">Patient</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-200">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                        <Input id="password" type="password" value={formData.password} onChange={handlePasswordChange} className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" placeholder="Min 8 chars" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-200">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" value={formData.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" placeholder="Confirm" />
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-lg border border-white/10 space-y-2">
                    <h4 className="text-xs font-semibold text-slate-300 mb-2">Password Requirements:</h4>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">At least 8 characters</span>
                      <span className={passwordValidation.length ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                        {passwordValidation.length ? "Pass" : "Fail"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 max-w-[200px]">At least 3 of the following: Lowercase, Uppercase, Numbers, Special Chars</span>
                      <span className={passwordValidation.threeOfFour ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                        {passwordValidation.threeOfFour ? "Pass" : "Fail"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">No more than 2 identical characters in a row</span>
                      <span className={passwordValidation.noTripleRepeat ? "text-green-400 font-bold" : "text-red-400 font-bold"}>
                        {passwordValidation.noTripleRepeat ? "Pass" : "Fail"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in slide-in-from-right duration-300">
                  {/* Section 1: Contact Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-blue-400 uppercase flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Contact Information
                    </h3>
                    <Separator className="bg-white/10" />
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-200">Mobile Number</Label>
                        <Input id="phone" value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91..." className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-200">Email Address</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="name@example.com" className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Role Specific Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-blue-400 uppercase flex items-center gap-2">
                      {formData.role === 'doctor' ? <Briefcase className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      {formData.role === 'doctor' ? 'Professional Details' : 'Personal Details'}
                    </h3>
                    <Separator className="bg-white/10" />

                    {formData.role === 'doctor' ? (
                      <>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="hospital" className="text-slate-200">Hospital Name</Label>
                            <div className="relative">
                              <Activity className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                              <Input id="hospital" value={formData.hospital} onChange={(e) => handleChange('hospital', e.target.value)} className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-slate-200">Location / Address</Label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                              <Input id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="branch" className="text-slate-200">Branch</Label>
                            <Input id="branch" value={formData.branch} onChange={(e) => handleChange('branch', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-slate-200">Gender</Label>
                            <Select onValueChange={(val) => handleChange('gender', val)}>
                              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-colors"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="speciality" className="text-slate-200">Speciality</Label>
                            <Select onValueChange={(val) => handleChange('speciality', val)}>
                              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-colors"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cardiology">Cardiology</SelectItem>
                                <SelectItem value="dermatology">Dermatology</SelectItem>
                                <SelectItem value="general">General Physician</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="qualification" className="text-slate-200">Qualification</Label>
                            <div className="relative">
                              <Award className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                              <Input id="qualification" value={formData.qualification} onChange={(e) => handleChange('qualification', e.target.value)} className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      // Patient Form
                      <>
                        <div className="grid md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <Label htmlFor="age" className="text-slate-200">Age</Label>
                            <Input id="age" type="number" value={formData.age} onChange={(e) => handleChange('age', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="gender" className="text-slate-200">Gender</Label>
                            <Select onValueChange={(val) => handleChange('gender', val)}>
                              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-colors"><SelectValue placeholder="Select" /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-slate-200">Address</Label>
                          <Input id="address" value={formData.address} onChange={(e) => handleChange('address', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bloodGroup" className="text-slate-200">Blood Group</Label>
                            <Select onValueChange={(val) => handleChange('bloodGroup', val)}>
                              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white focus:bg-white/10 transition-colors"><SelectValue placeholder="BG" /></SelectTrigger>
                              <SelectContent>
                                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                  <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="height" className="text-slate-200">Height</Label>
                            <Input id="height" value={formData.height} onChange={(e) => handleChange('height', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" placeholder="cm" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weight" className="text-slate-200">Weight</Label>
                            <Input id="weight" value={formData.weight} onChange={(e) => handleChange('weight', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" placeholder="kg" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="adhaar" className="text-slate-200">Aadhaar Number</Label>
                          <Input id="adhaar" value={formData.adhaar} onChange={(e) => handleChange('adhaar', e.target.value)} className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:bg-white/10 transition-colors" placeholder="1234 5678 9012" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                {step === 2 && (
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-32 h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">Previous</Button>
                )}
                <Button type="submit" className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 border-0" disabled={isLoading}>
                  {step === 1 ? "Next Step" : (isLoading ? "Creating Account..." : "Create Account")}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;