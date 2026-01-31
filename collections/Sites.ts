import { CollectionConfig } from 'payload'

export const Sites: CollectionConfig = {
    slug: 'sites',
    admin: {
        useAsTitle: 'name',
        group: 'Infrastructure',
        defaultColumns: ['name', 'domain', 'isActive'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'General',
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            required: true,
                            admin: {
                                description: 'Internal name for the site.',
                            },
                        },
                        {
                            name: 'siteTitle',
                            type: 'text',
                            required: true,
                            label: 'Site Title',
                        },
                        {
                            name: 'tagline',
                            type: 'text',
                        },
                        {
                            name: 'description',
                            type: 'textarea',
                            admin: {
                                description: 'SEO description for the site.',
                            },
                        },
                        {
                            name: 'favicon',
                            type: 'upload',
                            relationTo: 'media',
                        },
                        {
                            name: 'postPerPage',
                            type: 'number',
                            label: 'Posts Per Page',
                            defaultValue: 10,
                        },
                        {
                            name: 'isActive',
                            type: 'checkbox',
                            label: 'Is Active',
                            defaultValue: true,
                        },
                    ],
                },
                {
                    label: 'Domains',
                    fields: [
                        {
                            name: 'domain',
                            type: 'text',
                            required: true,
                            unique: true,
                            admin: {
                                description: 'The main domain associated with this site (e.g., mysite.com or localhost)',
                            },
                        },
                        {
                            name: 'subdomain',
                            type: 'text',
                            admin: {
                                description: 'Optional subdomain (e.g., site1)',
                            },
                        },
                    ],
                },
                {
                    label: 'Theme',
                    fields: [
                        {
                            name: 'theme',
                            type: 'relationship',
                            relationTo: 'themes',
                            required: true,
                            admin: {
                                description: 'Select the visual theme for this site.',
                            },
                        },
                        {
                            name: 'logo',
                            type: 'upload',
                            relationTo: 'media',
                        },
                    ],
                },
                {
                    label: 'Social Media',
                    fields: [
                        {
                            name: 'facebook',
                            type: 'text',
                        },
                        {
                            name: 'twitter',
                            type: 'text',
                        },
                        {
                            name: 'instagram',
                            type: 'text',
                        },
                        {
                            name: 'youtube',
                            type: 'text',
                        },
                        {
                            name: 'linkedin',
                            type: 'text',
                        },
                    ],
                },
                {
                    label: 'Code Injection',
                    fields: [
                        {
                            name: 'googleAnalyticsId',
                            type: 'text',
                            label: 'Google Analytics ID',
                        },
                        {
                            name: 'customCSS',
                            type: 'code',
                            admin: {
                                language: 'css',
                            },
                        },
                        {
                            name: 'customJS',
                            type: 'code',
                            admin: {
                                language: 'javascript',
                            },
                        },
                    ],
                },
                {
                    label: 'Navigation',
                    fields: [
                        {
                            name: 'navigation',
                            type: 'array',
                            fields: [
                                {
                                    name: 'label',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'link',
                                    type: 'text',
                                    required: true,
                                },
                                {
                                    name: 'newTab',
                                    type: 'checkbox',
                                    label: 'Open in new tab',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
