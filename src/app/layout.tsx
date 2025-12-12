import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "TFA mvp - demo",
  description:
    "the demo exhibition of the ideated trust friends association online experience",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        {children}</body>
      
    </html>
  );
}
