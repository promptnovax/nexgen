import AboutUsContent from '@/components/AboutUsContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export const metadata = {
  title: "About Us - NEXGEN",
};

export default async function Page() {
  const site = await getTenant();

  if (!site) return <div>Site not found</div>;

  const payload = await getPayload({ config: configPromise, importMap });

  const aboutPages = await payload.find({
    collection: 'about-pages',
    where: {
      site: {
        equals: site.id,
      },
    },
    depth: 2,
    limit: 1,
  });

  const aboutData = aboutPages.docs[0] || null;

  const authorsResult = await payload.find({
    collection: 'authors',
    where: {
      site: {
        equals: site.id,
      },
    },
    limit: 10,
  });

  return <AboutUsContent data={aboutData} authors={authorsResult.docs as any} site={site as any} />;
}
