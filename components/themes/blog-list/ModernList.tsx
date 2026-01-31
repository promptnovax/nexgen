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

export default function ModernList({ posts, categories, site }: { posts?: Post[], categories?: Category[], site?: Site }) {
    const logoUrl = getImageUrl(site?.logo) || "/images/66222af0bbedc4b8ceb7e595_Logo-2.svg";
    const navigation = site?.navigation || [];

    return (
        <div className="webflow-page-wrapper theme-modern">
            <div className="navbar w-nav" data-animation="default" data-collapse="medium" data-doc-height="1" data-duration="400" data-easing="ease" data-easing2="ease" role="banner">
                <div className="nav-container w-container">
                    <div className="nav-bar-menu-wrapper" style={{ opacity: '1' }}>
                        <a className="logo-wrapper w-inline-block" href="/">
                            <img alt={site?.siteTitle || "Logo"} className="logo" loading="lazy" src={logoUrl} />
                            {site?.siteTitle && <span style={{ marginLeft: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{site.siteTitle}</span>}
                        </a>
                        <div className="nav-line"></div>
                        <nav className="main-nav-wrapper w-nav-menu" role="navigation">
                            <a className="hero-nav-link w-nav-link" href="/">home</a>
                            <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                            {navigation.length > 0 ? navigation.map((item, idx) => (
                                <React.Fragment key={idx}>
                                    <a className="hero-nav-link w-nav-link" href={item.link} target={item.newTab ? "_blank" : undefined}>{item.label}</a>
                                    {idx < navigation.length - 1 && <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>}
                                </React.Fragment>
                            )) : (
                                <>
                                    <a className="hero-nav-link w-nav-link" href="/about-us">about</a>
                                    <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                                    <a aria-current="page" className="hero-nav-link w-nav-link w--current" href="/blog">Blog</a>
                                    <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                                    <a className="hero-nav-link w-nav-link" href="/categories">Categories</a>
                                    <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                                    <a className="hero-nav-link w-nav-link" href="/authors">authors</a>
                                    <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                                    <a className="hero-nav-link w-nav-link" href="/contact">Contact</a>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="w-layout-blockcontainer container-full padding-2-5 glow w-container">
                    <div className="space-page-top"></div>
                    <div className="title-wrapper" style={{ opacity: '1' }}>
                        <div className="line-separator"></div>
                        <h2 className="no-wrap">All <span className="outline-white">Posts</span></h2>
                        <div className="line-separator"></div>
                    </div>
                    <div className="space-mid"></div>

                    <div className="all-posts-wrapper">
                        <div className="width-100 w-dyn-list">
                            <div className="collection-list-grid w-dyn-items" role="list">
                                {posts && posts.map((post, index) => (
                                    <div key={index} className="blog-posts-wrapper w-dyn-item" role="listitem">
                                        <a className="card-wrapper w-inline-block" href={`/blog/${post.slug}`}>
                                            <div className="gradient-overlay"></div>
                                            <div className="flex justify-right">
                                                <div className="badge-card-rectangular-curve">
                                                    <h5>{(post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object' && post.categories[0] !== null) ? (post.categories[0] as Category).name : 'Article'}</h5>
                                                </div>
                                            </div>
                                            <div className="all-posts-text-wrapper">
                                                <h4>{post.title}</h4>
                                                <div className="line-separator"></div>
                                                <div className="flex space-between">
                                                    <div className="date-wrapper">
                                                        <h6 className="color-light-gray">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US') : ''}</h6>
                                                    </div>
                                                    <div className="flex">
                                                        {post.author && typeof post.author === 'object' && (
                                                            <div className="filled-circle-avatar">
                                                                <img alt="" loading="lazy" src={getImageUrl((post.author as Author).image)} />
                                                            </div>
                                                        )}
                                                        <h5 className="no-wrap">{post.author && typeof post.author === 'object' ? (post.author as Author).name : ''}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <img alt={post.title} className="image-absolute" src={getImageUrl(post.coverImage)} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-full padding-2-5 glow">
                    <div className="space-large"></div>
                    <div className="title-wrapper" style={{ opacity: '1' }}>
                        <div className="line-separator"></div>
                        <h2 className="no-wrap mobile-wrap">All <span className="outline-white">categories</span></h2>
                        <div className="line-separator"></div>
                    </div>
                    <div className="space-mid"></div>

                    <div className="w-dyn-list">
                        <div className="all-categories-wrapper w-dyn-items" role="list">
                            {categories && categories.map((cat, index) => (
                                <div key={index} className="w-dyn-item" role="listitem">
                                    <a className="categories-card w-inline-block" href={`/categories/${cat.slug}`} style={{ backgroundImage: cat.image ? `url("${getImageUrl(cat.image)}")` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                        <h4 className="category-post-title">{cat.name}</h4>
                                        <div className="gradient-overlay darker"></div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section background-dark">
                <div className="container-full w-container">
                    <div className="footer-bottom">
                        <div className="footer-copyright">© {site?.siteTitle || 'NEXGEN'}. All Rights Reserved.</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
