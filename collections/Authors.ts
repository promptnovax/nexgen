import { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
    slug: 'authors',
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
                description: 'Unique identifier for the author URL.',
            },
        },
        {
            name: 'bio',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
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
