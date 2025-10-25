import { Metadata } from "next";
import { SITE_CONFIG, SEO_CONFIG } from "@/lib/data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EnhancedAbout } from "@/components/sections/EnhancedAbout";
import { AboutSchema } from "@/components/shared/AboutSchema";

export const metadata: Metadata = {
  title: "About Aditya Kumar Tiwari - Cybersecurity Specialist & Full-Stack Developer",
  description: "Bridging Security and Innovation. Learn about Aditya Kumar Tiwari's dual expertise in cybersecurity and full-stack development, certifications, and proven track record in protecting digital assets.",
  keywords: [...SEO_CONFIG.keywords, "about", "cybersecurity specialist", "full-stack developer", "security certifications", "experience", "skills", "dual expertise"],
  openGraph: {
    title: "About Aditya Kumar Tiwari - Cybersecurity Specialist & Full-Stack Developer",
    description: "Bridging Security and Innovation. Cybersecurity Specialist & Full-Stack Developer combining security expertise with cutting-edge development to create innovative, secure solutions for modern businesses.",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "Aditya Kumar Tiwari - Cybersecurity Specialist & Full-Stack Developer",
      },
    ],
    type: "profile",
    firstName: "Aditya Kumar",
    lastName: "Tiwari",
    username: "aditya-cybersecurity",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aditya Kumar Tiwari - Cybersecurity Specialist & Full-Stack Developer",
    description: "Bridging Security and Innovation. Learn about dual expertise in cybersecurity and development with 1+ years of professional experience.",
    images: ["/images/og-about.jpg"],
  },
  alternates: {
    canonical: "https://aditya-cybersecurity.com/about",
  },
};

export default function About() {
  const schemaData = {
    name: "Aditya Kumar Tiwari",
    jobTitle: "Cybersecurity Specialist & Full-Stack Developer",
    description: "Bridging Security and Innovation. Cybersecurity Specialist & Full-Stack Developer combining security expertise with cutting-edge development to create innovative, secure solutions for modern businesses.",
    url: "https://aditya-cybersecurity.com/about",
    image: "https://aditya-cybersecurity.com/images/profile-placeholder.jpg",
    sameAs: [
      "https://linkedin.com/in/aditya-cybersecurity",
      "https://twitter.com/aditya_cyber",
      "https://github.com/aditya-cybersecurity",
      "https://medium.com/@aditya-cybersecurity",
    ],
    alumniOf: "National Institute of Technology",
    knowsAbout: [
      "Cybersecurity",
      "Network Security",
      "Cloud Security",
      "Vulnerability Assessment",
      "Penetration Testing",
      "Incident Response",
      "Risk Assessment",
      "AI/ML Security",
      "Prompt Engineering",
      "Secure Development",
      "Laravel/PHP",
      "API Security",
      "Code Security",
      "Security Architecture",
      "Zero Trust",
      "Compliance",
    ],
  };

  return (
    <>
      {/* Schema Markup */}
      <AboutSchema {...schemaData} />
      
      {/* Header with semantic navigation */}
      <Header />
      
      {/* Enhanced About Section */}
      <EnhancedAbout />
      
      {/* Footer with semantic structure */}
      <Footer />
    </>
  );
}