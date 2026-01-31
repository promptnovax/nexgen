import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ["payload"],
};

export default withPayload(nextConfig);