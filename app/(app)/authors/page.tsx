import AuthorsContent from '@/components/AuthorsContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export const metadata = {
  title: "Authors - NEXGEN",
};

export default async function Page() {
  const site = await getTenant();
  const payload = await getPayload({ config: configPromise, importMap });

  const authorsResult = await payload.find({
    collection: 'authors',
    where: {
      site: {
        equals: site?.id,
      },
    },
    limit: 100,
  });

  return <AuthorsContent authors={authorsResult.docs as any} site={site as any} />;
}
