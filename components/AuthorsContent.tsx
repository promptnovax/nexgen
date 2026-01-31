'use client';
import React, { useEffect } from 'react';
import type { Author, Media, Site } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
  if (!media) return '';
  if (typeof media === 'string') return media;
  if (typeof media === 'number') return '';
  return media.url || '';
};

export default function AuthorsContent({ authors, site }: { authors?: Author[], site?: Site }) {
  useEffect(() => {
    // @ts-ignore
    if (window.Webflow && window.Webflow.destroy) {
      // @ts-ignore
      window.Webflow.destroy();
      // @ts-ignore
      window.Webflow.ready();
    }
  }, [authors]);

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
                  <a className="hero-nav-link w-nav-link" href="/categories">Categories</a>
                  <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                  <a aria-current="page" className="hero-nav-link w-nav-link w--current" href="/authors">authors</a>
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
            <h2 className="no-wrap">Our <span className="outline-white">Authors</span></h2>
            <div className="line-separator"></div>
          </div>
          <div className="space-mid"></div>

          <div className="w-dyn-list">
            <div className="collection-list-grid w-dyn-items" role="list">
              {authors && authors.map((author, index) => (
                <div key={index} className="w-dyn-item" role="listitem">
                  <a className="authors-card w-inline-block" href={`/authors/${author.slug}`}>
                    <div className="team-grid">
                      <div className="w-layout-hflex card-wrapper team-image" style={{ backgroundImage: `url("${getImageUrl(author.image)}")` }}>
                        <div className="gradient-overlay"></div>
                      </div>
                      <div className="text-card-wrapper team-text">
                        <h3 className="centered">{author.name}</h3>
                        <div className="badge-card-rectangular-curve"><h5 className="capitalized">Author</h5></div>
                        <p className="paragraph-max-width">{author.bio}</p>
                        <div className="view-profile"><p className="color-white">View Profile</p></div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Simplified */}
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
