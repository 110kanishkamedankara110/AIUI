
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { url } from "inspector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "chat with DynamicBiz",
  description: "Billy-The-Persona-AI-agent-By-Dynamic-Biz",
  icons:{
    icon:[
      {url:'/bot.svg'},
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable}  bg-[#FBFBFB] ${geistMono.variable} antialiased`}
      >
        {children}        
      </body>
    </html>
  );
}
