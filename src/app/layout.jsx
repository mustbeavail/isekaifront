import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IsekaiSimulator',
  description: '이세계 전생 시뮬레이터',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </head>
      <body>{children}</body>
    </html>
  )
}
