import ReduxProvider from "./ReduxProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from 'react'

export const metadata = {
  title: '이세계 전생 시뮬레이션',
  description: '다양한 이세계 세계관 전생 시뮬레이션',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Condiment&family=Fugaz+One&family=Jua&family=Lavishly+Yours&family=Mea+Culpa&family=Saira+Stencil+One&display=swap" rel="stylesheet"/>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
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
