import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata = {
  title: 'GitBook Documentation',
  description: 'GitBook Starter Template with Vercel Analytics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
