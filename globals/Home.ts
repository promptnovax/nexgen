import { CollectionConfig } from "payload";

export const Home: CollectionConfig = {
    slug: "home-pages",
    labels: {
        singular: "Home Page",
        plural: "Home Pages",
    },
    admin: {
        useAsTitle: "site",
        group: 'Pages',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: "site",
            type: "relationship",
            relationTo: "sites",
            required: true,
            unique: true, // One home page per site
            index: true,
        },
        {
            name: "hero",
            type: "array",
            label: "Hero Slider",
            minRows: 1,
            maxRows: 3,
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "category",
                    type: "text",
                    required: true,
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "author",
                    type: "relationship",
                    relationTo: "authors",
                    required: true,
                },
                {
                    name: "link",
                    type: "text",
                    label: "Link URL",
                },
            ],
        },
        {
            name: "trending",
            type: "group",
            label: "Trending Section",
            fields: [
                {
                    name: "title",
                    type: "text",
                    defaultValue: "Trending Posts",
                },
                {
                    name: "posts",
                    type: "relationship",
                    relationTo: "posts",
                    hasMany: true,
                    maxRows: 4,
                },
            ],
        },
        {
            name: "featuredCategories",
            type: "group",
            label: "Featured Categories",
            fields: [
                {
                    name: "title",
                    type: "text",
                    defaultValue: "Featured Categories",
                },
                {
                    name: "categories",
                    type: "relationship",
                    relationTo: "categories",
                    hasMany: true,
                },
            ],
        },
        {
            name: "cta",
            type: "group",
            label: "Newsletter CTA",
            fields: [
                {
                    name: "title",
                    type: "text",
                    defaultValue: "Don't Miss A Beat",
                },
                {
                    name: "description",
                    type: "textarea",
                    defaultValue: "Subscribe to our newsletter...",
                },
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                },
            ],
        },
    ],
};
