'use client';
import React, { useEffect } from 'react';
import type { Category, Post, Media, Author, Site } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (typeof media === 'number') return '';
    return media.url || '';
};

export default function CategoryProfileContent({ category, posts, site }: { category: Category, posts?: Post[], site?: Site }) {
    useEffect(() => {
        // @ts-ignore
        if (window.Webflow && window.Webflow.destroy) {
            // @ts-ignore
            window.Webflow.destroy();
            // @ts-ignore
            window.Webflow.ready();
        }
    }, [category, posts]);

    const logoUrl = getImageUrl(site?.logo) || "/images/66222af0bbedc4b8ceb7e595_Logo-2.svg";
    const navigation = site?.navigation || [];

    return (
        <div className="webflow-page-wrapper">
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
                            {navigation.length > 0 ? navigation.map((item, idx) => (
                                <a key={idx} className="hero-nav-link w-nav-link" href={item.link} target={item.newTab ? "_blank" : undefined}>{item.label}</a>
                            )) : (
                                <>
                                    <a className="hero-nav-link w-nav-link" href="/about-us">about</a>
                                    <a className="hero-nav-link w-nav-link" href="/blog">Blog</a>
                                    <a aria-current="page" className="hero-nav-link w-nav-link w--current" href="/categories">Categories</a>
                                    <a className="hero-nav-link w-nav-link" href="/authors">authors</a>
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
                        <h2 className="no-wrap">Category: <span className="outline-white">{category.name}</span></h2>
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
                                            <div className="all-posts-text-wrapper">
                                                <h4>{post.title}</h4>
                                                <div className="line-separator"></div>
                                                <div className="flex space-between">
                                                    <h6 className="color-light-gray">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}</h6>
                                                    <div className="flex">
                                                        {post.author && typeof post.author === 'object' && (
                                                            <div className="filled-circle-avatar">
                                                                <img src={getImageUrl((post.author as Author).image)} alt="" />
                                                            </div>
                                                        )}
                                                        <h5 className="no-wrap">{typeof post.author === 'object' ? (post.author as Author).name : ''}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <img alt={post.title} className="image-absolute" src={getImageUrl(post.coverImage)} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                            {(!posts || posts.length === 0) && (
                                <div className="text-center py-10">
                                    <h3>No posts found in this category.</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section background-dark">
                <div className="container-full w-container">
                    <div className="footer-bottom">
                        <div className="footer-copyright">© NEXGEN Blog. All Rights Reserved.</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
