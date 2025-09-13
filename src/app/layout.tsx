import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Weekly Planner - 7-Day Task Manager',
  description: 'An interactive 7-day week planner with integrated to-do list functionality',
  keywords: ['todo', 'task manager', 'weekly planner', 'productivity', 'weekend planner'],
  authors: [{ name: 'Weekly Planner App' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body 
        className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 overflow-x-hidden`}
        style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
      >
        <div className="min-h-screen flex flex-col">
          <header className="bg-black/80 backdrop-blur-sm border-b border-blue-500/20 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center shadow-lg border border-blue-400/20">
                    <span className="text-blue-100 font-bold text-xl">7</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                      Weekly Planner
                    </h1>
                    <p className="text-sm text-gray-400">Your 7-day productivity companion</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-300">
                      {new Date().toLocaleDateString('en-US', { 
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-500">Stay organized, stay productive!</p>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-gray-900/20 to-black/30 pointer-events-none" />
            <div className="relative z-10">
              {children}
            </div>
          </main>
          
          <footer className="bg-black/60 backdrop-blur-sm border-t border-blue-500/20 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Made with 💙 for productive weeks • 
                  <span className="ml-2 font-medium text-blue-300">7 days, endless possibilities</span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}