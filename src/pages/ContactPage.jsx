import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "../assets/logo/smartlogix_logo.png"; // adjust path as needed

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs - subtle purple and blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-40 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40 -z-10"></div>

      <div className="w-full max-w-4xl">
        {/* Brand */}
        {/* <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-8 group"
        >
          <img
            src={logo}
            alt="SmartLogix"
            className="h-10 w-auto object-contain"
          />
          <span className="text-2xl font-bold text-slate-900">SmartLogix</span>
        </Link> */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Contact Info with blue to purple gradient */}
            <div className="bg-linear-to-br from-blue-600 to-purple-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-blue-100 mb-8">
                Have questions about SmartLogix? Our team is ready to help you
                optimize your logistics.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/80 text-sm">Email</h3>
                    <p className="text-white">support@smartlogix.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/80 text-sm">Phone</h3>
                    <p className="text-white">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white/80 text-sm">
                      Address
                    </h3>
                    <p className="text-white">
                      123 Main Street
                      <br />
                      Anytown, USA 12345
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="p-8 bg-white">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Send a Message
              </h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="h-11 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="h-11 rounded-lg border-slate-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-slate-700">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md shadow-purple-200"
                >
                  Send Message
                </Button>
              </form>
              <div className="text-center mt-6">
                <Link
                  to="/"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
