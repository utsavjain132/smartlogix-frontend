import React from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  MapPin,
  BadgeIndianRupee,
  Linkedin,
  Twitter,
  Youtube,
  Truck,
  BarChart3,
  Star,
  ArrowRight,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-700">
      {/* Main Content */}
      <div>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Background gradient orbs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium border border-blue-200">
                  <Zap className="h-4 w-4" />
                  Rule-Based Digital Freight Marketplace
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                  Smarter Freight
                  <br />
                  for India's Roads
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl">
                  SmartLogix connects small truckers and SMEs through a
                  rule-based matching engine — reducing empty backhaul trips,
                  cutting costs, and bringing digital logistics to India's
                  fragmented freight market.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="text-lg px-8 py-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 hover:shadow-xl transition-all duration-300"
                  >
                    <Link to="/signup">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Link to="#demo">Watch Demo</Link>
                  </Button>
                </div>

                {/* Stats — sourced from simulation results in the paper */}
                <div className="flex items-center gap-8 pt-8">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">82%</div>
                    <div className="text-sm text-slate-500">
                      Match Success Rate
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">79%</div>
                    <div className="text-sm text-slate-500">
                      Fleet Utilization
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">23%</div>
                    <div className="text-sm text-slate-500">
                      Empty Backhaul Rate
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero visual - freight illustration */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200/30 rounded-full blur-3xl"></div>
                <div className="relative bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 shadow-2xl">
                  <svg
                    viewBox="0 0 520 420"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                  >
                    {/* Sky / background */}
                    <rect
                      width="520"
                      height="420"
                      rx="16"
                      fill="url(#skyGrad)"
                    />

                    {/* Sun */}
                    <circle
                      cx="420"
                      cy="70"
                      r="38"
                      fill="#FEF9C3"
                      opacity="0.7"
                    />
                    <circle
                      cx="420"
                      cy="70"
                      r="26"
                      fill="#FDE68A"
                      opacity="0.9"
                    />

                    {/* Clouds */}
                    <ellipse
                      cx="80"
                      cy="60"
                      rx="38"
                      ry="16"
                      fill="white"
                      opacity="0.6"
                    />
                    <ellipse
                      cx="108"
                      cy="52"
                      rx="28"
                      ry="18"
                      fill="white"
                      opacity="0.7"
                    />
                    <ellipse
                      cx="58"
                      cy="55"
                      rx="22"
                      ry="14"
                      fill="white"
                      opacity="0.5"
                    />

                    <ellipse
                      cx="290"
                      cy="45"
                      rx="30"
                      ry="13"
                      fill="white"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="314"
                      cy="38"
                      rx="22"
                      ry="15"
                      fill="white"
                      opacity="0.6"
                    />

                    {/* Road */}
                    <rect
                      x="0"
                      y="310"
                      width="520"
                      height="110"
                      rx="0"
                      fill="#CBD5E1"
                    />
                    <rect
                      x="0"
                      y="305"
                      width="520"
                      height="14"
                      fill="#94A3B8"
                    />

                    {/* Road dashes */}
                    {[0, 80, 160, 240, 320, 400].map((x, i) => (
                      <rect
                        key={i}
                        x={x + 10}
                        y="358"
                        width="50"
                        height="8"
                        rx="4"
                        fill="white"
                        opacity="0.5"
                      />
                    ))}

                    {/* Distant hills */}
                    <ellipse
                      cx="130"
                      cy="310"
                      rx="160"
                      ry="60"
                      fill="#BFDBFE"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="390"
                      cy="310"
                      rx="140"
                      ry="50"
                      fill="#C7D2FE"
                      opacity="0.4"
                    />

                    {/* Warehouse / building in bg */}
                    <rect
                      x="340"
                      y="210"
                      width="120"
                      height="100"
                      rx="4"
                      fill="#E2E8F0"
                    />
                    <rect
                      x="340"
                      y="196"
                      width="120"
                      height="20"
                      rx="2"
                      fill="#CBD5E1"
                    />
                    {/* warehouse windows */}
                    <rect
                      x="352"
                      y="224"
                      width="22"
                      height="18"
                      rx="2"
                      fill="#93C5FD"
                      opacity="0.7"
                    />
                    <rect
                      x="384"
                      y="224"
                      width="22"
                      height="18"
                      rx="2"
                      fill="#93C5FD"
                      opacity="0.7"
                    />
                    <rect
                      x="416"
                      y="224"
                      width="22"
                      height="18"
                      rx="2"
                      fill="#93C5FD"
                      opacity="0.7"
                    />
                    {/* warehouse door */}
                    <rect
                      x="376"
                      y="262"
                      width="36"
                      height="48"
                      rx="2"
                      fill="#94A3B8"
                    />
                    {/* warehouse sign */}
                    <rect
                      x="350"
                      y="250"
                      width="64"
                      height="10"
                      rx="2"
                      fill="#BFDBFE"
                    />

                    {/* Trees */}
                    <rect
                      x="316"
                      y="268"
                      width="8"
                      height="38"
                      rx="2"
                      fill="#92400E"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="320"
                      cy="258"
                      rx="16"
                      ry="18"
                      fill="#34D399"
                      opacity="0.7"
                    />
                    <rect
                      x="472"
                      y="274"
                      width="7"
                      height="32"
                      rx="2"
                      fill="#92400E"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="475"
                      cy="265"
                      rx="14"
                      ry="16"
                      fill="#6EE7B7"
                      opacity="0.6"
                    />

                    {/* ── MAIN TRUCK ── */}
                    {/* Trailer */}
                    <rect
                      x="60"
                      y="238"
                      width="220"
                      height="80"
                      rx="6"
                      fill="#1D4ED8"
                    />
                    {/* Trailer highlight stripe */}
                    <rect
                      x="60"
                      y="238"
                      width="220"
                      height="12"
                      rx="6"
                      fill="#3B82F6"
                      opacity="0.6"
                    />
                    {/* Trailer logo panel */}
                    <rect
                      x="90"
                      y="256"
                      width="160"
                      height="44"
                      rx="4"
                      fill="#1E40AF"
                    />
                    <text
                      x="170"
                      y="284"
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="system-ui, sans-serif"
                      letterSpacing="1"
                    >
                      SmartLogix
                    </text>
                    {/* Trailer ribs */}
                    {[110, 150, 190, 230].map((x, i) => (
                      <line
                        key={i}
                        x1={x}
                        y1="238"
                        x2={x}
                        y2="318"
                        stroke="#1E40AF"
                        strokeWidth="1.5"
                        opacity="0.4"
                      />
                    ))}
                    {/* Trailer rear door */}
                    <rect
                      x="254"
                      y="244"
                      width="22"
                      height="68"
                      rx="3"
                      fill="#1E3A8A"
                    />
                    <line
                      x1="265"
                      y1="244"
                      x2="265"
                      y2="312"
                      stroke="#3B82F6"
                      strokeWidth="1"
                      opacity="0.5"
                    />

                    {/* Cab */}
                    <rect
                      x="270"
                      y="254"
                      width="90"
                      height="64"
                      rx="8"
                      fill="#2563EB"
                    />
                    {/* Cab roof */}
                    <path
                      d="M278 254 Q310 230 355 238 L360 254 Z"
                      fill="#1D4ED8"
                    />
                    {/* Windshield */}
                    <path
                      d="M284 252 Q312 234 350 242 L352 252 Z"
                      fill="#BAE6FD"
                      opacity="0.85"
                    />
                    {/* Side window */}
                    <rect
                      x="274"
                      y="260"
                      width="30"
                      height="24"
                      rx="3"
                      fill="#BAE6FD"
                      opacity="0.7"
                    />
                    {/* Cab door line */}
                    <line
                      x1="308"
                      y1="255"
                      x2="308"
                      y2="318"
                      stroke="#1D4ED8"
                      strokeWidth="1.5"
                      opacity="0.5"
                    />
                    {/* Headlights */}
                    <rect
                      x="354"
                      y="272"
                      width="10"
                      height="8"
                      rx="2"
                      fill="#FEF08A"
                    />
                    <rect
                      x="354"
                      y="284"
                      width="10"
                      height="6"
                      rx="2"
                      fill="#FCA5A5"
                      opacity="0.8"
                    />
                    {/* Grill */}
                    <rect
                      x="354"
                      y="292"
                      width="10"
                      height="20"
                      rx="1"
                      fill="#1E3A8A"
                    />
                    {[294, 300, 306, 312].map((y, i) => (
                      <line
                        key={i}
                        x1="354"
                        y1={y}
                        x2="364"
                        y2={y}
                        stroke="#3B82F6"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    ))}
                    {/* Exhaust pipe */}
                    <rect
                      x="266"
                      y="236"
                      width="6"
                      height="22"
                      rx="3"
                      fill="#64748B"
                    />
                    {/* Exhaust smoke */}
                    <circle
                      cx="269"
                      cy="228"
                      r="5"
                      fill="#E2E8F0"
                      opacity="0.5"
                    />
                    <circle
                      cx="272"
                      cy="218"
                      r="7"
                      fill="#E2E8F0"
                      opacity="0.3"
                    />

                    {/* Wheels */}
                    {[96, 158, 296, 340].map((x, i) => (
                      <g key={i}>
                        <circle cx={x} cy="318" r="20" fill="#1E293B" />
                        <circle cx={x} cy="318" r="13" fill="#334155" />
                        <circle cx={x} cy="318" r="6" fill="#64748B" />
                        {[0, 60, 120, 180, 240, 300].map((angle, j) => (
                          <line
                            key={j}
                            x1={x + 6 * Math.cos((angle * Math.PI) / 180)}
                            y1={318 + 6 * Math.sin((angle * Math.PI) / 180)}
                            x2={x + 13 * Math.cos((angle * Math.PI) / 180)}
                            y2={318 + 13 * Math.sin((angle * Math.PI) / 180)}
                            stroke="#94A3B8"
                            strokeWidth="1.5"
                          />
                        ))}
                      </g>
                    ))}

                    {/* ── FLOATING STAT CARDS ── */}
                    {/* Card 1 - Match Rate */}
                    <g>
                      <rect
                        x="18"
                        y="148"
                        width="118"
                        height="54"
                        rx="10"
                        fill="white"
                        filter="url(#shadow)"
                      />
                      <rect
                        x="18"
                        y="148"
                        width="4"
                        height="54"
                        rx="2"
                        fill="#3B82F6"
                      />
                      <text
                        x="32"
                        y="168"
                        fill="#1E40AF"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="system-ui"
                      >
                        Match Rate
                      </text>
                      <text
                        x="32"
                        y="190"
                        fill="#1D4ED8"
                        fontSize="20"
                        fontWeight="800"
                        fontFamily="system-ui"
                      >
                        82%
                      </text>
                    </g>

                    {/* Card 2 - Fleet Utilization */}
                    <g>
                      <rect
                        x="386"
                        y="130"
                        width="124"
                        height="54"
                        rx="10"
                        fill="white"
                        filter="url(#shadow)"
                      />
                      <rect
                        x="386"
                        y="130"
                        width="4"
                        height="54"
                        rx="2"
                        fill="#6366F1"
                      />
                      <text
                        x="400"
                        y="150"
                        fill="#3730A3"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="system-ui"
                      >
                        Fleet Utilization
                      </text>
                      <text
                        x="400"
                        y="172"
                        fill="#4338CA"
                        fontSize="20"
                        fontWeight="800"
                        fontFamily="system-ui"
                      >
                        79%
                      </text>
                    </g>

                    {/* Card 3 - Empty Backhaul */}
                    <g>
                      <rect
                        x="386"
                        y="196"
                        width="124"
                        height="54"
                        rx="10"
                        fill="white"
                        filter="url(#shadow)"
                      />
                      <rect
                        x="386"
                        y="196"
                        width="4"
                        height="54"
                        rx="2"
                        fill="#10B981"
                      />
                      <text
                        x="400"
                        y="216"
                        fill="#065F46"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="system-ui"
                      >
                        Empty Backhaul
                      </text>
                      <text
                        x="400"
                        y="238"
                        fill="#059669"
                        fontSize="20"
                        fontWeight="800"
                        fontFamily="system-ui"
                      >
                        23%
                      </text>
                    </g>

                    {/* ── GPS PIN with pulse ── */}
                    <circle
                      cx="170"
                      cy="200"
                      r="18"
                      fill="#BFDBFE"
                      opacity="0.4"
                    />
                    <circle
                      cx="170"
                      cy="200"
                      r="11"
                      fill="#3B82F6"
                      opacity="0.2"
                    />
                    <path
                      d="M170 182 C160 182 152 190 152 200 C152 212 170 226 170 226 C170 226 188 212 188 200 C188 190 180 182 170 182Z"
                      fill="#2563EB"
                    />
                    <circle cx="170" cy="200" r="5" fill="white" />

                    {/* Route dashed line */}
                    <path
                      d="M170 226 C170 240 200 250 230 250"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      opacity="0.6"
                    />

                    {/* Defs */}
                    <defs>
                      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EFF6FF" />
                        <stop offset="100%" stopColor="#E0E7FF" />
                      </linearGradient>
                      <filter
                        id="shadow"
                        x="-10%"
                        y="-10%"
                        width="120%"
                        height="130%"
                      >
                        <feDropShadow
                          dx="0"
                          dy="3"
                          stdDeviation="4"
                          floodColor="#94A3B8"
                          floodOpacity="0.2"
                        />
                      </filter>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                Built for India's Freight Ecosystem
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                For the 2.5M+ small fleet owners and SMEs left behind by
                traditional platforms.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Bot size={40} className="text-blue-600" />,
                  bg: "bg-blue-100",
                  border: "hover:border-blue-300",
                  hover: "bg-blue-50/50",
                  title: "Rule-Based Matchmaking",
                  points: [
                    "Filters by vehicle type, capacity & proximity",
                    "Matches within 50 km radius",
                    "Fast O(n) logic — no big datasets needed",
                    "3 min matching cut to under 10 seconds",
                  ],
                },
                {
                  icon: <MapPin size={40} className="text-indigo-600" />,
                  bg: "bg-indigo-100",
                  border: "hover:border-indigo-300",
                  hover: "bg-indigo-50/50",
                  title: "Empty Backhaul Reduction",
                  points: [
                    "~33% of India's freight trips run empty",
                    "Matches return loads automatically",
                    "Backhaul rate cut from 37% to 23%",
                    "More earnings per trip for truckers",
                  ],
                },
                {
                  icon: (
                    <BadgeIndianRupee size={40} className="text-purple-600" />
                  ),
                  bg: "bg-purple-100",
                  border: "hover:border-purple-300",
                  hover: "bg-purple-50/50",
                  title: "Transparent Pricing",
                  points: [
                    "No brokers, no hidden cuts",
                    "Data-driven, fair rate model",
                    "Direct market access for SMEs",
                    "Full visibility on every transaction",
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

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                How SmartLogix Works
              </h2>
              <p className="text-xl text-slate-600 max-w-xl mx-auto">
                Three steps to smarter freight.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mb-6 border border-blue-200">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  Post Your Load
                </h3>
                <p className="text-slate-600 text-sm">
                  Enter cargo type, weight, origin, and destination on mobile or
                  web.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center text-2xl font-bold text-indigo-600 mb-6 border border-indigo-200">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  Instant Matching
                </h3>
                <p className="text-slate-600 text-sm">
                  Engine matches compatible trucks nearby in under 10 seconds —
                  no broker needed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-2xl font-bold text-purple-600 mb-6 border border-purple-200">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">
                  Track & Deliver
                </h3>
                <p className="text-slate-600 text-sm">
                  Live GPS updates from pickup to delivery, every step of the
                  way.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900">
                What Our Customers Say
              </h2>
              <p className="text-xl text-slate-600 max-w-xl mx-auto">
                Trusted by truckers, fleet owners, and SMEs across India.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Independent Trucker, UP",
                  content:
                    "No more one-way loads. SmartLogix matches me with return freight automatically — I barely run empty now.",
                },
                {
                  name: "Priya Sharma",
                  role: "Logistics Manager, SME Manufacturer",
                  content:
                    "Direct access to verified truckers, no agents. Matching takes seconds and pricing is fully transparent.",
                },
                {
                  name: "Amit Patel",
                  role: "Small Fleet Owner, Gujarat",
                  content:
                    "Fleet utilization jumped after joining SmartLogix. It actually checks truck type and capacity before assigning.",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-1 text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {testimonial.role}
                      </p>
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
              Ready to move smarter?
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

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
