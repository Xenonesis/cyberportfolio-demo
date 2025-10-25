import { Metadata } from "next";
import { SITE_CONFIG, SEO_CONFIG, PROJECTS } from "@/lib/data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cybersecurity Portfolio - Aditya Kumar Tiwari",
  description: "View my cybersecurity portfolio showcasing successful security implementations, enterprise overhauls, cloud migrations, and penetration testing projects.",
  keywords: [...SEO_CONFIG.keywords, "portfolio", "case studies", "cybersecurity projects", "security implementations", "enterprise security"],
  openGraph: {
    title: "Cybersecurity Portfolio - Aditya Kumar Tiwari",
    description: "View my cybersecurity portfolio showcasing successful security implementations, enterprise overhauls, cloud migrations, and penetration testing projects.",
    images: [
      {
        url: "/images/og-portfolio.jpg",
        width: 1200,
        height: 630,
        alt: "Cybersecurity Portfolio - Aditya Kumar Tiwari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Portfolio - Aditya Kumar Tiwari",
    description: "View my cybersecurity portfolio showcasing successful security implementations, enterprise overhauls, cloud migrations, and penetration testing projects.",
    images: ["/images/og-portfolio.jpg"],
  },
};

export default function Portfolio() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />
      
      {/* Main content area */}
      <main className="min-h-screen">
        {/* Hero Section - Portfolio Overview */}
        <section 
          aria-labelledby="portfolio-hero-heading"
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h8a2 2 0 012 2v2M7 7h10" 
                  />
                </svg>
                <span className="text-neon-green-400 font-medium text-sm">
                  Project Showcase
                </span>
              </div>
              <h1 
                id="portfolio-hero-heading"
                className="text-5xl md:text-6xl font-bold text-white mb-6"
              >
                Cybersecurity <span className="text-neon-green-400">Portfolio</span>
              </h1>
              <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Explore successful cybersecurity implementations that have protected organizations, 
                prevented data breaches, and established robust security frameworks across various industries.
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span>50+ Projects</span>
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
                  <span>Global Clients</span>
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                    />
                  </svg>
                  <span>Compliance Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Project Gallery Section */}
        <section 
          aria-labelledby="project-gallery-heading"
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h8a2 2 0 012 2v2M7 7h10" 
                  />
                </svg>
                <span className="text-cyan-400 font-medium text-sm">
                  Project Gallery
                </span>
              </div>
              <h2 
                id="project-gallery-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                Featured <span className="text-cyan-400">Projects</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                A curated selection of successful cybersecurity implementations showcasing my expertise 
                in enterprise security, cloud migration, and threat mitigation strategies.
              </p>
            </header>
            
            {/* Filter Navigation */}
            <nav 
              aria-label="Project categories"
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <button 
                className="px-4 py-2 bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors duration-300 text-sm font-medium"
                aria-pressed="true"
              >
                All Projects
              </button>
              <button 
                className="px-4 py-2 bg-navy-700 text-gray-400 rounded-lg hover:bg-navy-600 transition-colors duration-300 text-sm font-medium"
                aria-pressed="false"
              >
                Enterprise
              </button>
              <button 
                className="px-4 py-2 bg-navy-700 text-gray-400 rounded-lg hover:bg-navy-600 transition-colors duration-300 text-sm font-medium"
                aria-pressed="false"
              >
                Cloud Security
              </button>
              <button 
                className="px-4 py-2 bg-navy-700 text-gray-400 rounded-lg hover:bg-navy-600 transition-colors duration-300 text-sm font-medium"
                aria-pressed="false"
              >
                Financial
              </button>
              <button 
                className="px-4 py-2 bg-navy-700 text-gray-400 rounded-lg hover:bg-navy-600 transition-colors duration-300 text-sm font-medium"
                aria-pressed="false"
              >
                Healthcare
              </button>
            </nav>
            
            {/* Project Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((project) => (
                <article 
                  key={project.id}
                  className="bg-navy-800 border border-navy-700 rounded-lg overflow-hidden hover:border-cyan-500 transition-all duration-300"
                  role="article"
                  aria-labelledby={`project-${project.id}-title`}
                >
                  {/* Project Image/Preview */}
                  <div className="relative h-48 bg-gradient-to-r from-cyan-600 to-neon-green-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg 
                        className="w-16 h-16 text-white opacity-20" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        {project.category.includes('enterprise') && (
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h8a2 2 0 012 2v2M7 7h10" 
                          />
                        )}
                        {project.category.includes('cloud') && (
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.97V10h1a2 2 0 012 2v4a2 2 0 01-2 2h-2.5a1 1 0 01-.8-.4L12 16.8l-1.7 1.6a1 1 0 01-.8.4H7a2 2 0 01-2-2v-4a2 2 0 012-2h1zm0 0a3 3 0 003 3h6a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8z" 
                          />
                        )}
                        {project.category.includes('financial') && (
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1} 
                            d="M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                          />
                        )}
                      </svg>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6">
                    <header className="mb-4">
                      <h3 
                        id={`project-${project.id}-title`}
                        className="text-lg font-semibold text-white mb-2"
                      >
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {project.subtitle}
                      </p>
                    </header>
                    
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies Used */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-300 mb-2">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-1 bg-navy-700 text-gray-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-navy-700 text-gray-500 text-xs rounded">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Project Categories */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.category.map((category) => (
                        <span 
                          key={category}
                          className="px-2 py-1 bg-cyan-600/20 text-cyan-400 text-xs rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project Results */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-300 mb-2">
                        Key Results:
                      </h4>
                      <ul className="space-y-1">
                        {project.results.slice(0, 2).map((result, index) => (
                          <li 
                            key={index}
                            className="flex items-start space-x-1 text-green-400 text-xs"
                          >
                            <svg 
                              className="w-2 h-2 text-green-400 mt-1 flex-shrink-0" 
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
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* CTA Buttons */}
                    <footer className="flex space-x-2">
                      {project.caseStudy && (
                        <a 
                          href={project.caseStudy}
                          className="flex-1 bg-navy-700 text-gray-300 text-xs px-3 py-1 rounded hover:bg-cyan-600/20 hover:text-cyan-400 transition-colors duration-300 text-center"
                          aria-label={`Read case study for ${project.title}`}
                        >
                          Case Study
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-navy-700 text-gray-300 text-xs px-3 py-1 rounded hover:bg-neon-green-600/20 hover:text-neon-green-400 transition-colors duration-300 text-center"
                          aria-label={`View live project for ${project.title}`}
                        >
                          Live Demo
                        </a>
                      )}
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        
        {/* Client Testimonials Section */}
        <section 
          aria-labelledby="testimonials-heading"
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.477 8-10 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.477-8 10-8s10 3.582 10 8z" 
                  />
                </svg>
                <span className="text-neon-green-400 font-medium text-sm">
                  Client Testimonials
                </span>
              </div>
              <h2 
                id="testimonials-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                What <span className="text-neon-green-400">Clients Say</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Hear from industry leaders and executives who have benefited from my cybersecurity 
                expertise and successful project implementations.
              </p>
            </header>
            
            {/* Testimonials Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <blockquote 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6"
                cite="https://example.com/testimonial1"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">SJ</span>
                  </div>
                  <div>
                    <cite className="text-white font-semibold">Sarah Johnson</cite>
                    <p className="text-gray-400 text-sm">CEO, TechManufacture Inc.</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "Aditya's enterprise security overhaul transformed our entire security posture. 
                  The 75% reduction in security incidents and successful SOC 2 compliance 
                  achievement exceeded our expectations. His expertise in Zero Trust architecture 
                  is truly exceptional."
                </p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path 
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" 
                      />
                    </svg>
                  ))}
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-500">Enterprise Security Overhaul Project</span>
                </div>
              </blockquote>
              
              {/* Testimonial 2 */}
              <blockquote 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6"
                cite="https://example.com/testimonial2"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neon-green-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">MC</span>
                  </div>
                  <div>
                    <cite className="text-white font-semibold">Dr. Michael Chen</cite>
                    <p className="text-gray-400 text-sm">CTO, HealthCare Plus</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "The cloud migration security project was critical for our HIPAA compliance. 
                  Aditya's deep understanding of AWS security and patient data protection ensured 
                  a seamless transition with zero data breaches. His attention to detail and 
                  strategic approach are unmatched."
                </p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path 
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" 
                      />
                    </svg>
                  ))}
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-500">Cloud Migration Security Project</span>
                </div>
              </blockquote>
              
              {/* Testimonial 3 */}
              <blockquote 
                className="bg-navy-700 border border-navy-600 rounded-lg p-6"
                cite="https://example.com/testimonial3"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-neon-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">LR</span>
                  </div>
                  <div>
                    <cite className="text-white font-semibold">Lisa Rodriguez</cite>
                    <p className="text-gray-400 text-sm">Security Director, Global Bank Corp.</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  "Aditya's penetration testing revealed critical vulnerabilities that could have 
                  cost us millions. His comprehensive report and 90-day remediation plan provided 
                  clear actionable steps. The board was impressed with his professionalism and 
                  technical expertise."
                </p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      className="w-4 h-4 text-yellow-400" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path 
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292z" 
                      />
                    </svg>
                  ))}
                </div>
                <div className="mt-3">
                  <span className="text-xs text-gray-500">Financial Institution Penetration Test</span>
                </div>
              </blockquote>
            </div>
          </div>
        </section>
        
        {/* Project Metrics Section */}
        <section 
          aria-labelledby="project-metrics-heading"
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                  />
                </svg>
                <span className="text-cyan-400 font-medium text-sm">
                  Project Metrics
                </span>
              </div>
              <h2 
                id="project-metrics-heading"
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                <span className="text-cyan-400">Impactful Results</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Quantifiable improvements and security enhancements achieved through my cybersecurity 
                implementations across various industries and organization sizes.
              </p>
            </header>
            
            {/* Metrics Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Security Incidents Reduction */}
              <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">75%</div>
                <div className="text-gray-400 text-sm mb-1">Average Reduction</div>
                <div className="text-gray-500 text-xs">Security Incidents</div>
                <div className="mt-3">
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-neon-green-600 h-2 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Threat Detection Improvement */}
              <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-neon-green-400 mb-2">50%</div>
                <div className="text-gray-400 text-sm mb-1">Improvement</div>
                <div className="text-gray-500 text-xs">Threat Detection Time</div>
                <div className="mt-3">
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-neon-green-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: '50%' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Compliance Success Rate */}
              <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">100%</div>
                <div className="text-gray-400 text-sm mb-1">Success Rate</div>
                <div className="text-gray-500 text-xs">Compliance Achievements</div>
                <div className="mt-3">
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-neon-green-600 h-2 rounded-full"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Client Satisfaction */}
              <div className="bg-navy-800 border border-navy-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-gray-400 text-sm mb-1">Satisfaction</div>
                <div className="text-gray-500 text-xs">Client Rating</div>
                <div className="mt-3">
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: '95%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section 
          aria-labelledby="portfolio-cta-heading"
          className="py-20 bg-gradient-to-r from-navy-900 via-cyan-900 to-navy-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-navy-800/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-8 md:p-12 text-center">
              <header className="mb-8">
                <h2 
                  id="portfolio-cta-heading"
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Ready to Transform Your Security?
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Let's discuss how I can help implement comprehensive cybersecurity solutions 
                  that protect your organization and deliver measurable results like those showcased here.
                </p>
              </header>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/contact"
                  className="inline-flex items-center space-x-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-500 transition-colors duration-300"
                  aria-label="Schedule a cybersecurity consultation"
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
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8v6a2 2 0 002 2h8a2 2 0 002-2v-6m-6 0V9a2 2 0 012-2h4a2 2 0 012 2v7h-4m-6-9h8M8 19l4-4 4 4M0 20h24" 
                    />
                  </svg>
                  <span>Schedule Consultation</span>
                </a>
                <a 
                  href="/services"
                  className="inline-flex items-center space-x-2 border border-cyan-500 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-500/10 transition-colors duration-300"
                  aria-label="Explore cybersecurity services"
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span>View Services</span>
                </a>
                <a 
                  href="/about"
                  className="inline-flex items-center space-x-2 border border-neon-green-500 text-neon-green-400 px-6 py-3 rounded-lg hover:bg-neon-green-500/10 transition-colors duration-300"
                  aria-label="Learn about cybersecurity expertise"
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  <span>Learn About Me</span>
                </a>
              </div>
              
              {/* Project Statistics */}
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707v4.586a2 2 0 01-2 2z" 
                    />
                  </svg>
                  <span className="text-sm">50+ Projects Completed</span>
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
                  <span className="text-sm">24/7 Support</span>
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
                  <span className="text-sm">Expert Consultation</span>
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