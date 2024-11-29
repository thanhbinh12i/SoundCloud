
import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthWrapper>
            {children}
          </NextAuthWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
