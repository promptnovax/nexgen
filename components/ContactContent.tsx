'use client';
import React, { useEffect } from 'react';
import type { ContactPage, Media, Site } from '../payload-types';

const getImageUrl = (media: string | Media | number | null | undefined) => {
  if (!media) return '';
  if (typeof media === 'string') return media;
  if (typeof media === 'number') return '';
  return media.url || '';
};

export default function ContactContent({ data, site }: { data?: ContactPage, site?: Site }) {
  useEffect(() => {
    // @ts-ignore
    if (window.Webflow && window.Webflow.destroy) {
      // @ts-ignore
      window.Webflow.destroy();
      // @ts-ignore
      window.Webflow.ready();
    }
  }, [data]);

  const hero = data?.hero;
  const faqs = data?.faqs || [];
  const cta = data?.cta;

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
                  <a className="hero-nav-link w-nav-link" href="/authors">authors</a>
                  <div className="dot hide-on-tab" style={{ display: 'inline-block', margin: '0 10px' }}></div>
                  <a aria-current="page" className="hero-nav-link w-nav-link w--current" href="/contact">Contact</a>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="w-layout-blockcontainer container-full padding-10 w-container">
          <div className="space-page-top"></div>
          <div className="space-small"></div>
          <div className="contact-us-form-wrapper" style={{ opacity: '1' }}>
            <div className="contact-title-wrapper">
              <div className="line-separator"></div>
              <h2 className="no-wrap mobile-wrap">{hero?.title || 'Contact Us'}</h2>
              <div className="line-separator"></div>
            </div>
            <div className="space-mid"></div>
            <p className="description-max-width">{hero?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</p>
            <div className="space-semi"></div>

            <div className="contact-us-form w-form">
              <form className="contact-us-block-wrapper">
                <div className="contact-us-flex-container">
                  <div className="contact-us-wrapper-half">
                    <div className="w-layout-vflex">
                      <label className="form-text">Name</label>
                      <input className="booking-text-field w-input" placeholder="John Doe" type="text" required />
                    </div>
                  </div>
                  <div className="contact-us-wrapper-half">
                    <div className="w-layout-vflex">
                      <label className="form-text">Email</label>
                      <input className="booking-text-field w-input" placeholder="blog@email.com" type="email" required />
                    </div>
                  </div>
                </div>
                <div className="message-title-field-wrapper">
                  <label className="form-text">Message</label>
                  <textarea className="text-area w-input" placeholder="Your Message" required></textarea>
                  <div className="space-text"></div>
                  <input className="submit-button w-button" type="submit" value="Send Message" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="w-layout-blockcontainer container-full padding-10 w-container">
          <div className="space-large"></div>
          <div className="faq-wrapper" id="faqs">
            <div className="faq-title-wrapper">
              <div className="line-separator"></div>
              <h3 className="no-wrap">{data?.faqTitle || 'FAQ'}</h3>
              <div className="line-separator"></div>
            </div>
            <div className="space-text"></div>
            <p className="description-max-width">{data?.faqDescription}</p>
            <div className="space-mid"></div>

            <div className="faq-content-wrapper">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-dropdown-accordion">
                  <div className="dropdown-toggle">
                    <div className="faq-flex">
                      <h5 className="not-centered">{faq.question}</h5>
                      <div className="faq-plus-icon invert">+</div>
                    </div>
                  </div>
                  <div className="dropdown-description-wrapper">
                    <div className="space-text"></div>
                    <p className="dropdown-description">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-large"></div>
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
