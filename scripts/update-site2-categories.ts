import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })
    const siteId = 2

    // Use the same professional images generated earlier (IDs 3 and 4)
    const mediaIds = [3, 4]

    console.log('--- Fetching Site 2 Categories ---')
    const categories = await payload.find({
        collection: 'categories',
        where: {
            site: {
                equals: siteId
            }
        },
        limit: 1000
    })

    console.log(`Found ${categories.docs.length} categories for Site 2.`)

    console.log('--- Updating Categories ---')
    for (let i = 0; i < categories.docs.length; i++) {
        const cat = categories.docs[i]
        const mediaId = mediaIds[i % mediaIds.length]

        try {
            await payload.update({
                collection: 'categories',
                id: cat.id,
                data: {
                    image: mediaId
                }
            })
            console.log(`Updated category "${cat.name}" (ID: ${cat.id}) with media ID: ${mediaId}`)
        } catch (e) {
            console.error(`Failed to update category "${cat.name}":`, e)
        }
    }

    console.log('--- Done ---')
}

run().catch(console.error)
