
const countExternalLinks = (content: any): number => {
    let count = 0
    if (!content || !content.root || !content.root.children) return 0

    const traverse = (node: any) => {
        if (node.type === 'link' && node.fields?.linkType === 'custom' && node.fields?.url) {
            // Simple check: if it starts with http/https and is not a relative path
            if (node.fields.url.startsWith('http')) {
                count++
            }
        }
        if (node.children) {
            node.children.forEach(traverse)
        }
    }

    traverse(content.root)
    return count
}

const mockContent = {
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
                    { text: ' Internal link: ', type: 'text' },
                    {
                        type: 'link',
                        fields: { linkType: 'internal', url: '/about' },
                        children: [{ text: 'About', type: 'text' }],
                    },
                ],
            },
        ],
    },
}

console.log('--- Offline Logic Verification ---')
const count = countExternalLinks(mockContent)
console.log('Count:', count)

if (count === 2) {
    console.log('✅ PASS: Logic is correct.')
    process.exit(0)
} else {
    console.error(`❌ FAIL: Expected 2, got ${count}`)
    process.exit(1)
}
