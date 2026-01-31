import CategoryProfileContent from '@/components/CategoryProfileContent';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../../(payload)/admin/importMap";
import { notFound } from "next/navigation";
import { getTenant } from "@/lib/tenant";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const site = await getTenant();
    const payload = await getPayload({ config: configPromise, importMap });

    const categoriesResult = await payload.find({
        collection: "categories",
        where: {
            and: [
                {
                    slug: {
                        equals: slug,
                    },
                },
                {
                    site: {
                        equals: site?.id,
                    },
                },
            ],
        },
        depth: 1,
    });

    if (!categoriesResult.docs || categoriesResult.docs.length === 0) {
        notFound();
    }

    const category = categoriesResult.docs[0];

    const postsResult = await payload.find({
        collection: "posts",
        where: {
            and: [
                {
                    categories: {
                        contains: category.id,
                    },
                },
                {
                    site: {
                        equals: site?.id,
                    },
                },
            ],
        },
        limit: 100,
        sort: '-publishedAt',
    });

    return <CategoryProfileContent category={category as any} posts={postsResult.docs as any} site={site as any} />;
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise, importMap });
    const categoriesResult = await payload.find({
        collection: "categories",
        limit: 1000,
    });

    return categoriesResult.docs.map((cat) => ({
        slug: cat.slug,
    }));
}
