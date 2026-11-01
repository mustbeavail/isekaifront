import ReduxProvider from "./ReduxProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from 'react'
import { SITE_URL, SITE_NAME, OG_IMAGE } from '../util/seo';

// 사이트 기본 메타데이터. 각 페이지가 title 만 주면 "페이지명 | 이세계 전생 시뮬레이터" 로 붙는다.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: '내가 이세계에 전생한다면? AI가 만들어 주는 이세계 전생 테스트, 환생 시뮬레이션.',
  openGraph: {
    title: SITE_NAME,
    description: '내가 이세계에 전생한다면?',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: 'ko_KR',
    type: 'website',
  },
}

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
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
