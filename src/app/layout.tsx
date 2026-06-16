import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const fontSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin-ext", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const fontHand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Toán Tồn Tại | Sinh tồn Bằng Toán Học",
  description: "Trò chơi học Toán THPT kết hợp ra quyết định tài chính cá nhân",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${fontSans.variable} ${fontMono.variable} ${fontHand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
