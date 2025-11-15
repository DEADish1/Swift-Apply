import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swift Apply - Your Personal Job Search Assistant",
  description:
    "Build ATS-friendly resumes, find local and remote jobs, and track your applications with tailored suggestions for each posting.",
  keywords: [
    "job search",
    "resume builder",
    "job applications",
    "career",
    "ATS resume",
    "job tracker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
