import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function run() {
    const payload = await getPayload({ config: configPromise })

    const sites = await payload.find({ collection: 'sites' })
    console.log('--- SITES ---')
    console.log(JSON.stringify(sites.docs.map(s => ({ id: s.id, name: s.name, domain: s.domain })), null, 2))

    const media = await payload.find({ collection: 'media', limit: 10 })
    console.log('--- MEDIA ---')
    console.log(JSON.stringify(media.docs.map(m => ({ id: m.id, filename: m.filename, url: m.url })), null, 2))
}

run().catch(console.error)
