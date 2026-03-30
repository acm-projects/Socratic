import './globals.css';

export const metadata = {
  title: 'Socratic Tutor Web',
  description: 'A basic frontend for the Socratic CLI logic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased font-sans flex flex-col items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
