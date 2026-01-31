import CategoriesContent from '@/components/CategoriesContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export const metadata = {
  title: "Categories - NEXGEN",
};

export default async function Page() {
  const site = await getTenant();
  const payload = await getPayload({ config: configPromise, importMap });

  const categoriesResult = await payload.find({
    collection: 'categories',
    where: {
      site: {
        equals: site?.id,
      },
    },
    limit: 100,
  });

  return <CategoriesContent categories={categoriesResult.docs as any} site={site as any} />;
}
