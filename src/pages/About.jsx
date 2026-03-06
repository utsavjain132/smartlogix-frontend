import React from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  Linkedin,
  Twitter,
  Youtube,
  BarChart3,
  Zap,
  Target,
  Lightbulb,
  Globe,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-700">
      <div>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl -z-10"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                <Zap className="h-4 w-4" />
                Our Story
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                Rethinking Freight
                <br />
                for India
              </h1>
              <p className="text-xl text-slate-600">
                India moves 3.8 billion tons of freight every year yet the
                industry still runs on brokers, paperwork, and empty trucks.
                SmartLogix was built to fix that, starting with the small
                operators left behind.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                  <Target className="h-4 w-4" />
                  The Problem
                </div>
                <h2 className="text-4xl font-bold text-slate-900">
                  A Broken Industry at Scale
                </h2>
                <ul className="space-y-3 text-slate-600 text-lg">
                  {[
                    "2.5M+ small fleet owners rely on brokers with no transparency or fair pricing",
                    "~33% of all trips are empty backhauls, wasting fuel and cutting trucker income",
                    "Existing platforms serve large enterprises only, LTL freight and SMEs are ignored",
                    "Fleet utilization in India runs 25% below global benchmarks",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2.5 h-2 w-2 rounded-full bg-blue-500 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    value: "3.8B",
                    label: "Tons of freight moved annually",
                    color: "blue",
                  },
                  {
                    value: "2.5M+",
                    label: "Small fleet owners in the market",
                    color: "indigo",
                  },
                  {
                    value: "~33%",
                    label: "Of all trips run empty",
                    color: "purple",
                  },
                  {
                    value: "25%",
                    label: "Below global utilization benchmarks",
                    color: "blue",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all"
                  >
                    <div
                      className={`text-3xl font-bold text-${stat.color}-600 mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 mb-6">
                <Lightbulb className="h-4 w-4" />
                Our Approach
              </div>
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                Simple, Practical, Built to Scale
              </h2>
              <p className="text-xl text-slate-600 max-w-xl mx-auto">
                Start lightweight. Grow smarter.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Bot size={40} className="text-blue-600" />,
                  bg: "bg-blue-100",
                  border: "hover:border-blue-300",
                  hover: "bg-blue-50/50",
                  title: "Rule-Based Matching",
                  points: [
                    "Filters by vehicle type, capacity, and proximity",
                    "Matches within a 50 km radius",
                    "Fast O(n) logic, no large datasets needed",
                    "Ideal for truckers with no digital history",
                  ],
                },
                {
                  icon: <BarChart3 size={40} className="text-indigo-600" />,
                  bg: "bg-indigo-100",
                  border: "hover:border-indigo-300",
                  hover: "bg-indigo-50/50",
                  title: "Proven Results",
                  points: [
                    "82% match success rate vs 64% manual",
                    "Empty backhaul cut from 37% to 23%",
                    "Fleet utilization up from 61% to 79%",
                    "Matching time down from 3 min to under 10 sec",
                  ],
                },
                {
                  icon: <TrendingUp size={40} className="text-purple-600" />,
                  bg: "bg-purple-100",
                  border: "hover:border-purple-300",
                  hover: "bg-purple-50/50",
                  title: "Built for AI Upgrade",
                  points: [
                    "Rule-based engine is the entry point",
                    "Evolves into heuristic and ML-driven matching",
                    "Collects data as adoption grows",
                    "Designed for incremental optimization",
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`group relative bg-white border border-slate-200 rounded-2xl p-8 ${item.border} hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`absolute inset-0 ${item.hover} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                  ></div>
                  <div className="relative">
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 ${item.bg} rounded-2xl`}>
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 text-center text-slate-900">
                      {item.title}
                    </h3>
                    <ul className="space-y-2">
                      {item.points.map((p, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-slate-600 text-sm"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white border border-slate-200 rounded-2xl p-10 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                <div className="p-4 bg-blue-100 rounded-2xl w-fit mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 text-lg">
                  Make digital freight logistics accessible to every small
                  trucker and SME in India, not just large enterprises.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-10 hover:border-indigo-300 hover:shadow-lg transition-all duration-300">
                <div className="p-4 bg-indigo-100 rounded-2xl w-fit mb-6">
                  <Globe className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 text-lg">
                  An efficient, transparent, and sustainable freight network
                  across India powered by AI, real-time tracking, and multimodal
                  coordination.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 mb-6">
                <TrendingUp className="h-4 w-4" />
                Roadmap
              </div>
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                What's Coming Next
              </h2>
              <p className="text-xl text-slate-600 max-w-xl mx-auto">
                The MVP is the starting point.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "AI & ML Optimization",
                  desc: "Demand forecasting, GBDT match ranking, dynamic load assignment",
                },
                {
                  title: "Real-Time GPS & IoT",
                  desc: "Live route optimization, delay detection, ETA prediction",
                },
                {
                  title: "Digital Payments",
                  desc: "Blockchain-based settlements for transparent, on-time payments",
                },
                {
                  title: "Multi-Objective Routing",
                  desc: "Minimize cost, time, and carbon emissions together",
                },
                {
                  title: "EV Fleet Support",
                  desc: "Integration with electric vehicles for urban logistics",
                },
                {
                  title: "Multimodal Coordination",
                  desc: "Connect road freight with rail and coastal shipping",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 mb-1">
                        {item.title}
                      </p>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-size-[24px_24px]"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Be part of the movement.
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Trucker tired of running empty? Business looking for reliable
              freight? SmartLogix was built for you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-blue-600 hover:bg-slate-100"
              >
                <Link to="/signup?type=trucker">Join as Trucker</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 rounded-full border-2 border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent hover:bg-white/10 text-white"
              >
                <Link to="/signup?type=business">Join as Business Owner</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
