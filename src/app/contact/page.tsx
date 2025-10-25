import { Metadata } from "next";
import { SITE_CONFIG, SEO_CONFIG } from "@/lib/data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Contact Aditya Kumar Tiwari - Cybersecurity Consultant",
  description: "Get in touch with Aditya Kumar Tiwari for cybersecurity consulting, security assessments, incident response, and cloud security services. Schedule a consultation today.",
  keywords: [...SEO_CONFIG.keywords, "contact", "cybersecurity consultation", "security assessment", "incident response", "cloud security", "hire cybersecurity expert"],
  openGraph: {
    title: "Contact Aditya Kumar Tiwari - Cybersecurity Consultant",
    description: "Get in touch with Aditya Kumar Tiwari for cybersecurity consulting, security assessments, incident response, and cloud security services. Schedule a consultation today.",
    images: [
      {
        url: "/images/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Aditya Kumar Tiwari - Cybersecurity Consultant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aditya Kumar Tiwari - Cybersecurity Consultant",
    description: "Get in touch with Aditya Kumar Tiwari for cybersecurity consulting, security assessments, incident response, and cloud security services. Schedule a consultation today.",
    images: ["/images/og-contact.jpg"],
  },
};

export default function Contact() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />
      
      {/* Main content area */}
      <main className="min-h-screen">
        {/* Hero Section - Contact Overview */}
        <section 
          aria-labelledby="contact-hero-heading"
          className="py-20 bg-gradient-to-r from-navy-900 via-neon-green-900 to-navy-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-neon-green-500/30 rounded-full px-6 py-2 mb-6">
                <svg 
                  className="w-4 h-4 text-neon-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-neon-green-400 font-medium text-sm">
                  Get in Touch
                </span>
              </div>
              <h1 
                id="contact-hero-heading"
                className="text-5xl md:text-6xl font-bold text-white mb-6"
              >
                Let's <span className="text-neon-green-400">Connect</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Ready to enhance your organization's cybersecurity posture? Contact me for 
                consultations, security assessments, incident response planning, and comprehensive 
                security solutions tailored to your specific needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-neon-green-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                  <span>24/7 Availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span>Quick Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-neon-green-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  <span>Expert Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z" 
                    />
                  </svg>
                  <span>99.9% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section 
          aria-labelledby="contact-form-heading"
          className="py-20 bg-navy-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
                <svg 
                  className="w-4 h-4 text-cyan-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-cyan-400 font-medium text-sm">
                  Send a Message
                </span>
              </div>
              <h2 
                id="contact-form-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Contact <span className="text-cyan-400">Form</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Fill out the form below to schedule a consultation or discuss your cybersecurity 
                needs. I'll respond within 24 hours with expert guidance and solutions.
              </p>
            </header>
            
            {/* Contact Form */}
            <form 
              className="max-w-2xl mx-auto"
              aria-label="Contact form for cybersecurity consultation"
            >
              {/* Form Fieldset */}
              <fieldset className="space-y-6 bg-navy-800 border border-navy-700 rounded-lg p-8">
                <legend className="text-lg font-semibold text-white mb-4">
                  Get in Touch
                </legend>
                
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="contact-name" 
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Enter your full name"
                    aria-describedby="name-help"
                  />
                  <p id="name-help" className="mt-1 text-sm text-gray-500">
                    Please provide your complete name for personalized communication.
                  </p>
                </div>
                
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="contact-email" 
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="Enter your email address"
                    aria-describedby="email-help"
                  />
                  <p id="email-help" className="mt-1 text-sm text-gray-500">
                    We'll use this to respond to your inquiry securely.
                  </p>
                </div>
                
                {/* Subject Field */}
                <div>
                  <label 
                    htmlFor="contact-subject" 
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                    placeholder="What can I help you with?"
                    aria-describedby="subject-help"
                  />
                  <p id="subject-help" className="mt-1 text-sm text-gray-500">
                    Brief description of your cybersecurity needs or inquiry.
                  </p>
                </div>
                
                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="contact-message" 
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-vertical"
                    placeholder="Please describe your cybersecurity requirements, project details, or questions..."
                    aria-describedby="message-help"
                  />
                  <p id="message-help" className="mt-1 text-sm text-gray-500">
                    Provide details about your organization, security concerns, and project requirements.
                  </p>
                </div>
                
                {/* Optional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Budget Field */}
                  <div>
                    <label 
                      htmlFor="contact-budget" 
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Estimated Budget
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      aria-describedby="budget-help"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-15k">$5,000 - $15,000</option>
                      <option value="15k-30k">$15,000 - $30,000</option>
                      <option value="30k-50k">$30,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-plus">Over $100,000</option>
                    </select>
                    <p id="budget-help" className="mt-1 text-sm text-gray-500">
                      Help me understand your investment level for tailored solutions.
                    </p>
                  </div>
                  
                  {/* Timeline Field */}
                  <div>
                    <label 
                      htmlFor="contact-timeline" 
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Project Timeline
                    </label>
                    <select
                      id="contact-timeline"
                      name="timeline"
                      className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                      aria-describedby="timeline-help"
                    >
                      <option value="">Select timeline</option>
                      <option value="immediate">Immediate (within 1 week)</option>
                      <option value="1-2-weeks">1-2 weeks</option>
                      <option value="1-month">1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-plus">6+ months</option>
                    </select>
                    <p id="timeline-help" className="mt-1 text-sm text-gray-500">
                      When do you need the security solution implemented?
                    </p>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300 text-sm font-medium"
                    aria-label="Submit contact form for cybersecurity consultation"
                  >
                    <span>Send Message</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 19l9 2-9-17-9 17 9-2zm0 0v-8" 
                      />
                    </svg>
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </section>
        
        {/* Contact Methods Section */}
        <section 
          aria-labelledby="contact-methods-heading"
          className="py-20 bg-navy-800/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-neon-green-500/30 rounded-full px-6 py-2 mb-6">
                <svg 
                  className="w-4 h-4 text-neon-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="text-neon-green-400 font-medium text-sm">
                  Other Contact Methods
                </span>
              </div>
              <h2 
                id="contact-methods-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Other <span className="text-neon-green-400">Contact Methods</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Prefer to reach out through other channels? I'm available on multiple platforms 
                for your convenience and security.
              </p>
            </header>
            
            {/* Contact Methods Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Email Contact */}
              <article 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-neon-green-500 transition-all duration-300"
                role="article"
                aria-labelledby="email-contact-title"
              >
                <header className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-neon-green-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                      />
                    </svg>
                  </div>
                  <h3 
                    id="email-contact-title"
                    className="text-lg font-semibold text-white"
                  >
                    Email
                  </h3>
                </header>
                
                <div className="space-y-2">
                  <a 
                    href="mailto:aditya@cybersecurity.com"
                    className="block text-neon-green-400 hover:text-white transition-colors duration-300"
                    aria-label="Send email to aditya@cybersecurity.com"
                  >
                    aditya@cybersecurity.com
                  </a>
                  <p className="text-gray-400 text-sm">
                    For general inquiries and consultation requests.
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Response within 24 hours</p>
                  <p>Secure email communication</p>
                </div>
              </article>
              
              {/* Phone Contact */}
              <article 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
                role="article"
                aria-labelledby="phone-contact-title"
              >
                <header className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                      />
                    </svg>
                  </div>
                  <h3 
                    id="phone-contact-title"
                    className="text-lg font-semibold text-white"
                  >
                    Phone
                  </h3>
                </header>
                
                <div className="space-y-2">
                  <a 
                    href="tel:+15551234567"
                    className="block text-cyan-400 hover:text-white transition-colors duration-300"
                    aria-label="Call +1 (555) 123-4567"
                  >
                    +1 (555) 123-4567
                  </a>
                  <p className="text-gray-400 text-sm">
                    For urgent security matters and immediate consultation.
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>24/7 availability for emergencies</p>
                  <p>Secure voice communication</p>
                </div>
              </article>
              
              {/* Location Contact */}
              <article 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-neon-green-500 transition-all duration-300"
                role="article"
                aria-labelledby="location-contact-title"
              >
                <header className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-neon-green-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8.001 8.001 0 010-11.314l4.243-4.242a8.001 8.001 0 0111.314 0l4.243 4.242a8.001 8.001 0 010 11.314z" 
                      />
                    </svg>
                  </div>
                  <h3 
                    id="location-contact-title"
                    className="text-lg font-semibold text-white"
                  >
                    Location
                  </h3>
                </header>
                
                <div className="space-y-2">
                  <p className="text-gray-400">
                    New York, NY, USA
                  </p>
                  <p className="text-gray-400 text-sm">
                    Available for on-site consultations and meetings.
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Global remote consultations available</p>
                  <p>On-site visits by appointment</p>
                </div>
              </article>
              
              {/* LinkedIn */}
              <article 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
                role="article"
                aria-labelledby="linkedin-contact-title"
              >
                <header className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <h3 
                    id="linkedin-contact-title"
                    className="text-lg font-semibold text-white"
                  >
                    LinkedIn
                  </h3>
                </header>
                
                <div className="space-y-2">
                  <a 
                    href="https://linkedin.com/in/aditya-cybersecurity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-cyan-400 hover:text-white transition-colors duration-300"
                    aria-label="Visit LinkedIn profile"
                  >
                    linkedin.com/in/aditya-cybersecurity
                  </a>
                  <p className="text-gray-400 text-sm">
                    Professional networking and industry insights.
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Connect for professional discussions</p>
                  <p>Industry updates and articles</p>
                </div>
              </article>
              
              {/* Twitter/X */}
              <article 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-neon-green-500 transition-all duration-300"
                role="article"
                aria-labelledby="twitter-contact-title"
              >
                <header className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-neon-green-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.235.084 4.936 4.936 0 004.604 3.417 9.863 9.863 0 01-6.102 2.417c-1.008 0-2.013-.096-3.018-.288a13.941 13.941 0 007.548 2.097c9.054 0 13.999-7.496 13.999-7.496 0-.113 0-.225 0-.337.969-.695 1.8-1.56 2.448-2.548z"/>
                    </svg>
                  </div>
                  <h3 
                    id="twitter-contact-title"
                    className="text-lg font-semibold text-white"
                  >
                    Twitter/X
                  </h3>
                </header>
                
                <div className="space-y-2">
                  <a 
                    href="https://twitter.com/aditya_cyber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-neon-green-400 hover:text-white transition-colors duration-300"
                    aria-label="Visit Twitter profile @aditya_cyber"
                  >
                    @aditya_cyber
                  </a>
                  <p className="text-gray-400 text-sm">
                    Cybersecurity insights and industry news.
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Real-time security updates</p>
                  <p>Industry thought leadership</p>
                </div>
              </article>
              
              {/* GitHub */}
              <article 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6 hover:border-cyan-500 transition-all duration-300"
                role="article"
                aria-labelledby="github-contact-title"
              >
                <header className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                    <svg 
                      className="w-5 h-5 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.89 1.53 2.338 1.084 2.904.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.027A9.564 9.564 0 0012 6.844c.85.004 1.705.115 2.504.337 1.909-1.297 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.549 1.028 1.032 1.028 2.688 0 0 .614.913.092 1.703 0 0-.007.322-.007.726 0 0 0 0" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 
                    id="github-contact-title"
                    className="text-lg font-semibold text-white"
                  >
                    GitHub
                  </h3>
                </header>
                
                <div className="space-y-2">
                  <a 
                    href="https://github.com/aditya-cybersecurity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-cyan-400 hover:text-white transition-colors duration-300"
                    aria-label="Visit GitHub profile"
                  >
                    github.com/aditya-cybersecurity
                  </a>
                  <p className="text-gray-400 text-sm">
                    Open source security tools and projects.
                  </p>
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  <p>Security tool repositories</p>
                  <p>Code samples and projects</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        
        {/* Security Notice Section */}
        <section 
          aria-labelledby="security-notice-heading"
          className="py-20 bg-navy-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12">
              <header className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-navy-700/80 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-6">
                  <svg 
                    className="w-4 h-4 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span className="text-cyan-400 font-medium text-sm">
                    Security Notice
                  </span>
                </div>
                <h3 
                  id="security-notice-heading"
                  className="text-2xl font-bold text-white mb-4"
                >
                  Secure <span className="text-cyan-400">Communication</span>
                </h3>
                <p className="text-gray-300">
                  All communications are handled with the highest security standards to protect 
                  your sensitive information and maintain confidentiality.
                </p>
              </header>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Communication Security
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>End-to-end encrypted email communication</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-neon-green-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Secure file transfer protocols</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Confidentiality agreements available</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-neon-green-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>GDPR and compliance ready</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Data Protection
                  </h4>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Zero retention policy for sensitive data</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-neon-green-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Regular security audits and monitoring</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-cyan-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Incident response protocols in place</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <svg 
                        className="w-3 h-3 text-neon-green-400 mt-1 flex-shrink-0" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      <span>Compliance with industry standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section 
          aria-labelledby="contact-cta-heading"
          className="py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center">
              <header className="mb-8">
                <h2 
                  id="contact-cta-heading"
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Ready to Secure Your Organization?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Don't wait for a security incident to take action. Contact me today to discuss 
                  your cybersecurity needs and implement proactive protection strategies.
                </p>
              </header>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#contact-form"
                  className="inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300"
                  aria-label="Scroll to contact form"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 19l9 2-9-17-9 17 9-2zm0 0v-8" 
                    />
                  </svg>
                  <span>Send Message</span>
                </a>
                <a 
                  href="tel:+15551234567"
                  className="inline-flex items-center space-x-2 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300"
                  aria-label="Call +1 (555) 123-4567 for immediate consultation"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  <span>Call Now</span>
                </a>
                <a 
                  href="mailto:aditya@cybersecurity.com"
                  className="inline-flex items-center space-x-2 border border-neon-green-500 text-neon-green-400 px-6 py-3 rounded-lg hover:bg-neon-green-500/10 transition-colors duration-300"
                  aria-label="Send email to aditya@cybersecurity.com"
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                    />
                  </svg>
                  <span>Email Me</span>
                </a>
              </div>
              
              {/* Contact Benefits */}
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                  <span className="text-sm">24/7 Availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-neon-green-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <span className="text-sm">Quick Response</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-cyan-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span className="text-sm">Expert Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg 
                    className="w-4 h-4 text-neon-green-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.152-.262-2.28-.76-3.318z" 
                    />
                  </svg>
                  <span className="text-sm">99.9% Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer with semantic structure */}
      <Footer />
    </>
  );
}