'use client';
import React, { useEffect, useState } from 'react';
import type { HomePage, Media, Post, Category, Author, Site } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  if (typeof media === 'number') return null; // Cannot get URL from ID directly without fetch
  return media.url || null;
};

const getAltText = (media: string | Media | number | null | undefined) => {
  if (!media) return '';
  if (typeof media === 'string' || typeof media === 'number') return '';
  return media.alt || '';
};

export default function IndexContent({ data, site }: { data?: HomePage, site?: Site }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !site?.id) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, siteId: site.id }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };
  useEffect(() => {
    // Re-initialize Webflow scripts if needed
    // @ts-ignore
    if (window.Webflow && window.Webflow.destroy) {
      // @ts-ignore
      window.Webflow.destroy();
      // @ts-ignore
      window.Webflow.ready();
    }
  }, [data]); // Read if data changes

  const heroSlides = data?.hero || [];
  const trendingPosts = data?.trending?.posts || [];
  const featuredCategories = data?.featuredCategories?.categories || [];
  const cta = data?.cta;

  // Use site settings for branding
  const logoUrl = getImageUrl(site?.logo) || "/images/66222af0bbedc4b8ceb7e595_Logo-2.svg";
  const navigation = site?.navigation || [];

  return (
    <div className="webflow-page-wrapper">
      <div className="navbar w-nav" data-animation="default" data-collapse="medium" data-doc-height="1" data-duration="400" data-easing="ease" data-easing2="ease" role="banner">
        <div className="nav-container w-container">
          <div className="nav-bar-menu-wrapper" style={{ opacity: '1' }}>
            <a aria-current="page" className="logo-wrapper w-inline-block w--current" href="/">
              <img alt={site?.siteTitle || "Logo"} className="logo" loading="lazy" src={logoUrl} />
              {site?.siteTitle && <span style={{ marginLeft: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>{site.siteTitle}</span>}
            </a>
            <div className="nav-line"></div>
            <nav className="main-nav-wrapper w-nav-menu" role="navigation">
              <div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/">home</a></div>
              <div className="dot hide-on-tab"></div>
              {navigation.length > 0 ? navigation.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="nav-link-wrapper">
                    <a className="hero-nav-link w-nav-link" href={item.link} target={item.newTab ? "_blank" : undefined}>{item.label}</a>
                  </div>
                  {idx < navigation.length - 1 && <div className="dot hide-on-tab"></div>}
                </React.Fragment>
              )) : (
                <>
                  <div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/about-us">about</a></div>
                  <div className="dot hide-on-tab"></div>
                  <div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/blog">Blog</a></div>
                  <div className="dot hide-on-tab"></div>
                  <div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/categories">Categories</a></div>
                  <div className="dot hide-on-tab"></div>
                  <div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/authors">authors</a></div>
                  <div className="dot hide-on-tab"></div>
                  <div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/contact">Contact</a></div>
                </>
              )}
            </nav>
            <div className="nav-menu-button w-nav-button" role="button" tabIndex={0}>
              <div className="nav-menu-icon w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="section">
        <div className="w-layout-blockcontainer container-full padding-5 glow w-container">
          <div className="space-page-top"></div>
          <div className="tabs w-tabs" data-current="Tab 1" data-duration-in="300" data-duration-out="100" data-easing="ease">
            <div className="tabs-content w-tab-content">
              {heroSlides.length > 0 ? heroSlides.map((slide, index) => (
                <div key={index} data-w-tab={`Tab ${index + 1}`} className={`w-tab-pane ${index === 0 ? 'w--tab-active' : ''}`} id={`w-tabs-0-data-w-pane-${index}`} role="tabpanel">
                  <div className="hero-collection-list-wrapper w-dyn-list">
                    <div className="w-dyn-items" role="list">
                      <div className="w-dyn-item" role="listitem">
                        <a className="slider-link-wrapper w-inline-block" href={slide.link || '#'}>
                          <div className="card-wrapper">
                            <div className="w-layout-hflex flex space-between">
                              <div className="circle-filled-with-border"><p className="icon star-icon">star</p></div>
                            </div>
                            <div className="text-wrapper centered">
                              <h3>{slide.title}</h3>
                              <div className="flex gap-32px">
                                <div className="flex center-on-mobile">
                                  {/* Author Image */}
                                  {slide.author && typeof slide.author === 'object' && (
                                    <div className="flex center-on-mobile">
                                      {getImageUrl((slide.author as Author).image) && (
                                        <div className="filled-circle-avatar">
                                          <img alt={(slide.author as Author).name} loading="eager" src={getImageUrl((slide.author as Author).image)!} />
                                        </div>
                                      )}
                                      <h5 className="line-height-15px">{(slide.author as Author).name}</h5>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="gradient-overlay"></div>
                          {getImageUrl(slide.image) ? (
                            <img
                              alt={getAltText(slide.image)}
                              className="image-absolute"
                              src={getImageUrl(slide.image)!}
                              style={{ backgroundImage: `url("${getImageUrl(slide.image)}")` }}
                            />
                          ) : (
                            <div className="image-absolute" style={{ backgroundColor: '#1a1a1a' }}></div>
                          )}
                          <div className="badge-card-rectangular-curve move-up-left">
                            <h5 className="capitalized">{slide.category}</h5>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                // Fallback if no slides
                <div className="w-tab-pane w--tab-active">
                  <div className="text-wrapper centered"><h3>No Hero Slides Configured</h3></div>
                </div>
              )}
            </div>

            {/* Tab Menu */}
            <div className="tabs-menu w-tab-menu" role="tablist">
              {heroSlides.map((_, index) => (
                <a
                  key={index}
                  data-w-tab={`Tab ${index + 1}`}
                  className={`tab tab-0${index + 1} w-inline-block w-tab-link ${index === 0 ? 'w--current' : ''}`}
                  href={`#w-tabs-0-data-w-pane-${index}`}
                  role="tab"
                ></a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="section">
        <div className="w-layout-blockcontainer container-full padding-10 glow w-container">
          <div className="space-large"></div>
          <div className="title-wrapper" style={{ opacity: '1' }}>
            <div className="line-separator"></div>
            <h2 className="no-wrap mobile-wrap"><span className="outline-white">{data?.trending?.title || "Trending Posts"}</span></h2>
            <div className="line-separator"></div>
          </div>
          <div className="space-semi"></div>

          {/* Dynamic Trending Posts */}
          <div className="posts-wrapper">
            {trendingPosts && Array.isArray(trendingPosts) && trendingPosts.map((postItem: any, index) => { // Use simple mapping for now
              const post = postItem.value ? postItem.value : postItem; // Handle relationship shape
              if (!post || typeof post !== 'object') return null;

              return (
                <div key={index} className="width-73 w-dyn-list" style={{ width: '48%', margin: '1%' }}> {/* Simplified Grid */}
                  <a className="card-expand-wrapper w-inline-block" href={`/blog/${post.slug}`} style={{ backgroundImage: `url("${getImageUrl(post.coverImage)}")` }}>
                    <div className="gradient-overlay"></div>
                    <div className="flex justify-right">
                      <div className="badge-card-rectangular-curve">
                        <h5>{(post.categories && post.categories.length > 0 && typeof post.categories[0] === 'object') ? (post.categories[0] as Category).name : 'Blog'}</h5>
                      </div>
                    </div>
                    <div className="text-wrapper top-a" style={{ opacity: '1' }}>
                      <h4>{post.title}</h4>
                      <div className="line-separator"></div>
                      <div className="flex space-between">
                        <div className="flex">
                          {post.author && typeof post.author === 'object' && (
                            <div className="flex">
                              {getImageUrl((post.author as Author).image) && (
                                <div className="filled-circle-avatar">
                                  <img loading="lazy" src={getImageUrl((post.author as Author).image)!} alt="" />
                                </div>
                              )}
                              <h5 className="no-wrap">{(post.author as Author).name}</h5>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      {cta && (
        <section className="section">
          <div className="w-layout-blockcontainer container-full padding-10 glow w-container">
            <div className="space-large"></div>
            <div className="cta-wrapper" style={{ opacity: '1' }}>
              <div className="w-layout-hflex cta-card-wrapper">
                <h2 className="cta-title">{cta.title}</h2>
                <div className="space-text"></div>
                <p>{cta.description}</p>
                <div className="space-semi"></div>
                <div className="sign-up-form w-form">
                  {status === 'success' ? (
                    <div className="w-form-done" style={{ display: 'block' }}>
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                  ) : (
                    <form className="sign-up-form-container" onSubmit={handleSubscribe}>
                      <input
                        className="sign-up-text-field w-input"
                        placeholder="Enter your email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === 'loading'}
                      />
                      <input
                        className="button-subscribe w-button"
                        type="submit"
                        value={status === 'loading' ? '...' : '→'}
                        disabled={status === 'loading'}
                      />
                    </form>
                  )}
                  {status === 'error' && (
                    <div className="w-form-fail" style={{ display: 'block' }}>
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-layout-hflex cta-card-wrapper sign-up-image" style={getImageUrl(cta.image) ? { backgroundImage: `url("${getImageUrl(cta.image)}")` } : { backgroundColor: '#1a1a1a' }}>
                <div className="gradient-overlay"></div>
              </div>
            </div>
            <div className="space-large"></div>
          </div>
        </section>
      )}

      <section className="section background-dark">
        <div className="w-layout-blockcontainer container-full max-width-1440px w-container">
          <div className="footer-wrapper-full">
            <div className="space"></div>
            <div className="footer">
              <div className="footer-flex-wrapper" style={{ opacity: '1' }}>
                <div className="footer-block-content">
                  <a aria-current="page" className="footer-logo-link w-inline-block w--current" href="/">
                    <img alt="Logo" className="logo" loading="lazy" src="/images/66222af0bbedc4b8ceb7e595_Logo-2.svg" />
                  </a>
                  <div className="footer-descrption-wrapper"><p className="max-width-420px">Pushing the the boundaries of the blogosphere.</p></div>
                  <div className="footer-social-link-wrapper invert">
                    <a className="footer-social-link w-inline-block" href="https://facebook.com/" target="_blank"><img alt="facebook icon black" className="footer-social-link-image" loading="lazy" src="/images/661e50fb8e75327e6f39ac48_facebook-black.webp" /></a>
                    <a className="footer-social-link w-inline-block" href="https://www.instagram.com/" target="_blank"><img alt="Instagram Icon Image Black" className="footer-social-link-image" loading="lazy" src="/images/661e50fb8e75327e6f39ac46_instagram-black.webp" /></a>
                    <a className="footer-social-link w-inline-block" href="https://www.twitter.com/" target="_blank"><img alt="social icon" className="footer-social-link-image" loading="lazy" src="/images/6623989694d863895b33bdcb_twitter%20(1).png" /></a>
                    <a className="footer-social-link w-inline-block" href="https://www.youtube.com/" target="_blank"><img alt="YouTube White Icon Image Black" className="footer-social-link-image" loading="lazy" src="/images/661e50fb8e75327e6f39ac47_youtube-black.webp" /></a>
                  </div>
                </div>
                <div className="footer-grid-wrapper">
                  <div className="footer-block"><div className="footer-title-text">Main</div><a href="/" className="footer-text">Home</a><a href="/about-us" className="footer-text">About</a></div>
                  {/* Simplified Links */}
                </div>
              </div>
              <div className="footer-divider" style={{ opacity: '1' }}></div>
              <div className="footer-bottom" style={{ opacity: '1' }}>
                <div className="footer-wrapper-half-small"><div className="footer-copyright">© NEXGEN Blog. All Rights Reserved.</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
