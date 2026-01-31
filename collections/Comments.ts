import { CollectionConfig } from 'payload'

export const Comments: CollectionConfig = {
    slug: 'comments',
    admin: {
        useAsTitle: 'content',
        group: 'CRM',
        defaultColumns: ['post', 'authorName', 'status', 'createdAt'],
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'post',
            type: 'relationship',
            relationTo: 'posts',
            required: true,
            index: true,
        },
        {
            name: 'content',
            type: 'textarea',
            required: true,
        },
        {
            name: 'authorName',
            type: 'text',
        },
        {
            name: 'authorEmail',
            type: 'email',
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'pending',
            options: [
                { label: 'Pending', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Spam', value: 'spam' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'replies',
            type: 'relationship',
            relationTo: 'comments',
            hasMany: true,
        },
    ],
}
