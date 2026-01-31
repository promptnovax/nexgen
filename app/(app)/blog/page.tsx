import BlogContent from '@/components/BlogContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";
import { getTenant } from "@/lib/tenant";

export const metadata = {
  title: "Blog - NEXGEN",
};

export default async function Page() {
  const site = await getTenant();

  if (!site) return <div>Site not found</div>;

  const payload = await getPayload({ config: configPromise, importMap });

  const postsResult = await payload.find({
    collection: 'posts',
    where: {
      site: {
        equals: site.id,
      },
    },
    sort: '-publishedAt',
    limit: 100,
  });

  const categoriesResult = await payload.find({
    collection: 'categories',
    where: {
      site: {
        equals: site.id,
      },
    },
    limit: 100,
  });

  return <BlogContent posts={postsResult.docs as any} categories={categoriesResult.docs as any} site={site as any} />;
}
