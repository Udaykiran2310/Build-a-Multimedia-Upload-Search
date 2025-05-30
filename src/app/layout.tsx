import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Correctly import GeistSans as Geist
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { TooltipProvider } from '@/components/ui/tooltip';

const geistSans = Geist({ // Use the imported Geist directly
  variable: '--font-geist-sans',
  subsets: ['latin'],
  // Removed Geist_Mono as it's not explicitly used/requested for this app
});

export const metadata: Metadata = {
  title: 'File Explorer',
  description: 'Upload, manage, and preview your files securely.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
