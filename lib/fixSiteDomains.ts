import { Payload } from "payload";

export const fixSiteDomains = async (payload: Payload) => {
    console.log('--- START FIXING SITE DOMAINS ---');

    try {
        const result = await payload.update({
            collection: 'sites',
            id: 1, // Haider's ID
            data: {
                domain: 'localhost'
            } as any
        });
        console.log('Successfully updated Site 1 (Haider) domain to: localhost');
    } catch (error) {
        console.error('Failed to update Site 1 domain:', error);
    }

    try {
        const result3 = await payload.update({
            collection: 'sites',
            id: 3, // Site 3 ID
            data: {
                domain: 'site3.localhost'
            } as any
        });
        console.log('Successfully confirmed Site 3 domain: site3.localhost');
    } catch (error) {
        console.error('Failed to update Site 3 domain:', error);
    }

    console.log('--- END FIXING SITE DOMAINS ---');
};
