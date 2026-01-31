import { CollectionConfig } from "payload";

export const About: CollectionConfig = {
    slug: "about-pages",
    labels: {
        singular: "About Page",
        plural: "About Pages",
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
            unique: true, // One about page per site
            index: true,
        },
        {
            name: "hero",
            type: "group",
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "subtitle",
                    type: "textarea",
                },
            ],
        },
        {
            name: "images",
            type: "array",
            label: "About Images",
            minRows: 3,
            maxRows: 3,
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
                {
                    name: "alt",
                    type: "text",
                },
            ],
        },
        {
            name: "teamTitle",
            type: "text",
            defaultValue: "Our Team",
        },
        {
            name: "values",
            type: "array",
            label: "Our Values",
            fields: [
                {
                    name: "title",
                    type: "text",
                    required: true,
                },
                {
                    name: "description",
                    type: "textarea",
                    required: true,
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
                },
                {
                    name: "description",
                    type: "textarea",
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
