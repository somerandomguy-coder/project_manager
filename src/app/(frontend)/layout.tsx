import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Simple self-hosted project catalog managed from Payload admin.',
  title: 'Project Catalog CMS',
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
