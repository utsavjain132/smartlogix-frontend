import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";
import { Eye, EyeOff, Bot } from "lucide-react";
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="w-full max-w-lg">
        {/* Brand with improved logo */}
        {/* <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <div className="h-10 w-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200 transition-transform group-hover:scale-105">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900">SmartLogix</span>
        </Link> */}

        <Card className="border border-slate-200 shadow-xl rounded-2xl mt-20">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-3xl font-bold text-center text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-slate-500 text-base">
              {step === 1 ? "Sign up to get started" : "Complete your profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={step === 1 ? handleNext : handleFinalSignup}
              className="space-y-5"
            >
              {error && (
                <div className="p-3  text-sm text-red-600 bg-red-50 rounded-lg border border-red-200 text-center">
                  {error}
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-slate-700 font-medium"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-slate-700 font-medium"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-slate-700 font-medium"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      I am a:
                    </Label>
                    <RadioGroup
                      value={role}
                      onValueChange={setRole}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="TRUCKER"
                          id="role-trucker"
                          className="border-slate-300 text-blue-600"
                        />
                        <Label
                          htmlFor="role-trucker"
                          className="font-normal text-slate-700 cursor-pointer"
                        >
                          Trucker
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="BUSINESS"
                          id="role-business"
                          className="border-slate-300 text-blue-600"
                        />
                        <Label
                          htmlFor="role-business"
                          className="font-normal text-slate-700 cursor-pointer"
                        >
                          Business
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-base shadow-md shadow-blue-200 mt-4"
                  >
                    Next
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  {role === "BUSINESS" ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="businessName"
                            className="text-slate-700 font-medium"
                          >
                            Business Name
                          </Label>
                          <Input
                            id="businessName"
                            name="businessName"
                            type="text"
                            value={profileData.businessName}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="businessType"
                            className="text-slate-700 font-medium"
                          >
                            Business Type
                          </Label>
                          <Input
                            id="businessType"
                            name="businessType"
                            type="text"
                            placeholder="e.g. Distributor"
                            value={profileData.businessType}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="contactPerson"
                            className="text-slate-700 font-medium"
                          >
                            Contact Person
                          </Label>
                          <Input
                            id="contactPerson"
                            name="contactPerson"
                            type="text"
                            value={profileData.contactPerson}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="contactPhone"
                            className="text-slate-700 font-medium"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="contactPhone"
                            name="contactPhone"
                            type="text"
                            value={profileData.contactPhone}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="city"
                            className="text-slate-700 font-medium"
                          >
                            City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            value={profileData.city}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="state"
                            className="text-slate-700 font-medium"
                          >
                            State
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            type="text"
                            value={profileData.state}
                            onChange={handleProfileChange}
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label
                          htmlFor="vehicleType"
                          className="text-slate-700 font-medium"
                        >
                          Vehicle Type
                        </Label>
                        <Input
                          id="vehicleType"
                          name="vehicleType"
                          type="text"
                          placeholder="e.g. Semi-Truck"
                          value={profileData.vehicleType}
                          onChange={handleProfileChange}
                          required
                          className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="capacity"
                            className="text-slate-700 font-medium"
                          >
                            Capacity (tons)
                          </Label>
                          <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={profileData.capacity}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="city"
                            className="text-slate-700 font-medium"
                          >
                            Current City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            value={profileData.city}
                            onChange={handleProfileChange}
                            required
                            className="h-11 rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-4 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-200"
                    >
                      Create Account
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
            {step === 1 && (
              <div className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Log in
                </Link>
              </div>
            )}
            <div className="text-center text-sm text-slate-600">
              Back to{" "}
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
