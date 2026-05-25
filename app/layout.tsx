import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CourseHub",
  description: "Next-gen education platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
  href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
      </head>
      <body className="antialiased" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
