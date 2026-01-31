import { CollectionConfig, APIError } from 'payload'
import { slugify } from '../lib/slugify'

const countExternalLinks = (content: any): number => {
    let count = 0
    if (!content || !content.root || !content.root.children) return 0

    const traverse = (node: any) => {
        // Debug: Log node type and keys for inspection
        if (node.type === 'link') {
            console.log('Found link node:', JSON.stringify(node, null, 2));
        }

        if (node.type === 'link' && node.fields?.linkType === 'custom' && node.fields?.url) {
            // Simple check: if it starts with http/https and is not a relative path
            if (node.fields.url.startsWith('http')) {
                count++
            }
        }
        if (node.children) {
            node.children.forEach(traverse)
        }
    }

    traverse(content.root)
    return count
}

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        group: 'Content',
        defaultColumns: ['title', 'site', 'status', 'publishedAt'],
    },
    access: {
        read: () => true,
    },
    hooks: {
        beforeValidate: [
            ({ data, operation }) => {
                if (data?.title && !data.slug) {
                    return {
                        ...data,
                        slug: slugify(data.title),
                    }
                }
                if (data?.slug) {
                    return {
                        ...data,
                        slug: slugify(data.slug),
                    }
                }

                if (data?.status === 'published') {
                    const externalLinks = countExternalLinks(data.content)
                    if (externalLinks < 2) {
                        throw new APIError('SEO Requirement: You must include at least 2 external links (e.g., to other reputable sites) before publishing.', 400, null, true)
                    }
                }

                return data
            },
        ],
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Content',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'content',
                            type: 'richText',
                        },
                        {
                            name: 'excerpt',
                            type: 'textarea',
                        },
                        {
                            name: 'coverImage',
                            type: 'upload',
                            relationTo: 'media',
                        },
                        {
                            name: 'gallery',
                            type: 'array',
                            label: 'Gallery',
                            fields: [
                                {
                                    name: 'image',
                                    type: 'upload',
                                    relationTo: 'media',
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
                {
                    label: 'SEO',
                    fields: [
                        {
                            name: 'metaTitle',
                            type: 'text',
                            label: 'Meta Title',
                        },
                        {
                            name: 'metaDescription',
                            type: 'textarea',
                            label: 'Meta Description',
                        },
                        {
                            name: 'metaKeywords',
                            type: 'text',
                            label: 'Meta Keywords',
                        },
                    ],
                },
                {
                    label: 'Open Graph',
                    fields: [
                        {
                            name: 'ogTitle',
                            type: 'text',
                            label: 'OG Title',
                        },
                        {
                            name: 'ogDescription',
                            type: 'textarea',
                            label: 'OG Description',
                        },
                        {
                            name: 'ogImage',
                            type: 'upload',
                            relationTo: 'media',
                            label: 'OG Image',
                        },
                    ],
                },
            ],
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
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'authors',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'categories',
            type: 'relationship',
            relationTo: 'categories',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'views',
            type: 'number',
            defaultValue: 0,
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
        },
    ],
}
