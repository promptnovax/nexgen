import IndexContent from '@/components/IndexContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export const metadata = {
  title: "NEXGEN - Webflow Ecommerce website template",
};

export default async function Page() {
  const site = await getTenant();

  if (!site) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '3rem',
          maxWidth: '600px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            🚀 Welcome to NEXGEN
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Your multi-tenant blog platform is ready!
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>📋 Setup Instructions:</h2>
            <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>Access the admin panel at <strong>/admin</strong></li>
              <li>Create your first user account</li>
              <li>Add a new Site with domain: <strong>localhost</strong></li>
              <li>Create a Theme for your site</li>
              <li>Add content (authors, categories, posts)</li>
              <li>Create a Home Page for your site</li>
            </ol>
          </div>
          <a
            href="/admin"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#667eea',
              padding: '1rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            Go to Admin Panel →
          </a>
        </div>
      </div>
    );
  }

  const payload = await getPayload({ config: configPromise, importMap });

  const homePages = await payload.find({
    collection: 'home-pages',
    where: {
      site: {
        equals: site.id,
      },
    },
    depth: 2,
    limit: 1,
  });

  const homeData = homePages.docs[0] || null;

  if (!homeData) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Site Found: {typeof site === 'object' && 'name' in site ? site.name : 'Unknown'}
          </h1>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            No home page content has been created yet. Please create a Home Page in the admin panel.
          </p>
          <a
            href="/admin"
            style={{
              display: 'inline-block',
              background: '#667eea',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Go to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return <IndexContent data={homeData} site={site as any} />;
}
