import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Portfolio of Nam Le - High-performance Machine Learning Systems and Core Backend Engineer.',
  title: 'Nam Le | Portfolio Catalog',
  icons: {
    icon: '/logo.png',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
