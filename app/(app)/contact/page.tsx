import ContactContent from '@/components/ContactContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export const metadata = {
  title: "Contact Us - NEXGEN",
};

export default async function Page() {
  const site = await getTenant();

  if (!site) return <div>Site not found</div>;

  const payload = await getPayload({ config: configPromise, importMap });

  const contactPages = await payload.find({
    collection: 'contact-pages',
    where: {
      site: {
        equals: site.id,
      },
    },
    depth: 2,
    limit: 1,
  });

  const contactData = contactPages.docs[0] || null;

  return <ContactContent data={contactData} site={site as any} />;
}
