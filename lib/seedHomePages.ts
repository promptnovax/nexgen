
import { Payload } from "payload";

export const seedHomePages = async (payload: Payload) => {
    console.log('Seeding Home Pages for all sites...');

    // 1. Get all sites
    const sites = await payload.find({
        collection: 'sites',
        limit: 100,
    });

    console.log(`Found ${sites.docs.length} sites in total.`);

    if (sites.docs.length === 0) {
        console.log('No sites found. Please seed sites first.');
        return;
    }

    // 2. Get an author and a media file to use (required fields)
    const authors = await payload.find({
        collection: 'authors',
        limit: 1,
    });
    const authorId = authors.docs.length > 0 ? authors.docs[0].id : undefined;

    const media = await payload.find({
        collection: 'media',
        limit: 1,
    });
    const mediaId = media.docs.length > 0 ? media.docs[0].id : undefined;

    if (!authorId || !mediaId) {
        console.log('Warning: Missing Author or Media. Home page hero sections require these. Please ensure at least one author and one media file exist.');
        // We'll proceed but might fail if validation is strict and we can't find them
    }

    const heroDetails = {
        'Haider': {
            title: 'Welcome to Haider Blog',
            category: 'Lifestyle',
        },
        'Site 2': {
            title: 'NEXGEN Tech Portal',
            category: 'Technology',
        },
        'Site 3': {
            title: 'Creative Horizons',
            category: 'Creative',
        }
    };

    for (const site of sites.docs) {
        console.log(`Processing Home Page for: ${site.name}`);

        // Check if home page already exists for this site
        const existing = await payload.find({
            collection: 'home-pages',
            where: {
                site: {
                    equals: site.id
                }
            }
        });

        // Get site specific categories and posts
        const siteCategories = await payload.find({
            collection: 'categories',
            where: {
                site: {
                    equals: site.id
                }
            },
            limit: 5,
        });

        const sitePosts = await payload.find({
            collection: 'posts',
            where: {
                site: {
                    equals: site.id
                }
            },
            limit: 4,
        });

        const details = heroDetails[site.name] || { title: `Welcome to ${site.name}`, category: 'General' };

        const data = {
            site: site.id,
            hero: [
                {
                    title: details.title,
                    category: details.category,
                    image: mediaId,
                    author: authorId,
                    link: '/blog',
                }
            ],
            trending: {
                title: 'Trending Insights',
                posts: sitePosts.docs.map(p => p.id),
            },
            featuredCategories: {
                title: 'Featured Topics',
                categories: siteCategories.docs.map(c => c.id),
            },
            cta: {
                title: "Don't Miss A Beat",
                description: `Stay updated with the latest from ${site.name}. Subscribe to our weekly newsletter today!`,
                image: mediaId,
            }
        } as any;

        try {
            if (existing.docs.length > 0) {
                await payload.update({
                    collection: 'home-pages',
                    id: existing.docs[0].id,
                    data,
                });
                console.log(`Successfully updated Home Page for ${site.name}`);
            } else {
                await payload.create({
                    collection: 'home-pages',
                    data,
                });
                console.log(`Successfully created Home Page for ${site.name}`);
            }
        } catch (error) {
            console.error(`Failed to process Home Page for ${site.name}:`, error);
        }
    }

    console.log('Home Page seeding complete.');
};
