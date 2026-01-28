import './globals.css';

export const metadata = {
  title: '청춘혜택 - 대학생 지원사업 통합 플랫폼',
  description: '정부, 지자체, 기업, 재단의 대학생 지원사업을 한눈에! 나에게 맞는 혜택을 찾아보세요.',
  keywords: '대학생 지원, 장학금, 청년정책, 국가장학금, 청년수당',
  openGraph: {
    title: '청춘혜택 - 대학생 지원사업 통합 플랫폼',
    description: '나에게 맞는 지원사업을 찾아보세요',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#2563EB" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased">
        <div className="mx-auto max-w-lg bg-white min-h-screen shadow-xl">
          {children}
        </div>
      </body>
    </html>
  );
}
