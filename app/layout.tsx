import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adarsh',
  description: 'Develop by Adarsh',
  generator: 'AdarshsinghDev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
