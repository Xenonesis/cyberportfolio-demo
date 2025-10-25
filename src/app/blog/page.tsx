import { Metadata } from "next";
import { SITE_CONFIG, SEO_CONFIG } from "@/lib/data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogSection } from "@/components/sections/BlogSection";
import { BLOG_POSTS } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Cybersecurity Blog - Aditya Kumar Tiwari",
  description: "Expert insights and articles on cybersecurity, Zero Trust architecture, cloud security, incident response, and compliance. Stay updated with the latest security trends and best practices.",
  keywords: [...SEO_CONFIG.keywords, "blog", "cybersecurity articles", "security insights", "Zero Trust", "cloud security", "incident response"],
  openGraph: {
    title: "Cybersecurity Blog - Aditya Kumar Tiwari",
    description: "Expert insights and articles on cybersecurity, Zero Trust architecture, cloud security, incident response, and compliance. Stay updated with the latest security trends and best practices.",
    images: [
      {
        url: "/images/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Cybersecurity Blog - Aditya Kumar Tiwari",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cybersecurity Blog - Aditya Kumar Tiwari",
    description: "Expert insights and articles on cybersecurity, Zero Trust architecture, cloud security, incident response, and compliance. Stay updated with the latest security trends and best practices.",
    images: ["/images/og-blog.jpg"],
  },
};

export default function Blog() {
  return (
    <>
      {/* Header with semantic navigation */}
      <Header />
      
      {/* Import and use our new BlogSection component */}
      <main className="min-h-screen">
        {/* We'll replace the existing blog content with our new BlogSection component */}
        <BlogSection
          initialPosts={BLOG_POSTS}
          showFeatured={true}
          showNewsletter={true}
          postsPerPage={9}
        />
      </main>
      
      {/* Footer with semantic structure */}
      <Footer />
    </>
  );
}