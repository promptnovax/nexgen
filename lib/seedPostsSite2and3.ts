
import { Payload } from "payload";

export const seedPostsSite2and3 = async (payload: Payload) => {
    console.log('Seeding posts for Site 2 and Site 3...');

    const siteDomains = ['site2.localhost', 'site3.localhost'];

    // 1. Find an author
    const authors = await payload.find({
        collection: 'authors',
        limit: 1,
    });
    const authorId = authors.docs.length > 0 ? authors.docs[0].id : undefined;

    for (const domain of siteDomains) {
        // 2. Find the site
        const sites = await payload.find({
            collection: 'sites',
            where: {
                domain: {
                    equals: domain
                }
            },
            limit: 1,
        });

        if (sites.docs.length === 0) {
            console.log(`Site with domain ${domain} not found.`);
            continue;
        }

        const site = sites.docs[0];
        const siteId = site.id;
        console.log(`Seeding posts for ${site.name} (${domain})...`);

        // 3. Find categories for this site
        const categories = await payload.find({
            collection: 'categories',
            where: {
                site: {
                    equals: siteId
                }
            },
            limit: 100,
        });

        if (categories.docs.length === 0) {
            console.log(`No categories found for ${site.name}.`);
            continue;
        }

        console.log(`Found ${categories.docs.length} categories for ${site.name}.`);

        for (const category of categories.docs) {
            const catName = category.name;

            // Create 2 posts per category
            for (let i = 1; i <= 2; i++) {
                const postTitle = `${catName} Trends update ${i}`;
                const postSlug = `${category.slug}-trends-${i}-${siteId}`; // Adding siteId to slug for uniqueness across sites if needed

                // Check if post already exists
                const existing = await payload.find({
                    collection: 'posts',
                    where: {
                        slug: {
                            equals: postSlug
                        }
                    }
                });

                if (existing.docs.length === 0) {
                    try {
                        await payload.create({
                            collection: 'posts',
                            data: {
                                title: postTitle,
                                slug: postSlug,
                                content: {
                                    root: {
                                        type: 'root',
                                        format: '',
                                        indent: 0,
                                        version: 1,
                                        children: [
                                            {
                                                type: 'paragraph',
                                                format: '',
                                                indent: 0,
                                                version: 1,
                                                children: [
                                                    {
                                                        mode: 'normal',
                                                        text: `Exploring the dynamic shifts and latest trends in ${catName} for ${site.name}. Stay ahead with our exclusive insights.`,
                                                        type: 'text',
                                                        style: '',
                                                        detail: 0,
                                                        format: 0,
                                                        version: 1
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                excerpt: `A deep dive into ${catName} trends exclusively for ${site.name}.`,
                                site: siteId,
                                categories: [category.id],
                                author: authorId,
                                status: 'published',
                                publishedAt: new Date().toISOString(),
                            } as any
                        });
                        console.log(`Successfully created post: ${postTitle} for ${site.name}`);
                    } catch (error) {
                        console.error(`Failed to create post ${postTitle} for ${site.name}:`, error);
                    }
                } else {
                    console.log(`Post already exists: ${postTitle} for ${site.name}`);
                }
            }
        }
    }

    console.log('Post seeding for Site 2 and Site 3 complete.');
};
