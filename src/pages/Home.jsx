import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, MapPin, BadgeIndianRupee, Linkedin, Twitter, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 font-sans text-foreground">
      {/* Hero Section */}
      <header className="flex flex-col items-center py-20 text-center animate-in fade-in duration-1000">
        <div className="flex-1 w-full max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Optimizing Freight Logistics with Smart AI Rules
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect truckers and businesses instantly for efficient, cost-effective, and rule-based freight delivery.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6 rounded-lg shadow-lg hover:-translate-y-1 transition-all">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
        <div className="hero-illustration">
          {/* Placeholder for illustration */}
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-md text-center hover:-translate-y-2 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-4">
              <Bot size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Rule-Based Matchmaking</h3>
            <p className="text-muted-foreground">Smart freight allocation logic ensures the best fit for every load, optimizing routes and costs.</p>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-md text-center hover:-translate-y-2 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-4">
              <MapPin size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
            <p className="text-muted-foreground">Gain complete visibility with live GPS tracking of your shipment from pickup to delivery.</p>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-md text-center hover:-translate-y-2 hover:shadow-xl transition-all">
            <div className="flex justify-center mb-4">
              <BadgeIndianRupee size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fair Pricing System</h3>
            <p className="text-muted-foreground">Our transparent, data-driven pricing model ensures competitive rates for both businesses and truckers.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white p-16 rounded-xl shadow-md text-center my-16">
        <h2 className="text-4xl font-bold mb-4">Ready to move smarter?</h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">Join SmartLogix and optimize your logistics today.</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button asChild variant="secondary" className="text-lg px-8 py-6 rounded-lg shadow-lg hover:-translate-y-1 transition-all">
            <Link to="/signup?type=trucker">
              Join as Trucker
            </Link>
          </Button>
          <Button asChild className="text-lg px-8 py-6 rounded-lg border border-primary-foreground/20 shadow-lg hover:-translate-y-1 transition-all">
            <Link to="/signup?type=business">
              Join as Business Owner
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-border mt-8">
        <p className="mb-4">&copy; 2025 SmartLogix. All rights reserved.</p>
        <div className="flex justify-center gap-4">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"><Linkedin size={24} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"><Twitter size={24} /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary hover:scale-110 transition-all"><Youtube size={24} /></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
