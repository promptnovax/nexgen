import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
    slug: 'tags',
    admin: {
        useAsTitle: 'name',
        group: 'Content',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'Unique identifier for the tag URL.',
            },
        },
        {
            name: 'site',
            type: 'relationship',
            relationTo: 'sites',
            required: true,
            index: true,
            admin: {
                position: 'sidebar',
            },
        },
    ],
}
