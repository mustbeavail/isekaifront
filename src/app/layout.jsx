import ReduxProvider from "./ReduxProvider";
import "@/app/globals.css";

export const metadata = {
  title: 'IsekaiSimulator',
  description: '이세계 전생 시뮬레이터',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Jua:wght@400;700&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Fugaz One:wght@400;700&display=swap" rel="stylesheet"/>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </head>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
