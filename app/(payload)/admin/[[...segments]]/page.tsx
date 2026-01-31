/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from "@payload-config";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap";

type Args = {
    params: Promise<{
        segments: string[];
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
};

export const generateMetadata = async ({ params, searchParams }: Args) =>
    generatePageMetadata({ config: configPromise, params, searchParams });

const Page = async ({ params, searchParams }: Args) =>
    RootPage({ config: configPromise, params, searchParams, importMap });

export default Page;
