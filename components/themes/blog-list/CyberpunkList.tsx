'use client';
import React from 'react';
import type { Post, Category, Author, Media, Site } from '@/payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
    if (!media) return undefined;
    if (typeof media === 'string') {
        if (media.startsWith('http')) return media;
        return `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${media}`;
    }
    if (typeof media === 'number') return undefined;
    const url = media.url || undefined;
    if (url && !url.startsWith('http')) {
        return `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${url}`;
    }
    return url;
};

export default function CyberpunkList({ posts, categories, site }: { posts?: Post[], categories?: Category[], site?: Site }) {
    const logoUrl = getImageUrl(site?.logo) || "/images/66222af0bbedc4b8ceb7e595_Logo-2.svg";

    return (
        <div className="webflow-page-wrapper theme-cyberpunk" style={{ background: '#0b0e11', color: '#00f2ff' }}>
            <header style={{ padding: '2rem', borderBottom: '2px solid #00f2ff', textAlign: 'center' }}>
                <img src={logoUrl} alt="Cyber Logo" style={{ height: '50px', filter: 'drop-shadow(0 0 10px #00f2ff)' }} />
                <h1 style={{ textTransform: 'uppercase', letterSpacing: '5px', marginTop: '1rem' }}>{site?.siteTitle || 'SYSTEM OVERRIDE'}</h1>
            </header>

            <section style={{ padding: '4rem 2rem' }}>
                <h2 style={{ marginBottom: '2rem', borderLeft: '5px solid #00f2ff', paddingLeft: '1rem' }}>LATEST_INTEL</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {posts?.map((post, idx) => (
                        <div key={idx} style={{
                            border: '1px solid #00f2ff',
                            padding: '1rem',
                            position: 'relative',
                            overflow: 'hidden',
                            background: 'rgba(0, 242, 255, 0.05)'
                        }}>
                            <div style={{
                                height: '200px',
                                backgroundImage: `url(${getImageUrl(post.coverImage)})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                marginBottom: '1rem',
                                filter: 'grayscale(100%) contrast(150%)',
                            }} />
                            <h3 style={{ textTransform: 'uppercase', fontSize: '1.2rem' }}>{post.title}</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, margin: '1rem 0' }}>{post.excerpt}</p>
                            <a href={`/blog/${post.slug}`} style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                border: '1px solid #00f2ff',
                                color: '#00f2ff',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                background: 'transparent'
                            }}>ACCESS_DATA</a>
                        </div>
                    ))}
                </div>
            </section>

            <footer style={{ padding: '2rem', borderTop: '2px solid #00f2ff', textAlign: 'center', fontSize: '0.8rem', opacity: 0.5 }}>
                PROTOCOL_v2.0 // © {new Date().getFullYear()} {site?.siteTitle}
            </footer>
        </div>
    );
}
