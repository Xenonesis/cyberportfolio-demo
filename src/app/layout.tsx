import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./accessibility.css";

// Import accessibility components
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { ScreenReaderSupport } from "@/components/accessibility/ScreenReaderSupport";
import { KeyboardNavigation } from "@/components/accessibility/KeyboardNavigation";
import { ColorContrast } from "@/components/accessibility/ColorContrast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aditya Kumar Tiwari - Cybersecurity Expert",
  description: "Expert cybersecurity consultant specializing in enterprise security, incident response, and cloud security solutions.",
  keywords: ["cybersecurity", "security consultant", "incident response", "cloud security", "enterprise security"],
  openGraph: {
    title: "Aditya Kumar Tiwari - Cybersecurity Expert",
    description: "Expert cybersecurity consultant with 7+ years of experience protecting organizations from cyber threats.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Aditya Kumar Tiwari - Cybersecurity Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar Tiwari - Cybersecurity Expert",
    description: "Expert cybersecurity consultant with 7+ years of experience.",
    images: ["/images/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AccessibilityProvider enableTesting={true} enableSecurityAlerts={true}>
          <ScreenReaderSupport
            enableLiveRegions={true}
            enableARIAEnhancements={true}
            enableSemanticEnhancements={true}
          >
            <KeyboardNavigation
              enableSkipLinks={true}
              enableFocusTrapping={true}
              enableKeyboardShortcuts={true}
              enableTabOrder={true}
            >
              <ColorContrast
                enableAutoAdjustment={true}
                enableContrastToggle={true}
                enableContrastMonitoring={true}
                minNormalContrast={4.5}
                minLargeContrast={3.0}
              >
                {children}
              </ColorContrast>
            </KeyboardNavigation>
          </ScreenReaderSupport>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
