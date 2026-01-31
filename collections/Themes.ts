import { CollectionConfig } from 'payload'

export const Themes: CollectionConfig = {
    slug: 'themes',
    admin: {
        useAsTitle: 'name',
        group: 'Infrastructure',
    },
    access: {
        read: () => true,
    },
    hooks: {
        afterChange: [
            async ({ doc, req, operation }) => {
                if (operation === 'update' && doc.applyToAllSites) {
                    // Update all sites to use this theme
                    await req.payload.update({
                        collection: 'sites',
                        where: {
                            id: { exists: true }
                        },
                        data: {
                            theme: doc.id,
                        },
                    });

                    // Reset the checkbox so it doesn't trigger again on every save
                    await req.payload.update({
                        collection: 'themes',
                        id: doc.id,
                        data: {
                            applyToAllSites: false,
                        } as any,
                    });
                }
            },
        ],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'select',
            required: true,
            defaultValue: 'custom',
            options: [
                { label: 'Custom Styles', value: 'custom' },
                { label: 'Nexgen Cyber', value: 'nexgen-cyber' },
                { label: 'Professional Clean', value: 'professional-clean' },
                { label: 'Forest Folk', value: 'forest-folk' },
                { label: 'Midnight Ocean', value: 'midnight-ocean' },
            ],
            admin: {
                description: 'Select a pre-ready theme or "Custom" to use the color picker below.',
            },
        },
        {
            name: 'layoutType',
            type: 'select',
            required: true,
            defaultValue: 'modern',
            options: [
                { label: 'Modern (Default)', value: 'modern' },
                { label: 'Cyberpunk (Nexgen)', value: 'cyberpunk' },
                { label: 'Classic Professional', value: 'classic' },
                { label: 'Minimalist', value: 'minimal' },
            ],
            admin: {
                description: 'Choose the structural layout for blog posts and listings.',
            },
        },
        {
            name: 'previewImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'primaryColor',
            type: 'text',
            defaultValue: '#000000',
            admin: {
                components: {
                    Field: '/components/admin/ColorPicker.tsx#default',
                },
            },
        },
        {
            name: 'secondaryColor',
            type: 'text',
            defaultValue: '#ffffff',
            admin: {
                components: {
                    Field: '/components/admin/ColorPicker.tsx#default',
                },
            },
        },
        {
            name: 'fontFamily',
            type: 'select',
            options: [
                { label: 'Inter', value: 'Inter, sans-serif' },
                { label: 'Roboto', value: 'Roboto, sans-serif' },
                { label: 'Outfit', value: 'Outfit, sans-serif' },
            ],
            defaultValue: 'Inter, sans-serif',
        },
        {
            name: 'applyToAllSites',
            type: 'checkbox',
            label: 'Apply this theme to all sites',
            admin: {
                description: 'Check this and save to apply this theme to every site in the system.',
                position: 'sidebar',
            },
        },
    ],
}
