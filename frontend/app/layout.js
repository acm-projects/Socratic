import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./components/providers";
import { Plus_Jakarta_Sans } from 'next/font/google'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta'
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} ${jakarta.variable} antialiased`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}