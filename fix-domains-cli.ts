import { getPayload } from 'payload';
import configPromise from './payload.config';

const fix = async () => {
    const payload = await getPayload({ config: configPromise });

    console.log('Updating Site 1...');
    await payload.update({
        collection: 'sites',
        id: 1,
        data: { domain: 'localhost' } as any,
        overrideAccess: true,
    });

    console.log('Updating Site 3...');
    await payload.update({
        collection: 'sites',
        id: 3,
        data: { domain: 'site3.localhost' } as any,
        overrideAccess: true,
    });

    console.log('Update complete.');
    process.exit(0);
};

fix();
