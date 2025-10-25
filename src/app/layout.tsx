import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./accessibility.css";

// Import accessibility components
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import { ScreenReaderSupport } from "@/components/accessibility/ScreenReaderSupport";
import { KeyboardNavigation } from "@/components/accessibility/KeyboardNavigation";
import { ColorContrast } from "@/components/accessibility/ColorContrast";
import { MotionPreferences } from "@/components/accessibility/MotionPreferences";
import { FocusManagement } from "@/components/accessibility/FocusManagement";
import { ErrorHandling } from "@/components/accessibility/ErrorHandling";

// Import performance components
import { PerformanceProvider } from "@/components/performance/PerformanceProvider";
import { ResourceLoader } from "@/components/performance/ResourceLoader";
import { BundleAnalyzer } from "@/components/performance/BundleAnalyzer";
import { MobileOptimizer } from "@/components/performance/MobileOptimizer";
import { CoreWebVitals } from "@/components/performance/CoreWebVitals";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { MobileResponsive } from "@/components/performance/MobileResponsive";

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
        <PerformanceProvider>
          <ResourceLoader
            criticalResources={[]}
            preloadResources={[]}
            prefetchResources={[]}
            preconnectOrigins={[
              "https://fonts.googleapis.com",
              "https://fonts.gstatic.com"
            ]}
          >
            <BundleAnalyzer>
              <MobileOptimizer>
                <CoreWebVitals>
                  <PerformanceMonitor>
                    <MobileResponsive>
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
                            <ErrorHandling
                              enableAutoCorrection={true}
                              enableValidationAnnouncements={true}
                              enableSecurityValidation={true}
                            >
                              <FocusManagement
                                enableFocusIndicators={true}
                                enableFocusHistory={true}
                                enableKeyboardNavigation={true}
                                defaultIndicatorStyle="custom"
                              >
                                <MotionPreferences
                                  enableAnimationControl={true}
                                  enableMotionToggle={true}
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
                                </MotionPreferences>
                              </FocusManagement>
                            </ErrorHandling>
                          </KeyboardNavigation>
                        </ScreenReaderSupport>
                      </AccessibilityProvider>
                    </MobileResponsive>
                  </PerformanceMonitor>
                </CoreWebVitals>
              </MobileOptimizer>
            </BundleAnalyzer>
          </ResourceLoader>
        </PerformanceProvider>
      </body>
    </html>
  );
}
