import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const dashboardLink = 
    role === "BUSINESS" ? "/business-dashboard" : 
    role === "TRUCKER" ? "/trucker-dashboard" : 
    "/admin-dashboard";

  return (
    <nav className="bg-white h-20 flex items-center text-lg sticky top-0 z-[999] shadow-sm">
      <div className="flex justify-between items-center h-20 w-full px-10 max-w-none">
        <Link to="/" className="text-[#333] no-underline text-2xl flex items-center font-bold">
          🚛 SmartLogix
        </Link>
        
        <ul className="flex items-center list-none gap-5 m-0 p-0">
          <li className="flex items-center h-20">
            <Button asChild className="bg-[#00796b] hover:bg-[#006054] text-white">
              <Link to="/contact-us">
                Contact Us
              </Link>
            </Button>
          </li>
          <li className="flex items-center h-20">
            <Button asChild className="bg-[#00796b] hover:bg-[#006054] text-white">
              <Link to="/">
                Home
              </Link>
            </Button>
          </li>

          {!token ? (
            <li className="flex items-center h-20">
              <Button asChild className="bg-[#00796b] hover:bg-[#006054] text-white">
                <Link to="/login">
                  Login
                </Link>
              </Button>
            </li>
          ) : (
            <>
              <li className="flex items-center h-20">
                <Button asChild className="bg-[#00796b] hover:bg-[#006054] text-white">
                  <Link to={dashboardLink}>
                    Dashboard
                  </Link>
                </Button>
              </li>
              <li className="flex items-center h-20">
                <Button onClick={handleLogout} className="bg-[#00796b] hover:bg-[#006054] text-white">
                  Logout
                </Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
