'use client';
import React, { useEffect } from 'react';
import type { Author, Post, Media, Category } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    if (typeof media === 'number') return '';
    return media.url || '';
};

export default function AuthorProfileContent({ author, posts }: { author: Author, posts?: Post[] }) {
    useEffect(() => {
        // @ts-ignore
        if (window.Webflow && window.Webflow.destroy) {
            // @ts-ignore
            window.Webflow.destroy();
            // @ts-ignore
            window.Webflow.ready();
        }
    }, [author, posts]);

    return (
        <div className="webflow-page-wrapper">
            <div className="navbar w-nav" data-animation="default" data-collapse="medium" data-doc-height="1" data-duration="400" data-easing="ease" data-easing2="ease" role="banner">
                <div className="nav-container w-container">
                    <div className="nav-bar-menu-wrapper" style={{ opacity: '1' }}>
                        <a className="logo-wrapper w-inline-block" href="/">
                            <img alt="Logo" className="logo" loading="lazy" src="/images/66222af0bbedc4b8ceb7e595_Logo-2.svg" />
                        </a>
                        <div className="nav-line"></div>
                        <nav className="main-nav-wrapper w-nav-menu" role="navigation">
                            <a className="hero-nav-link w-nav-link" href="/">home</a>
                            <a className="hero-nav-link w-nav-link" href="/about-us">about</a>
                            <a className="hero-nav-link w-nav-link" href="/blog">Blog</a>
                            <a className="hero-nav-link w-nav-link" href="/categories">Categories</a>
                            <a className="hero-nav-link w-nav-link" href="/authors">authors</a>
                            <a className="hero-nav-link w-nav-link" href="/category_all">SHOP</a>
                            <a className="hero-nav-link w-nav-link" href="/contact">Contact</a>
                        </nav>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="w-layout-blockcontainer container-full padding-2-5 glow w-container">
                    <div className="space-page-top"></div>
                    <div className="author-details-wrapper">
                        <div className="author-info-flex">
                            <div className="author-image-large" style={{ backgroundImage: `url("${getImageUrl(author.image)}")` }}></div>
                            <div className="author-text-wrapper">
                                <h1 className="color-white">{author.name}</h1>
                                <div className="badge-card-rectangular-curve"><h5 className="capitalized">Author</h5></div>
                                <div className="space-text"></div>
                                <p className="paragraph-max-width">{author.bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-large"></div>

                    <div className="title-wrapper" style={{ opacity: '1' }}>
                        <div className="line-separator"></div>
                        <h2 className="no-wrap">Posts by <span className="outline-white">{author.name}</span></h2>
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
                                                <h6 className="color-light-gray">{post.publishedDate ? new Date(post.publishedDate).toLocaleDateString() : ''}</h6>
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
