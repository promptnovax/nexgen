'use client';
import React, { useEffect } from 'react';
import type { AboutPage, Author, Media, Site } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
  if (!media) return '';
  if (typeof media === 'string') return media;
  if (typeof media === 'number') return '';
  return media.url || '';
};

const getAltText = (media: string | Media | number | null | undefined) => {
  if (!media) return '';
  if (typeof media === 'string' || typeof media === 'number') return '';
  return media.alt || '';
};

export default function AboutUsContent({ data, authors, site }: { data?: AboutPage, authors?: Author[], site?: Site }) {
  useEffect(() => {
    // @ts-ignore
    if (window.Webflow && window.Webflow.destroy) {
      // @ts-ignore
      window.Webflow.destroy();
      // @ts-ignore
      window.Webflow.ready();
    }
  }, [data, authors]);

  const logoUrl = getImageUrl(site?.logo) || "/images/66222af0bbedc4b8ceb7e595_Logo-2.svg";
  const navigation = site?.navigation || [];

  const hero = data?.hero;
  const images = data?.images || [];
  const values = data?.values || [];
  const cta = data?.cta;

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
                  <a aria-current="page" className="hero-nav-link w-nav-link w--current" href="/about-us">about</a>
                  <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                  <a className="hero-nav-link w-nav-link" href="/blog">Blog</a>
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

      {/* Hero Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container-full padding-5 glow w-container">
          <div className="space-page-top"></div>
          <div className="hero-title-wrapper" style={{ opacity: '1' }}>
            <h1 className="no-capitalize title-max-width">{hero?.title || 'Pushing the boundaries of the blogosphere'}</h1>
            <div className="space-text"></div>
            <p className="paragraph-max-width">{hero?.subtitle || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
          </div>
          <div className="space-large"></div>
        </div>
      </section>

      {/* Images Section */}
      <section className="section height-1920px">
        <div className="w-layout-blockcontainer about-container w-container">
          <div className="about-images-flex" style={{ opacity: '1' }}>
            {images.length > 0 ? images.map((imgItem, index) => (
              <img key={index} alt={imgItem.alt || ''} className="about-image" loading="eager" src={getImageUrl(imgItem.image)} />
            )) : (
              <>
                <img alt="pink flower" className="about-image" src="/images/661e50fb8e75327e6f39ac57_NatureV.jpg" />
                <img alt="astronaut" className="about-image" src="/images/661e50fb8e75327e6f39ac53_AstroV.jpg" />
                <img alt="red rock" className="about-image" src="/images/661e50fb8e75327e6f39ac55_Nature2V.jpg" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <div className="container-full padding-10 glow">
          <div className="space-large"></div>
          <div className="title-wrapper team-title" style={{ opacity: '1' }}>
            <div className="line-separator"></div>
            <h2 className="no-wrap">{data?.teamTitle || 'Our Team'}</h2>
            <div className="line-separator"></div>
          </div>
          <div className="space-mid"></div>

          <div className="team-tab w-tabs">
            <div className="w-tab-content">
              {authors && authors.map((author, index) => (
                <div key={index} className={`w-tab-pane ${index === 0 ? 'w--tab-active' : ''}`} data-w-tab={`Team ${index + 1}`} role="tabpanel">
                  <div className="team-grid">
                    <div className="w-layout-hflex card-wrapper team-image" style={{ backgroundImage: `url("${getImageUrl(author.image)}")` }}>
                      <div className="gradient-overlay"></div>
                    </div>
                    <div className="text-card-wrapper team-text">
                      <h3 className="centered">{author.name}</h3>
                      <div className="badge-card-rectangular-curve"><h5 className="capitalized">Author</h5></div>
                      <p className="paragraph-max-width">{author.bio}</p>
                      <a className="view-profile w-inline-block" href={`/authors/${author.slug}`}>
                        <p className="color-white">View Profile</p>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="team-nav-tab w-tab-menu" role="tablist">
              {authors?.map((author, index) => (
                <a key={index} className={`text-card-wrapper tabs-button w-inline-block w-tab-link ${index === 0 ? 'w--current' : ''}`} data-w-tab={`Team ${index + 1}`} role="tab">
                  <div className="flex gap-16px">
                    <div className="filled-circle-avatar"><img alt={author.name} src={getImageUrl(author.image)} /></div>
                    <h5 className="color-white">{author.name}</h5>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <div className="w-layout-blockcontainer container-full padding-10 glow overflow w-container">
          <div className="values-main-wrapper" style={{ opacity: '1' }}>
            <div className="space-large"></div>
            <div className="title-wrapper values" style={{ opacity: '1' }}>
              <h2 className="no-wrap">Our <span className="outline-white">Values</span></h2>
              <div className="line-separator"></div>
            </div>
            <div className="space-mid"></div>

            {values.map((value, index) => (
              <div key={index} className="values-grid-wrapper">
                <div className="values-circle"><h5>0{index + 1}</h5></div>
                <div className="text-card-wrapper values-card" style={{ opacity: '1' }}>
                  <div className="gap-8px-row">
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                  <div className="gradient-overlay"></div>
                </div>
                <div className="w-layout-hflex values-wrapper value-01" style={{ opacity: '1' }}><div className="gradient-overlay"></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                  <form className="sign-up-form-container">
                    <input className="sign-up-text-field w-input" placeholder="Enter your email" type="email" required />
                    <input className="button-subscribe w-button" type="submit" value="→" />
                  </form>
                </div>
              </div>
              <div className="w-layout-hflex cta-card-wrapper sign-up-image" style={{ backgroundImage: `url("${getImageUrl(cta.image)}")` }}>
                <div className="gradient-overlay"></div>
              </div>
            </div>
            <div className="space-large"></div>
          </div>
        </section>
      )}

      {/* Footer Partial (Static for now as planned) */}
      <section className="section background-dark">
        <div className="w-layout-blockcontainer container-full max-width-1440px w-container">
          <div className="footer-wrapper-full">
            <div className="footer-bottom" style={{ opacity: '1' }}>
              <div className="footer-copyright">© NEXGEN Blog. All Rights Reserved.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
