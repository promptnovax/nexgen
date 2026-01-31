import { headers } from 'next/headers'
import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { importMap } from '../app/(payload)/admin/importMap'

export const getTenant = cache(async () => {
    const headerList = await headers()
    const host = headerList.get('host') || 'localhost'

    // Normalize host (lowercase and strip port)
    const normalizedHost = host.toLowerCase().split(':')[0]

    const payload = await getPayload({ config: configPromise, importMap })

    // Try finding by full domain (might be site3.localhost)
    const sites = await payload.find({
        collection: 'sites',
        where: {
            domain: {
                equals: normalizedHost,
            },
        },
        depth: 1,
        limit: 1,
    })

    if (sites.docs.length > 0) {
        return sites.docs[0]
    }

    // Try finding by name just in case domain isn't set right (fallback for dev)
    // but ONLY as a second resort and logged
    console.warn(`[Tenant] No site found for domain: ${normalizedHost}. Request host: ${host}`);

    return null
})
