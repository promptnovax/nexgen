import AuthorProfileContent from '@/components/AuthorProfileContent';
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

    const authorsResult = await payload.find({
        collection: "authors",
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

    if (!authorsResult.docs || authorsResult.docs.length === 0) {
        notFound();
    }

    const author = authorsResult.docs[0];

    const postsResult = await payload.find({
        collection: "posts",
        where: {
            and: [
                {
                    author: {
                        equals: author.id,
                    },
                },
                {
                    site: {
                        equals: site?.id,
                    },
                },
            ],
        },
        limit: 10,
    });

    return <AuthorProfileContent author={author as any} posts={postsResult.docs as any} />;
}

export async function generateStaticParams() {
    const payload = await getPayload({ config: configPromise, importMap });
    const authorsResult = await payload.find({
        collection: "authors",
        limit: 1000,
    });

    return authorsResult.docs.map((author) => ({
        slug: author.slug,
    }));
}
