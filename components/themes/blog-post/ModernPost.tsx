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

const formatDate = (date: string | Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

export default function ModernPost({ post }: { post: Post }) {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [commentStatus, setCommentStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        // Track view
        fetch('/api/posts/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: post.id }),
        });

        // Fetch comments
        fetch(`/api/comments?postId=${post.id}`)
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error(err));
    }, [post.id]);

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment) return;

        setCommentStatus('loading');
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId: post.id,
                    content: newComment,
                    authorName,
                }),
            });

            if (res.ok) {
                setCommentStatus('success');
                setNewComment('');
                setAuthorName('');
            } else {
                setCommentStatus('error');
            }
        } catch (err) {
            console.error(err);
            setCommentStatus('error');
        }
    };

    const author = post.author && typeof post.author === 'object' ? (post.author as Author) : null;
    const categories = post.categories && Array.isArray(post.categories) ? (post.categories as Category[]) : [];
    const category = categories.length > 0 ? categories[0] : null;

    const site = post.site && typeof post.site === 'object' ? (post.site as Site) : null;
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
                            {navigation.length > 0 ? navigation.map((item, idx) => (
                                <a key={idx} className="hero-nav-link w-nav-link" href={item.link} target={item.newTab ? "_blank" : undefined}>{item.label}</a>
                            )) : (
                                <>
                                    <a className="hero-nav-link w-nav-link" href="/about-us">about</a>
                                    <a className="hero-nav-link w-nav-link" href="/blog">Blog</a>
                                    <a className="hero-nav-link w-nav-link" href="/categories">Categories</a>
                                    <a className="hero-nav-link w-nav-link" href="/authors">authors</a>
                                    <a className="hero-nav-link w-nav-link" href="/contact">Contact</a>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="w-layout-blockcontainer container-full padding-10 glow w-container">
                    <div className="space-page-top"></div>
                    <div className="blog-single-hero-wrapper">
                        <div className="blog-wrapper-full-single">
                            <div className="trigger-animation" style={{ opacity: '1' }}>
                                <div className="badge-card padding">
                                    <h6 className="color-white">{category?.name || 'Article'}</h6>
                                </div>
                                <div className="space-text"></div>
                                <h2 className="blog-title">{post.title}</h2>
                                <div className="space-text"></div>
                                <p className="blog-text">{post.excerpt}</p>
                                <div className="space-text"></div>
                                <h6 className="line-height-20px">
                                    {post.publishedAt ? formatDate(post.publishedAt) : ''}
                                </h6>
                                <div className="space-blog"></div>
                            </div>
                        </div>
                        <div className="blog-single-image" style={{ backgroundImage: `url("${getImageUrl(post.coverImage)}")`, opacity: '1' }}>
                            <div className="blog-hero-large-overlay"></div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section">
                <div className="fix-scroll-container">
                    <div className="w-layout-grid blog-page-grid">
                        <div className="blog-side-bar-left">
                            <div className="blog-rich-text w-richtext">
                                <RichText content={post.content} />
                            </div>
                        </div>

                        <div className="blog-side-bar-right">
                            <div className="upper-box">
                                {author && (
                                    <div className="blod-card-author" style={{ opacity: '1' }}>
                                        {getImageUrl(author.image) && (
                                            <div className="blog-card-image-wrapper">
                                                <img alt={author.name} src={getImageUrl(author.image)!} />
                                            </div>
                                        )}
                                        <div className="blog-author-info">
                                            <div className="w-layout-vflex author-name-occupation">
                                                <h4>{author.name}</h4>
                                            </div>
                                            <p className="centered">{author.bio}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="space-large"></div>

                    {/* Comments Section */}
                    <div className="comments-section" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                        <h3 className="color-white">Comments ({comments.length})</h3>
                        <div className="space-text"></div>

                        <div className="comment-list">
                            {comments.map((comment, i) => (
                                <div key={i} className="comment-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '1rem 0' }}>
                                    <h5 className="color-white">{comment.authorName || 'Anonymous'}</h5>
                                    <p style={{ opacity: 0.8 }}>{comment.content}</p>
                                    <small style={{ opacity: 0.5 }}>{formatDate(comment.createdAt)}</small>
                                </div>
                            ))}
                        </div>

                        <div className="space-large"></div>
                        <h4 className="color-white">Leave a Comment</h4>
                        <div className="space-text"></div>

                        {commentStatus === 'success' ? (
                            <div className="badge-card" style={{ background: 'rgba(0, 255, 0, 0.1)', padding: '1rem' }}>
                                <p className="color-white">Thank you! Your comment has been submitted and is awaiting moderation.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleCommentSubmit} className="comment-form">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="sign-up-text-field w-input"
                                    style={{ marginBottom: '1rem' }}
                                    value={authorName}
                                    onChange={(e) => setAuthorName(e.target.value)}
                                />
                                <textarea
                                    placeholder="Your Comment"
                                    className="sign-up-text-field w-input"
                                    style={{ minHeight: '100px', marginBottom: '1rem' }}
                                    required
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <input
                                    type="submit"
                                    value={commentStatus === 'loading' ? 'Submitting...' : 'Post Comment'}
                                    className="button-subscribe w-button"
                                    disabled={commentStatus === 'loading'}
                                />
                            </form>
                        )}
                    </div>
                </div>
            </div>

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
