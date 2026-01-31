import { getPayload } from 'payload'
import configPromise from './payload.config'

const run = async () => {
    const payload = await getPayload({ config: configPromise })

    console.log('--- SEO Validation Test ---')

    // 2. Test: Published Post with 2 External Links (Should Pass)
    console.log('\n[Test 2] Creating Published Post with 2 External Links (Expect Success)...')
    try {
        const post = await payload.create({
            collection: 'posts',
            data: {
                title: 'SEO Success Post',
                site: 1,
                status: 'published',
                content: {
                    root: {
                        type: 'root',
                        children: [
                            {
                                type: 'paragraph',
                                children: [
                                    { text: 'Link 1: ', type: 'text' },
                                    {
                                        type: 'link',
                                        fields: { linkType: 'custom', url: 'https://google.com' },
                                        children: [{ text: 'Google', type: 'text' }],
                                    },
                                    { text: ' Link 2: ', type: 'text' },
                                    {
                                        type: 'link',
                                        fields: { linkType: 'custom', url: 'https://wikipedia.org' },
                                        children: [{ text: 'Wikipedia', type: 'text' }],
                                    },
                                ],
                            },
                        ],
                    },
                },
            },
        })
        console.log('✅ PASS: Post created successfully with ID:', post.id)
    } catch (e) {
        console.error('❌ FAIL: Failed to create valid post:', e)
    }

    process.exit(0)
}

run()
