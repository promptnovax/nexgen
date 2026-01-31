import './globals.css';
import '../../public/styles/nexgen-blog.webflow.033027658.css';
import '../../public/styles/asset_9e28dfda.css';
import { importMap } from "../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const site = await getTenant();
  const theme = typeof site?.theme === 'object' ? site.theme : null;

  const themeStyles = theme ? {
    '--primary-color': theme.primaryColor || '#000000',
    '--secondary-color': theme.secondaryColor || '#ffffff',
    '--font-family': theme.fontFamily || 'Inter, sans-serif',
  } : {};

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={(site?.logo && typeof site.logo === 'object' && 'url' in site.logo) ? (site.logo as any).url : "/images/64f598643efaa4030e5c7299_Favicon.png"} />
        {theme?.slug && theme.slug !== 'custom' && (
          <link rel="stylesheet" href={`/themes/${theme.slug}/style.css`} />
        )}
        {site?.googleAnalyticsId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAnalyticsId}`}></script>
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${site.googleAnalyticsId}');
              `
            }} />
          </>
        )}
        <style dangerouslySetInnerHTML={{
          __html: `
          :root {
            ${Object.entries(themeStyles).map(([key, value]) => `${key}: ${value};`).join('\n')}
          }
          body {
            font-family: var(--font-family);
          }
          .text-primary { color: var(--primary-color); }
          .bg-primary { background-color: var(--primary-color); }
        `}} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
