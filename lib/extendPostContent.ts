
import { Payload } from "payload";

const LIFESTYLE_SECTIONS = [
    { title: "The Foundation of Modern Living", content: "In today's fast-paced world, finding a balance between productivity and mindfulness is more crucial than ever. It's about creating a space—both physical and mental—where you can thrive without feeling overwhelmed by the constant noise of the digital age." },
    { title: "Daily Rituals for Success", content: "Success isn't just about big milestones; it's about the small things you do every day. Whether it's a silent morning coffee, a structured workout routine, or a dedicated time for deep work, these rituals form the bedrock of a fulfilling life." },
    { title: "Navigating Challenges", content: "No journey is without its hurdles. From managing stress to overcoming creative blocks, the key lies in persistence and the ability to adapt. Resiliency is a muscle that grows every time you push through a difficult moment." },
    { title: "Looking Ahead", content: "The future belongs to those who prepare for it today. By staying curious and open to new experiences, you ensure that your lifestyle remains dynamic and ever-evolving." }
];

const TECH_SECTIONS = [
    { title: "Technical Architecture and Design", content: "The core of any scalable system lies in its architectural integrity. Choosing the right stack is only the first step; understanding the underlying data flow and potential bottlenecks is what separates good software from great software." },
    { title: "Optimizing Performance", content: "Performance is not a feature; it's a requirement. From database indexing to frontend caching strategies, every millisecond saved translates directly into a better user experience and higher retention rates." },
    { title: "Security in the Modern Era", content: "With the rise of distributed systems, security has moved from a perimeter-based approach to a Zero Trust model. Every request must be authenticated and authorized, ensuring data integrity at every layer." },
    { title: "The Next Frontier", content: "As we look toward AI and machine learning, the role of the developer is shifting from writing procedural code to designing systems that can learn and adapt. The possibilities are truly limitless." }
];

const CREATIVE_SECTIONS = [
    { title: "The Creative Process Unveiled", content: "Creativity is often seen as a spark of inspiration, but in reality, it is a disciplined process of exploration, iteration, and refinement. It starts with a single idea that is nurtured through constant experimentation." },
    { title: "Visual Storytelling Techniques", content: "Whether through photography, design, or video, telling a story visually requires a deep understanding of composition, color theory, and light. It's about capturing a moment that resonates on an emotional level." },
    { title: "Overcoming Creative Burnout", content: "Even the most prolific creators face periods of exhaustion. Finding ways to recharge—stepping away from the screen, exploring nature, or trying a completely different medium—is essential for long-term artistic growth." },
    { title: "Innovation and Impact", content: "True innovation happens at the intersection of different disciplines. By combining traditional techniques with modern technology, creators can produce work that is both timeless and cutting-edge." }
];

function generateDetailedContent(categoryName: string, niche: string) {
    const sections = niche === 'TECH' ? TECH_SECTIONS : niche === 'CREATIVE' ? CREATIVE_SECTIONS : LIFESTYLE_SECTIONS;

    const children: any[] = [];

    // Add an Intro
    children.push({
        type: 'heading',
        tag: 'h2',
        version: 1,
        indent: 0,
        format: '',
        direction: 'ltr',
        children: [{ mode: 'normal', text: `Deep Dive: ${categoryName}`, type: 'text', version: 1 }]
    });

    children.push({
        type: 'paragraph',
        version: 1,
        indent: 0,
        format: '',
        direction: 'ltr',
        children: [{ mode: 'normal', text: `Welcome to this comprehensive guide on ${categoryName}. In this article, we'll explore every facet of the topic, providing you with actionable insights and detailed perspectives that you won't find anywhere else. Let's delve into the details.`, type: 'text', version: 1 }]
    });

    // Repeat sections to reach high "line count" / word count
    for (let i = 0; i < 6; i++) {
        sections.forEach((section, index) => {
            children.push({
                type: 'heading',
                tag: 'h3',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                children: [{ mode: 'normal', text: `${section.title} - Phase ${i + 1}.${index + 1}`, type: 'text', version: 1 }]
            });

            // Add multiple paragraphs per section to increase length
            for (let p = 0; p < 3; p++) {
                children.push({
                    type: 'paragraph',
                    version: 1,
                    indent: 0,
                    format: '',
                    direction: 'ltr',
                    children: [{ mode: 'normal', text: `${section.content} This is a detailed exploration of our core concepts, ensuring that every reader understands the depth of the research involved. We are committed to providing the best possible information on ${categoryName}.`, type: 'text', version: 1 }]
                });
            }

            // Add a list intermittently
            if (index % 2 === 0) {
                children.push({
                    type: 'list',
                    listType: 'bullet',
                    version: 1,
                    tag: 'ul',
                    start: 1,
                    indent: 0,
                    format: '',
                    direction: 'ltr',
                    children: [
                        {
                            type: 'listitem',
                            version: 1,
                            indent: 0,
                            format: '',
                            direction: 'ltr',
                            value: 1,
                            children: [{ text: `Key insight for ${categoryName}: Value ${i + 1}`, type: 'text', version: 1 }]
                        },
                        {
                            type: 'listitem',
                            version: 1,
                            indent: 0,
                            format: '',
                            direction: 'ltr',
                            value: 2,
                            children: [{ text: `Operational efficiency in ${section.title}`, type: 'text', version: 1 }]
                        },
                        {
                            type: 'listitem',
                            version: 1,
                            indent: 0,
                            format: '',
                            direction: 'ltr',
                            value: 3,
                            children: [{ text: `Strategic advantage through iterative development.`, type: 'text', version: 1 }]
                        }
                    ]
                });
            }
        });
    }

    // Conclusion
    children.push({
        type: 'heading',
        tag: 'h2',
        version: 1,
        indent: 0,
        format: '',
        direction: 'ltr',
        children: [{ mode: 'normal', text: "Final Thoughts", type: 'text', version: 1 }]
    });

    children.push({
        type: 'paragraph',
        version: 1,
        indent: 0,
        format: '',
        direction: 'ltr',
        children: [{ mode: 'normal', text: `In conclusion, ${categoryName} is a multi-layered domain that requires continuous learning and adaptation. We hope this 1500-line deep dive has provided you with the clarity and inspiration needed to excel in your field.`, type: 'text', version: 1 }]
    });

    return {
        root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children
        }
    };
}

export const extendPostContent = async (payload: Payload) => {
    console.log('Starting content expansion for all posts...');

    const posts = await payload.find({
        collection: 'posts',
        limit: 100, // Process 100 at a time (total is around 86)
        depth: 1,
    });

    console.log(`Found ${posts.docs.length} posts to expand.`);

    const techDomains = ['site2.localhost'];
    const creativeDomains = ['site3.localhost'];

    for (const post of posts.docs) {
        const site = typeof post.site === 'object' ? post.site : null;
        const category = post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object' ? post.categories[0] : null;

        let niche = 'LIFESTYLE';
        if (site && techDomains.includes((site as any).domain)) niche = 'TECH';
        if (site && creativeDomains.includes((site as any).domain)) niche = 'CREATIVE';

        const categoryName = (category as any)?.name || 'General';

        console.log(`Expanding: ${post.title} (Site: ${(site as any)?.name}, Category: ${categoryName}, Niche: ${niche})`);

        const newContent = generateDetailedContent(categoryName, niche);

        try {
            await payload.update({
                collection: 'posts',
                id: post.id,
                data: {
                    content: newContent,
                } as any,
            });
            console.log(`Successfully expanded: ${post.title}`);
        } catch (error) {
            console.error(`Failed to expand post ${post.title}:`, error);
        }
    }

    console.log('Post content expansion complete.');
};
