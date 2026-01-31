
import { Payload } from "payload";

export const seedPosts = async (payload: Payload) => {
    console.log('Seeding posts for Site 1 (Haider)...');

    // 1. Find the 'Haider' site
    const sites = await payload.find({
        collection: 'sites',
        where: {
            name: {
                equals: 'Haider'
            }
        },
        limit: 1,
    });

    if (sites.docs.length === 0) {
        console.log('Site "Haider" not found.');
        return;
    }

    const mainSite = sites.docs[0];
    const siteId = mainSite.id;

    // 2. Find an author (optional but good)
    const authors = await payload.find({
        collection: 'authors',
        limit: 1,
    });
    const authorId = authors.docs.length > 0 ? authors.docs[0].id : undefined;

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
        console.log('No categories found for Site 1.');
        return;
    }

    console.log(`Found ${categories.docs.length} categories for Site 1.`);

    for (const category of categories.docs) {
        const catName = category.name;

        // Create 2 posts per category
        for (let i = 1; i <= 2; i++) {
            const postTitle = `${catName} Insights Part ${i}`;
            const postSlug = `${category.slug}-insights-${i}`;

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
                                                    text: `This is a professional insight about ${catName}. We explore the latest trends and future outlook in this domain.`,
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
                            excerpt: `Explore the fascinating world of ${catName} with our deep dive analysis.`,
                            site: siteId,
                            categories: [category.id],
                            author: authorId,
                            status: 'published',
                            publishedAt: new Date().toISOString(),
                        } as any
                    });
                    console.log(`Successfully created post: ${postTitle}`);
                } catch (error) {
                    console.error(`Failed to create post ${postTitle}:`, error);
                }
            } else {
                console.log(`Post already exists: ${postTitle}`);
            }
        }
    }

    console.log('Post seeding for Site 1 complete.');
};
