import ReduxProvider from "./ReduxProvider";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'IsekaiSimulator',
  description: '이세계 전생 시뮬레이터',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Condiment&family=Fugaz+One&family=Jua&family=Lavishly+Yours&family=Mea+Culpa&display=swap" rel="stylesheet"/>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </head>
      <body>
        <ReduxProvider>
          {children}
          <Toaster position="bottom-center"/>
        </ReduxProvider>
      </body>
    </html>
  )
}
