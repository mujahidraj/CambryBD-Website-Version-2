import type { Metadata } from "next";
import "./globals.css";
import NavigationLoader from "@/components/Providers/NavigationLoader";
import ProgressBarProvider from "@/components/Providers/ProgressBarProvider";

export const metadata: Metadata = {
  title: "Cambry — International Admission Centre | Study Abroad Experts",
  description:
    "Cambry is your trusted International Admission Centre. Expert guidance for studying abroad at top universities in the UK, Australia, Canada, Malaysia, New Zealand & more. Free counseling, visa assistance, and university admissions support.",
  keywords: [
    "study abroad",
    "international education",
    "university admissions",
    "student visa",
    "Cambry",
    "admission centre",
    "UK universities",
    "Australia universities",
    "Canada study",
    "Malaysia education",
    "New Zealand study",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden" suppressHydrationWarning>
        <ProgressBarProvider>
          <NavigationLoader />
          {children}
        </ProgressBarProvider>
      </body>
    </html>
  );
}
