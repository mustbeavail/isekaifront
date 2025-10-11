'use client'
import {Provider} from "react-redux";
import {store} from "@/redux/Store";

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
      <body>
        <Provider store = {store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
