
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Home } from "./globals/Home";
import { About } from "./globals/About";
import { Contact } from "./globals/Contact";
import { Sites } from "./collections/Sites";
import { Themes } from "./collections/Themes";
import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Tags } from "./collections/Tags";
import { Posts } from "./collections/Posts";
import { Subscribers } from "./collections/Subscribers";
import { Comments } from "./collections/Comments";
import { seedThemes } from "./lib/seedThemes";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    onInit: async (payload) => {
        await seedThemes(payload);

        // Direct domain fix
        try {
            await payload.update({
                collection: 'sites',
                id: 1,
                data: { domain: 'localhost' } as any,
            });
            console.log('Site 1 domain fixed to localhost');
        } catch (e) {
            console.error('Failed to fix Site 1 domain:', e);
        }

        // await seedHomePages(payload);
        // await seedSiteTwo(payload);
    },
    admin: {
        user: "users",
    },
    collections: [
        {
            slug: "users",
            auth: true,
            admin: {
                group: 'System',
            },
            access: {
                delete: () => false,
                update: () => true,
            },
            fields: [],
        },
        {
            slug: "media",
            upload: true,
            access: {
                read: () => true,
            },
            admin: {
                group: 'Media',
            },
            fields: [
                {
                    name: "alt",
                    type: "text",
                },
                {
                    name: "site",
                    type: "relationship",
                    relationTo: "sites",
                    required: true,
                    index: true,
                    admin: {
                        position: 'sidebar',
                    },
                },
            ],
        },
        Authors,
        Categories,
        Tags,
        Posts,
        Subscribers,
        Comments,
        Sites,
        Themes,
        Home,
        About,
        Contact,
    ],
    globals: [],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || "HASDKLFJHASDFKJHASDFKJ",
    db: sqliteAdapter({
        client: {
            url: "file:./payload-db.sqlite",
        },
    }),
    sharp,
});
