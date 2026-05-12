import type { Metadata } from 'next';
import { Playfair_Display, Inter, Baloo_Chettan_2 } from 'next/font/google';
import './globals.css';
import { APP_NAME, APP_DESCRIPTION, APP_URL } from '@/lib/constants';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthGuard } from '@/components/auth/AuthGuard';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const balooChettan = Baloo_Chettan_2({
  variable: '--font-malayalam',
  subsets: ['malayalam'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — Premium Indian Spices`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: APP_NAME,
    title: `${APP_NAME} — Premium Indian Spices`,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} — Premium Indian Spices`,
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${balooChettan.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <LanguageProvider>
            <AuthGuard>
              <ConditionalLayout>{children}</ConditionalLayout>
            </AuthGuard>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
