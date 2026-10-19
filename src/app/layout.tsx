import type { Metadata } from "next";
import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeForge Runner | Intelligent Document & Contract Intelligence",
  description: "AI-driven contract processing, compliance analysis, OCR, and audit pipelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex bg-[#f8fafc] text-slate-800 antialiased font-sans">
        <Suspense fallback={<div className="w-64 bg-white border-r border-slate-200" />}>
          <Sidebar />
        </Suspense>
        <main className="flex-1 min-w-0 overflow-y-auto min-h-screen">
          <Suspense fallback={<div className="p-8 text-xs text-slate-400">Loading...</div>}>
            {children}
          </Suspense>
        </main>
      </body>
    </html>
  );
}
