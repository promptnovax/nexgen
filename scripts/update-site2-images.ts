import { getPayload } from 'payload'
import configPromise from '../payload.config'
import path from 'path'
import fs from 'fs'

async function run() {
    const payload = await getPayload({ config: configPromise })
    const siteId = 2

    const imagePaths = [
        'C:/Users/HS Computers/.gemini/antigravity/brain/6f002d2f-c7bf-48a9-a459-90a259b7555b/blog_image_1_1769746855593.png',
        'C:/Users/HS Computers/.gemini/antigravity/brain/6f002d2f-c7bf-48a9-a459-90a259b7555b/blog_image_2_1769746874847.png'
    ]

    console.log('--- Uploading Images ---')
    const mediaIds: number[] = []

    for (const imgPath of imagePaths) {
        const filename = path.basename(imgPath)
        const file = {
            data: fs.readFileSync(imgPath),
            name: filename,
            size: fs.statSync(imgPath).size,
            mimetype: 'image/png',
        }

        try {
            const media = await payload.create({
                collection: 'media',
                data: {
                    alt: 'Professional Blog Cover',
                    site: siteId,
                },
                file: file as any,
            })
            console.log(`Uploaded ${filename} with ID: ${media.id}`)
            mediaIds.push(media.id as number)
        } catch (e) {
            console.error(`Failed to upload ${filename}:`, e)
        }
    }

    if (mediaIds.length === 0) {
        console.error('No images uploaded successfully. Aborting post updates.')
        return
    }

    console.log('--- Fetching Site 2 Posts ---')
    const posts = await payload.find({
        collection: 'posts',
        where: {
            site: {
                equals: siteId
            }
        },
        limit: 1000
    })

    console.log(`Found ${posts.docs.length} posts for Site 2.`)

    console.log('--- Updating Posts ---')
    for (let i = 0; i < posts.docs.length; i++) {
        const post = posts.docs[i]
        const mediaId = mediaIds[i % mediaIds.length]

        try {
            await payload.update({
                collection: 'posts',
                id: post.id,
                data: {
                    coverImage: mediaId
                }
            })
            console.log(`Updated post "${post.title}" (ID: ${post.id}) with media ID: ${mediaId}`)
        } catch (e) {
            console.error(`Failed to update post "${post.title}":`, e)
        }
    }

    console.log('--- Done ---')
}

run().catch(console.error)
