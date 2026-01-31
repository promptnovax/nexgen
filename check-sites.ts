
import { getPayload } from 'payload'
import configPromise from './payload.config'
import { importMap } from './app/(payload)/admin/importMap'

async function run() {
    const payload = await getPayload({ config: configPromise, importMap })
    const sites = await payload.find({
        collection: 'sites',
    })
    console.log('Sites found:', sites.docs.map(s => ({ id: s.id, name: s.name })))

    const homePages = await payload.find({
        collection: 'home-pages',
    })
    console.log('Home Pages found for sites:', homePages.docs.map(h => h.site))
    process.exit(0)
}

run()
