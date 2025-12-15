import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, User, ArrowRight, Loader2, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [maskedEmail, setMaskedEmail] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      toast({ variant: "destructive", title: "Error", description: "Please enter your Email or ID" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier })
      });
      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        const successMsg = data.message || "Please check your email for the verification code.";
        setMaskedEmail(successMsg);
        toast({ title: "OTP Sent", description: successMsg });
      } else {
        toast({ variant: "destructive", title: "Failed", description: data.message || "User not found" });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Connection failed" });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verify OTP & Login
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast({ variant: "destructive", title: "Error", description: "Please enter the OTP" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, code: otp })
      });
      const data = await res.json();

      if (res.ok && data.status === 'approved') {
        if (data.user) {
          localStorage.setItem('healthMonitorUser', JSON.stringify(data.user));
          localStorage.setItem('healthMonitorToken', data.token || 'dummy-token');

          toast({ title: "Login Successful", description: `Welcome back, ${data.user.name}` });
          navigate(data.user.role === 'doctor' ? "/doctor/dashboard" : "/patient/dashboard");
        } else {
          toast({ variant: "destructive", title: "User not found", description: "Account retrieval failed." });
        }
      } else {
        toast({ variant: "destructive", title: "Invalid OTP", description: data.message || "Please try again." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Verification failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">

        {/* Left Side - Hero Section */}
        <div className="hidden lg:flex flex-col justify-between bg-[#1e293b] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="bg-gradient-to-tr from-blue-500 to-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Smart Health Sync</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight mb-6">
              Access Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Digital Health Hub
              </span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Securely manage your appointments, view vital statistics, and consult with doctors from anywhere.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 mt-12">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1e293b] bg-slate-600"></div>
              ))}
            </div>
            <div>
              <p className="font-bold text-white">10k+ Protected Patients</p>
              <p className="text-xs text-slate-400">Join our secure network</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center bg-white/50">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="px-0 pb-6 text-center">
              <div className="lg:hidden mx-auto mb-6 bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white fill-white" />
              </div>
              <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-base">
                {!otpSent ? "Login with your Email or ID" : maskedEmail}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="identifier" className="text-sm font-medium ml-1">Identity</Label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-blue-500 transition-colors" />
                      <Input
                        id="identifier"
                        placeholder="Email / Patient ID / Doctor ID"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="h-12 pl-11 bg-muted/30 border-input/50 focus:border-blue-500 transition-all font-medium"
                        autoFocus
                      />
                    </div>
                    <p className="text-xs text-muted-foreground ml-1">
                      We will send an OTP to your registered email
                    </p>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-12 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-base font-semibold transition-all hover:scale-[1.02]">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Get Verification Code"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium ml-1">Verification Code</Label>
                    <div className="relative group">
                      <div className="absolute left-3 top-3.5 h-5 w-5 flex items-center justify-center text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                        <span className="font-mono font-bold text-xs tracking-widest">OTP</span>
                      </div>
                      <Input
                        id="otp"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="h-12 pl-11 bg-muted/30 border-input/50 focus:border-blue-500 transition-all font-medium tracking-widest"
                        autoFocus
                        maxLength={6}
                      />
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <p className="text-xs text-muted-foreground">Code expires in 10 minutes</p>
                      <button type="button" onClick={() => setOtpSent(false)} className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                        Change Email?
                      </button>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 text-base font-semibold transition-all hover:scale-[1.02]">
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verify & Login"}
                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              )}

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  New to Smart Health Sync?{" "}
                  <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                    Create your free account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;