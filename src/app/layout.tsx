import type { Metadata } from "next";
import "./globals.css";
import "@/fonts/geist.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { APP_NAME } from "@/config";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "A small application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`flex min-h-full flex-col antialiased`}
      >
        <AuthProvider>
          <Header />
          <main className="container mx-auto flex-grow py-10 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
