import { Urbanist } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'
import ClientLayout from './client-layout'
import { AuthProvider } from '@/context/auth-context'

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: "AMORA | Modern Gift Shopping",
    template: "%s | AMORA",
  },
  description: "Discover unique and thoughtful gifts for every occasion.",
  keywords: ["gifts", "shopping", "presents", "occasions", "celebrations"],
  authors: [{ name: "AMORA" }],
  creator: "AMORA",
  metadataBase: new URL("https://amora.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amora.com",
    title: "AMORA | Modern Gift Shopping",
    description: "Discover unique and thoughtful gifts for every occasion.",
    siteName: "AMORA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMORA | Modern Gift Shopping",
    description: "Discover unique and thoughtful gifts for every occasion.",
    creator: "@amoragifts",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  )
}
