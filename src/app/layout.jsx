import ReduxProvider from "./ReduxProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from 'react'

export const metadata = {
  title: '이세계 전생 시뮬레이터',
  description: '내가 이세계에 전생한다면?',
  openGraph: {
    title: '이세계 전생 시뮬레이터',
    description: '내가 이세계에 전생한다면?',
    url: 'https://isekaireincarnation.com',
    siteName: '이세계 전생 시뮬레이터',
    images: [
      {
        url: 'https://isekaireincarnation.com/thumbnail.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Condiment&family=Fugaz+One&family=Jua&family=Lavishly+Yours&family=Mea+Culpa&family=Saira+Stencil+One&display=swap" rel="stylesheet"/>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1397643175532190"
                crossorigin="anonymous">
        </script>
      </head>
      <body>
        <ReduxProvider>
          <Suspense>
            {children}
            <Toaster position="bottom-center"/>
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  )
}
