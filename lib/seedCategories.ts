
import { Payload } from "payload";

const categories = [
    "Technology",
    "Lifestyle",
    "Travel",
    "Food",
    "Health & Fitness",
    "Business",
    "Education",
    "Entertainment",
    "Fashion",
    "Sports",
    "Finance",
    "Gaming",
    "Real Estate",
    "Automotive"
];

export const seedCategories = async (payload: Payload) => {
    console.log('Seeding categories...');

    // Get the first site
    const sites = await payload.find({
        collection: 'sites',
        limit: 1,
    });

    if (sites.docs.length === 0) {
        console.log('No sites found to associate categories with.');
        return;
    }

    const siteId = sites.docs[0].id;
    console.log(`Using site ID: ${siteId} (${sites.docs[0].name})`);

    for (const catName of categories) {
        const existing = await payload.find({
            collection: 'categories',
            where: {
                name: {
                    equals: catName
                }
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
                console.log(`Successfully created category: ${catName}`);
            } catch (error) {
                console.error(`Failed to create category ${catName}:`, error);
            }
        } else {
            console.log(`Category already exists: ${catName}`);
        }
    }

    console.log('Category seeding complete.');
};
