import type { Metadata, Viewport } from 'next';
import { Anton, Geist, Geist_Mono, Caveat_Brush } from 'next/font/google';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

const caveatBrush = Caveat_Brush({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-caveat-brush',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Subhankar Giri — Data Analyst & Data Scientist',
  description:
    'Personal portfolio of Subhankar Giri. Specialized in machine learning pipelines, predictive modeling, and business intelligence dashboards.',
  keywords: [
    'Subhankar Giri',
    'Data Scientist',
    'Data Analyst',
    'Machine Learning',
    'Python',
    'Power BI',
    'Streamlit',
    'Next.js 15',
  ],
  authors: [{ name: 'Subhankar Giri' }],
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geistSans.variable} ${geistMono.variable} ${caveatBrush.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="init-agent-build-mode"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var params = new URLSearchParams(window.location.search);
                  var agentsParam = params.get('agents');
                  var saved = localStorage.getItem('subhankar_agents_enabled');
                  var enabled = true;
                  if (agentsParam === 'off') {
                    enabled = false;
                  } else if (agentsParam === 'on') {
                    enabled = true;
                  } else if (saved === 'false') {
                    enabled = false;
                  }
                  if (enabled) {
                    document.documentElement.classList.add('build-mode');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#09090b] text-zinc-100 font-sans antialiased selection:bg-[#ff3b2f] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
