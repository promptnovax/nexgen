
import { Payload } from "payload";

const categories = [
    "Photography",
    "Gardening",
    "Interior Design",
    "Personal Growth",
    "Mental Health",
    "Remote Work",
    "Sustainable Living",
    "Cryptography",
    "Quantum Computing",
    "Robotics",
    "Virtual Reality",
    "Augmented Reality",
    "Content Creation",
    "Podcast Engineering"
];

export const seedSiteThree = async (payload: Payload) => {
    console.log('Seeding Site 3 and its categories...');

    // 1. Find a theme for the site
    const themes = await payload.find({
        collection: 'themes',
        limit: 1,
    });

    if (themes.docs.length === 0) {
        console.log('No themes found. Please seed themes first.');
        return;
    }

    const themeId = themes.docs[0].id;

    // 2. Check if Site 3 already exists
    let site3;
    const existingSites = await payload.find({
        collection: 'sites',
        where: {
            domain: {
                equals: 'site3.localhost'
            }
        }
    });

    if (existingSites.docs.length === 0) {
        console.log('Creating Site 3...');
        site3 = await payload.create({
            collection: 'sites',
            data: {
                name: 'Site 3',
                siteTitle: 'Nexgen Site 3',
                domain: 'site3.localhost',
                theme: themeId,
                isActive: true,
            } as any
        });
        console.log('Site 3 created.');
    } else {
        site3 = existingSites.docs[0];
        console.log('Site 3 already exists.');
    }

    const siteId = site3.id;

    // 3. Seed categories for Site 3
    for (const catName of categories) {
        const existing = await payload.find({
            collection: 'categories',
            where: {
                and: [
                    {
                        name: {
                            equals: catName
                        }
                    },
                    {
                        site: {
                            equals: siteId
                        }
                    }
                ]
            }
        });

        if (existing.docs.length === 0) {
            try {
                await payload.create({
                    collection: 'categories',
                    data: {
                        name: catName,
                        site: siteId,
                    } as any
                });
                console.log(`Successfully created category '${catName}' for Site 3`);
            } catch (error) {
                console.error(`Failed to create category '${catName}' for Site 3:`, error);
            }
        } else {
            console.log(`Category '${catName}' already exists for Site 3`);
        }
    }

    console.log('Site 3 seeding complete.');
};
