'use client';
import React from 'react';
import type { Post, Category, Site } from '../payload-types';
import ModernList from './themes/blog-list/ModernList';
import CyberpunkList from './themes/blog-list/CyberpunkList';

export default function BlogContent({ posts, categories, site }: { posts?: Post[], categories?: Category[], site?: Site }) {
  const theme = typeof site?.theme === 'object' ? site.theme : null;
  const layout = (theme as any)?.layoutType || 'modern';

  // Choose the layout component based on the theme setting
  switch (layout) {
    case 'cyberpunk':
      return <CyberpunkList posts={posts} categories={categories} site={site} />;
    case 'classic':
      // Fallback to modern until classic is built
      return <ModernList posts={posts} categories={categories} site={site} />;
    case 'minimal':
      // Fallback to modern until minimal is built
      return <ModernList posts={posts} categories={categories} site={site} />;
    default:
      return <ModernList posts={posts} categories={categories} site={site} />;
  }
}
