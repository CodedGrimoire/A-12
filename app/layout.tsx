import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/auth-context";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care.xyz | Baby Sitting & Elderly Care Service Platform",
  description:
    "Care.xyz makes caregiving easy, secure, and accessible—book trusted caregivers for babysitting, elderly support, and home recovery care.",
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
        <AuthProvider>
          <div className="relative min-h-screen bg-[#f8fbff] text-slate-900">
            <Navbar />
            <main className="pt-0">{children}</main>
            <Footer />
            <Toaster position="top-right" toastOptions={{ duration: 3800 }} />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
