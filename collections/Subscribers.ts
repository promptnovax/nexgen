import { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
    slug: 'subscribers',
    admin: {
        useAsTitle: 'email',
        group: 'CRM',
        defaultColumns: ['email', 'name', 'site', 'status'],
    },
    access: {
        read: () => true,
        create: () => true,
    },
    fields: [
        {
            name: 'email',
            type: 'email',
            required: true,
            unique: true,
        },
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'site',
            type: 'relationship',
            relationTo: 'sites',
            required: true,
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'subscribed',
            options: [
                { label: 'Subscribed', value: 'subscribed' },
                { label: 'Unsubscribed', value: 'unsubscribed' },
            ],
        },
    ],
}
