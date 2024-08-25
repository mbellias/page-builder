import EditorContextProvider from '@/components/context/EditorContext';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}
    >
      <head>
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        />
      </head>
      <ClerkProvider>
        <body>
          <NextTopLoader />
          <EditorContextProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              themes={['light', 'dark', 'system']}
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </EditorContextProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
