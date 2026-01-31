'use client';
import React, { useEffect, useState } from 'react';
import type { Post, Category, Author, Media, Site } from '@/payload-types';
import RichText from '@/components/RichText';

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

export default function CyberpunkPost({ post }: { post: Post }) {
    const author = post.author && typeof post.author === 'object' ? (post.author as Author) : null;
    const site = post.site && typeof post.site === 'object' ? (post.site as Site) : null;

    return (
        <div className="webflow-page-wrapper theme-cyberpunk" style={{ background: '#0b0e11', color: '#00f2ff', minHeight: '100vh', fontFamily: 'monospace' }}>
            <header style={{ padding: '1rem', borderBottom: '1px solid #00f2ff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="/blog" style={{ color: '#00f2ff', textDecoration: 'none' }}>{'< RETURN_TO_BASE'}</a>
                <span style={{ fontWeight: 'bold' }}>{site?.siteTitle} // NODE_VIEW</span>
            </header>

            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
                <div style={{ height: '400px', backgroundImage: `url(${getImageUrl(post.coverImage)})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '2px solid #00f2ff', marginBottom: '2rem', filter: 'hue-rotate(180deg) brightness(0.8)' }} />

                <h1 style={{ fontSize: '3rem', textTransform: 'uppercase', marginBottom: '1rem', lineHeight: '1', textShadow: '0 0 10px #00f2ff' }}>{post.title}</h1>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', fontSize: '0.8rem', opacity: 0.7 }}>
                    <div>AUTHOR: {author?.name || 'ANONYMOUS'}</div>
                    <div>DATE: {post.publishedAt ? new Date(post.publishedAt).toISOString() : 'UNKNOWN'}</div>
                </div>

                <div className="cyber-content" style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#fff', borderLeft: '1px solid #00f2ff', paddingLeft: '2rem' }}>
                    <RichText content={post.content} />
                </div>
            </main>

            <footer style={{ padding: '4rem', textAlign: 'center', opacity: 0.3 }}>
                [END_OF_TRANSMISSION]
            </footer>
        </div>
    );
}
