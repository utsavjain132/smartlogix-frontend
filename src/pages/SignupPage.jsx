import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignupPage = () => {
  // Step 1 State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("BUSINESS");

  // Step 2 State (Profile Data)
  const [profileData, setProfileData] = useState({
    businessName: "",
    businessType: "",
    contactPerson: "",
    contactPhone: "",
    city: "",
    state: "",
    vehicleType: "",
    capacity: "",
  });

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all basic fields.");
      toast.warn("Please fill in all basic fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setError("");
    setStep(1);
  };

  const handleFinalSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Register User
      await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password, role }),
      });

      // 2. Login User
      const loginData = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      const token = loginData.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // 3. Create Profile
      let profilePayload = {};
      let endpoint = "";

      if (role === "BUSINESS") {
        endpoint = "/business/profile";
        profilePayload = {
          businessName: profileData.businessName,
          businessType: profileData.businessType,
          contactPerson: profileData.contactPerson,
          contactPhone: profileData.contactPhone,
          location: {
            city: profileData.city,
            state: profileData.state,
          },
        };
      } else if (role === "TRUCKER") {
        endpoint = "/trucker/profile";
        profilePayload = {
          vehicleType: profileData.vehicleType,
          capacity: Number(profileData.capacity),
          currentLocation: {
            city: profileData.city,
          },
        };
      }

      if (endpoint) {
        await apiRequest(endpoint, {
          method: "POST",
          body: JSON.stringify(profilePayload),
        });
      }

      toast.success("Account created successfully!");

      // 4. Redirect
      if (role === "BUSINESS") {
        navigate("/business-dashboard");
      } else if (role === "TRUCKER") {
        navigate("/trucker-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center text-slate-500">
            {step === 1 ? "Sign up to get started" : "Complete your profile"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={step === 1 ? handleNext : handleFinalSignup} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-center">
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-500" />
                      )}
                      <span className="sr-only">Toggle password visibility</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={setRole}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="TRUCKER" id="role-trucker" />
                      <Label htmlFor="role-trucker" className="font-normal cursor-pointer">
                        Trucker
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BUSINESS" id="role-business" />
                      <Label htmlFor="role-business" className="font-normal cursor-pointer">
                        Business
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button type="submit" className="w-full mt-4">
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                {role === "BUSINESS" ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input
                          id="businessName"
                          name="businessName"
                          type="text"
                          value={profileData.businessName}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="businessType">Business Type</Label>
                        <Input
                          id="businessType"
                          name="businessType"
                          type="text"
                          placeholder="e.g. Distributor"
                          value={profileData.businessType}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                          id="contactPerson"
                          name="contactPerson"
                          type="text"
                          value={profileData.contactPerson}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Phone Number</Label>
                        <Input
                          id="contactPhone"
                          name="contactPhone"
                          type="text"
                          value={profileData.contactPhone}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          value={profileData.city}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          type="text"
                          value={profileData.state}
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Input
                        id="vehicleType"
                        name="vehicleType"
                        type="text"
                        placeholder="e.g. Semi-Truck"
                        value={profileData.vehicleType}
                        onChange={handleProfileChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity (tons)</Label>
                        <Input
                          id="capacity"
                          name="capacity"
                          type="number"
                          value={profileData.capacity}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Current City</Label>
                        <Input
                          id="city"
                          name="city"
                          type="text"
                          value={profileData.city}
                          onChange={handleProfileChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-4 pt-2">
                  <Button type="button" variant="outline" className="w-full" onClick={handleBack}>
                    Back
                  </Button>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {step === 1 && (
            <div className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </div>
          )}
          <div className="text-center text-sm text-slate-600">
            Back to{" "}
            <Link to="/" className="text-primary hover:underline font-medium">
              Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignupPage;