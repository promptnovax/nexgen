import BlogPostContent from '@/components/BlogPostContent';
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

    const postsResult = await payload.find({
        collection: "posts",
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
        depth: 2,
    });

    if (!postsResult.docs || postsResult.docs.length === 0) {
        notFound();
    }

    const post = postsResult.docs[0];

    return <BlogPostContent post={post as any} />;
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise, importMap });
    const postsResult = await payload.find({
        collection: "posts",
        limit: 1000,
    });

    return postsResult.docs.map((post) => ({
        slug: post.slug,
    }));
}
