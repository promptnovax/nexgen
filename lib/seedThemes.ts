import { Payload } from "payload";

const themes = [
    {
        name: "Nexgen Cyber",
        slug: "nexgen-cyber",
        primaryColor: "#00f2ff",
        secondaryColor: "#0b0e11",
        fontFamily: "Outfit, sans-serif",
        layoutType: "cyberpunk",
    },
    {
        name: "Professional Clean",
        slug: "professional-clean",
        primaryColor: "#2563eb",
        secondaryColor: "#f8fafc",
        fontFamily: "Inter, sans-serif",
        layoutType: "modern",
    },
    {
        name: "Forest Folk",
        slug: "forest-folk",
        primaryColor: "#2d6a4f",
        secondaryColor: "#fdfbf7",
        fontFamily: "Roboto, sans-serif",
        layoutType: "modern",
    },
    {
        name: "Midnight Ocean",
        slug: "midnight-ocean",
        primaryColor: "#38bdf8",
        secondaryColor: "#0f172a",
        fontFamily: "Inter, sans-serif",
        layoutType: "modern",
    }
];

export const seedThemes = async (payload: Payload) => {
    console.log('Seeding themes...');

    for (const theme of themes) {
        const existing = await payload.find({
            collection: 'themes',
            where: {
                slug: {
                    equals: theme.slug
                }
            }
        });

        if (existing.docs.length === 0) {
            await payload.create({
                collection: 'themes',
                data: theme as any
            });
            console.log(`Created theme: ${theme.name}`);
        } else {
            console.log(`Theme already exists: ${theme.name}`);
        }
    }

    console.log('Theme seeding complete.');
};
