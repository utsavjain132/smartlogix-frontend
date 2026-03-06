import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo/smartlogix_logo.png"; // adjust path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dashboardPaths = [
    "/business-dashboard",
    "/trucker-dashboard",
    "/admin-dashboard",
  ];
  if (token && dashboardPaths.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const dashboardLink =
    role === "BUSINESS"
      ? "/business-dashboard"
      : role === "TRUCKER"
        ? "/trucker-dashboard"
        : "/admin-dashboard";

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/contact-us", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="SmartLogix"
              className="h-8 w-auto object-contain"
            />
            <span className="text-xl font-bold text-slate-900">SmartLogix</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                variant="ghost"
                size="m"
                asChild
                className="text-slate-600 mr-8 hover:text-blue-600 hover:bg-slate-100 "
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}

            {!token ? (
              <Button
                size="sm"
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              >
                <Link to="/login">Login</Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                >
                  <Link to={dashboardLink}>Dashboard</Link>
                </Button>
                <Button
                  size="sm"
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white border-0"
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-slate-100 text-slate-600"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 py-4 px-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                variant="ghost"
                size="sm"
                asChild
                className="justify-start text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to={link.to}>{link.label}</Link>
              </Button>
            ))}

            {!token ? (
              <Button
                size="sm"
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/login">Login</Link>
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="justify-start text-slate-600 hover:text-blue-600 hover:bg-slate-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={dashboardLink}>Dashboard</Link>
                </Button>
                <Button
                  size="sm"
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
