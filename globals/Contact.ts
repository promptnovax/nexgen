import { CollectionConfig } from "payload";

export const Contact: CollectionConfig = {
    slug: "contact-pages",
    labels: {
        singular: "Contact Page",
        plural: "Contact Pages",
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
            unique: true, // One contact page per site
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
                    name: "description",
                    type: "textarea",
                },
            ],
        },
        {
            name: "faqTitle",
            type: "text",
            defaultValue: "FAQ",
        },
        {
            name: "faqDescription",
            type: "textarea",
        },
        {
            name: "faqs",
            type: "array",
            label: "Frequently Asked Questions",
            fields: [
                {
                    name: "question",
                    type: "text",
                    required: true,
                },
                {
                    name: "answer",
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
