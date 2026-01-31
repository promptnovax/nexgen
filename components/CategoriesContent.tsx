'use client';
import React, { useEffect } from 'react';
import type { Category, Site, Media } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
  if (!media) return null;
  if (typeof media === 'string') return media;
  if (typeof media === 'number') return null;
  return media.url || null;
};

export default function CategoriesContent({ categories, site }: { categories?: Category[], site?: Site }) {
  useEffect(() => {
    // @ts-ignore
    if (window.Webflow && window.Webflow.destroy) {
      // @ts-ignore
      window.Webflow.destroy();
      // @ts-ignore
      window.Webflow.ready();
    }
  }, [categories]);

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
                  <a className="hero-nav-link w-nav-link" href="/blog">Blog</a>
                  <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                  <a aria-current="page" className="hero-nav-link w-nav-link w--current" href="/categories">Categories</a>
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

      <section>
        <div className="container-full padding-10 overflow">
          <div className="space-page-top"></div>
          <div className="title-wrapper categories" style={{ opacity: '1' }}>
            <div className="line-separator hide-on-mobile"></div>
            <h2 className="no-wrap mobile-wrap">All <span className="outline-white">categories</span></h2>
            <div className="line-separator"></div>
          </div>
          <div className="space-mid"></div>

          <div className="w-dyn-list">
            <div className="categories-main-wrapper w-dyn-items" role="list">
              {categories && categories.map((cat, index) => (
                <div key={index} className="categories-wrapper w-dyn-item" role="listitem">
                  <a className="card-wrapper w-inline-block" href={`/categories/${cat.slug}`}>
                    <h3 className="category-post-title">{cat.name}</h3>
                    <div className="gradient-overlay darker"></div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="space-large"></div>
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
