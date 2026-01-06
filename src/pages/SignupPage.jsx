import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../services/api";
import "./SignupPage.css";
import EyeIcon from "../assets/icons/eye.svg";
import EyeOffIcon from "../assets/icons/eye-off.svg";

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
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>{step === 1 ? "Sign up to get started" : "Complete your profile"}</p>
        </div>

        <form className="signup-form" onSubmit={step === 1 ? handleNext : handleFinalSignup}>
          {error && <p className="error-message">{error}</p>}

          {step === 1 && (
            <>
              <div className="input-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    <img
                      src={showPassword ? EyeOffIcon : EyeIcon}
                      alt="Toggle password visibility"
                    />
                  </button>
                </div>
              </div>

              <div className="input-group">
                <label>I am a:</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="TRUCKER"
                      checked={role === "TRUCKER"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    Trucker
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="BUSINESS"
                      checked={role === "BUSINESS"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    Business
                  </label>
                </div>
              </div>

              <button type="submit" className="btn-signup">
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {role === "BUSINESS" ? (
                <>
                  <div className="input-group">
                    <label htmlFor="businessName">Business Name</label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      value={profileData.businessName}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="businessType">Business Type</label>
                    <input
                      id="businessType"
                      name="businessType"
                      type="text"
                      placeholder="e.g. Distributor"
                      value={profileData.businessType}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="contactPerson">Contact Person</label>
                    <input
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      value={profileData.contactPerson}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="contactPhone">Phone Number</label>
                    <input
                      id="contactPhone"
                      name="contactPhone"
                      type="text"
                      value={profileData.contactPhone}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="state">State</label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={profileData.state}
                      onChange={handleProfileChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="input-group">
                    <label htmlFor="vehicleType">Vehicle Type</label>
                    <input
                      id="vehicleType"
                      name="vehicleType"
                      type="text"
                      placeholder="e.g. Semi-Truck"
                      value={profileData.vehicleType}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="capacity">Capacity (tons)</label>
                    <input
                      id="capacity"
                      name="capacity"
                      type="number"
                      value={profileData.capacity}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="city">Current City</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      required
                    />
                  </div>
                </>
              )}

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="btn-signup">
                  Create Account
                </button>
              </div>
            </>
          )}
        </form>

        {step === 1 && (
          <div className="login-link">
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        )}

        <div className="home-link">
          <p>
            Back to <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;