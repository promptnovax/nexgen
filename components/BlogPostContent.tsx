'use client';
import React from 'react';
import type { Post } from '../payload-types';
import ModernPost from './themes/blog-post/ModernPost';
import CyberpunkPost from './themes/blog-post/CyberpunkPost';

export default function BlogPostContent({ post }: { post: Post }) {
    const theme = typeof post.site === 'object' ? (post.site as any)?.theme : null;
    const layout = theme?.layoutType || 'modern';

    switch (layout) {
        case 'cyberpunk':
            return <CyberpunkPost post={post} />;
        case 'classic':
            return <ModernPost post={post} />;
        case 'minimal':
            return <ModernPost post={post} />;
        default:
            return <ModernPost post={post} />;
    }
}
