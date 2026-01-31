'use client';
import React, { useEffect } from 'react';

export default function Blog_WayForAGreenerFutureContent() {
  useEffect(() => {
    // Re-initialize Webflow scripts if needed
    if (window.Webflow && window.Webflow.destroy) {
        window.Webflow.destroy();
        window.Webflow.ready();
    }
  }, []);

  return (
    <div className="webflow-page-wrapper">
      {/* Generated from https://nexgen-blog.webflow.io/blog/way-for-a-greener-future */}
      <div className="preloader-wrapper" style={{ display: 'none' }}><div className="top-preloader" style={{ opacity: '1', transform: 'translate3d(0px, -100%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}></div><div className="bottom-preloader" style={{ opacity: '1', transform: 'translate3d(0px, 100%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}></div><div className="preloader-logo-wrapper" style={{ opacity: '0' }}><div className="w-layout-hflex flex-block-preloader-logo"><img alt="Logo" className="logo-image-preloader" loading="eager" src="/images/66222af0bbedc4b8ceb7e595_Logo-2.svg"/></div></div></div><div className="navbar w-nav" data-animation="default" data-collapse="medium" data-doc-height="1" data-duration="400" data-easing="ease" data-easing2="ease" role="banner"><div className="nav-container w-container"><div className="nav-bar-menu-wrapper" data-w-id="232d42e2-1307-4def-ed37-7eeffeafb993" style={{ opacity: '1' }}><a className="logo-wrapper w-inline-block" href="/"><img alt="Logo" className="logo" loading="lazy" src="/images/66222af0bbedc4b8ceb7e595_Logo-2.svg"/></a><div className="nav-line"></div><nav className="main-nav-wrapper w-nav-menu" role="navigation"><div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/" style={{ maxWidth: '1440px' }}>home</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/" style={{ maxWidth: '1440px' }}>home</a></div><div className="dot hide-on-tab"></div><div className="nav-link-wrapper" data-w-id="5a167fff-e033-83f7-c7aa-c5a65e6a2ccd"><a className="hero-nav-link w-nav-link" href="/about-us" style={{ maxWidth: '1440px' }}>about</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/about-us" style={{ maxWidth: '1440px' }}>about</a></div><div className="dot hide-on-tab"></div><div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/blog" style={{ maxWidth: '1440px' }}>Blog</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/blog" style={{ maxWidth: '1440px' }}>Blog</a></div><div className="dot hide-on-tab"></div><div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/categories" style={{ maxWidth: '1440px' }}>Categories</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/categories" style={{ maxWidth: '1440px' }}>Categories</a></div><div className="dot hide-on-tab"></div><div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/authors" style={{ maxWidth: '1440px' }}>authors</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/authors" style={{ maxWidth: '1440px' }}>authors</a></div><div className="dot hide-on-tab"></div><div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/category_all" style={{ maxWidth: '1440px' }}>SHOP</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/category_all" style={{ maxWidth: '1440px' }}>SHOP</a></div><div className="dot hide-on-tab"></div><div className="nav-link-wrapper"><a className="hero-nav-link w-nav-link" href="/contact" style={{ maxWidth: '1440px' }}>Contact</a><a className="hero-nav-link move-down hide-on-tab w-nav-link" href="/contact" style={{ maxWidth: '1440px' }}>Contact</a></div></nav><div className="nav-flex"><div className="w-commerce-commercecartwrapper cart" data-node-type="commerce-cart-wrapper" data-open-product="" data-wf-cart-query="query Dynamo3 {
  database {
    id
    commerceOrder {
      comment
      extraItems {
        name
        pluginId
        pluginName
        price {
          decimalValue
          string
          unit
          value
        }
      }
      id
      startedOn
      statusFlags {
        hasDownloads
        hasSubscription
        isFreeOrder
        requiresShipping
      }
      subtotal {
        decimalValue
        string
        unit
        value
      }
      total {
        decimalValue
        string
        unit
        value
      }
      updatedOn
      userItems {
        count
        id
        price {
          value
          unit
          decimalValue
          string
        }
        product {
          id
          cmsLocaleId
          draft
          archived
          f_ec_product_type_2dr10dr: productType {
            id
            name
          }
          f_name_: name
          f_sku_properties_3dr: skuProperties {
            id
            name
            enum {
              id
              name
              slug
            }
          }
        }
        rowTotal {
          decimalValue
          string
          unit
          value
        }
        sku {
          cmsLocaleId
          draft
          archived
          f_main_image_4dr: mainImage {
            url
            file {
              size
              origFileName
              createdOn
              updatedOn
              mimeType
              width
              height
              variants {
                origFileName
                quality
                height
                width
                s3Url
                error
                size
              }
            }
            alt
          }
          f_sku_values_3dr: skuValues {
            property {
              id
            }
            value {
              id
            }
          }
          id
        }
        subscriptionFrequency
        subscriptionInterval
        subscriptionTrial
      }
      userItemsCount
    }
  }
  site {
    commerce {
      id
      businessAddress {
        country
      }
      defaultCountry
      defaultCurrency
      quickCheckoutEnabled
    }
  }
}" data-wf-cart-type="modal" data-wf-page-link-href-prefix=""><a aria-haspopup="dialog" aria-label="Open empty cart" className="w-commerce-commercecartopenlink cart-button-wrapper w-inline-block" data-node-type="commerce-cart-open-link" href="#" role="button"><svg className="w-commerce-commercecartopenlinkicon cart-icon" height="17px" viewBox="0 0 17 17" width="17px"><g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><path d="M2.60592789,2 L0,2 L0,0 L4.39407211,0 L4.84288393,4 L16,4 L16,9.93844589 L3.76940945,12.3694378 L2.60592789,2 Z M15.5,17 C14.6715729,17 14,16.3284271 14,15.5 C14,14.6715729 14.6715729,14 15.5,14 C16.3284271,14 17,14.6715729 17,15.5 C17,16.3284271 16.3284271,17 15.5,17 Z M5.5,17 C4.67157288,17 4,16.3284271 4,15.5 C4,14.6715729 4.67157288,14 5.5,14 C6.32842712,14 7,14.6715729 7,15.5 C7,16.3284271 6.32842712,17 5.5,17 Z" fill="currentColor" fillRule="nonzero"></path></g></svg><div className="cart-text-block w-inline-block">Cart</div><div className="w-commerce-commercecartopenlinkcount cart-quantity" data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22Number%22%2C%22filter%22%3A%7B%22type%22%3A%22numberPrecision%22%2C%22params%22%3A%5B%220%22%2C%22numberPrecision%22%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItemsCount%22%7D%7D%5D">0</div></a><div className="w-commerce-commercecartcontainerwrapper w-commerce-commercecartcontainerwrapper--cartType-modal" data-node-type="commerce-cart-container-wrapper" style={{ display: 'none' }}><div className="w-commerce-commercecartcontainer" data-node-type="commerce-cart-container" role="dialog"><div className="w-commerce-commercecartheader cart-header"><h4 className="w-commerce-commercecartheading color-black">Your Cart</h4><a aria-label="Close cart" className="w-commerce-commercecartcloselink w-inline-block" data-node-type="commerce-cart-close-link" role="button"><svg height="16px" viewBox="0 0 16 16" width="16px"><g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"><g fill="#333333" fillRule="nonzero"><polygon points="6.23223305 8 0.616116524 13.6161165 2.38388348 15.3838835 8 9.76776695 13.6161165 15.3838835 15.3838835 13.6161165 9.76776695 8 15.3838835 2.38388348 13.6161165 0.616116524 8 6.23223305 2.38388348 0.616116524 0.616116524 2.38388348 6.23223305 8"></polygon></g></g></svg></a></div><div className="w-commerce-commercecartformwrapper"><form className="w-commerce-commercecartform" data-node-type="commerce-cart-form" style={{ display: 'none' }}><div className="w-commerce-commercecartlist" data-wf-collection="database.commerceOrder.userItems" data-wf-template-id="wf-template-9149f50a-9575-743d-274d-8336a271cb05"></div><div className="w-commerce-commercecartfooter"><div aria-atomic="true" aria-live="polite" className="w-commerce-commercecartlineitem"><div className="cart-window-text">Subtotal</div><div className="w-commerce-commercecartordervalue cart-window-text" data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.subtotal%22%7D%7D%5D"></div></div><div><div data-node-type="commerce-cart-quick-checkout-actions" style={{ display: 'none' }}><a aria-haspopup="dialog" aria-label="Apple Pay" className="w-commerce-commercecartapplepaybutton" data-node-type="commerce-cart-apple-pay-button" role="button" style={{ backgroundImage: '-webkit-named-image(apple-pay-logo-white)', backgroundSize: '100% 50%', backgroundPosition: '50% 50%', backgroundRepeat: 'no-repeat' }} tabIndex="0"><div></div></a><a aria-haspopup="dialog" className="w-commerce-commercecartquickcheckoutbutton" data-node-type="commerce-cart-quick-checkout-button" role="button" style={{ display: 'none' }} tabIndex="0"><svg className="w-commerce-commercequickcheckoutgoogleicon" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><polygon id="google-mark-a" points="0 .329 3.494 .329 3.494 7.649 0 7.649"></polygon><polygon id="google-mark-c" points=".894 0 13.169 0 13.169 6.443 .894 6.443"></polygon></defs><g fill="none" fillRule="evenodd"><path d="M10.5967,12.0469 L10.5967,14.0649 L13.1167,14.0649 C14.6047,12.6759 15.4577,10.6209 15.4577,8.1779 C15.4577,7.6339 15.4137,7.0889 15.3257,6.5559 L7.8887,6.5559 L7.8887,9.6329 L12.1507,9.6329 C11.9767,10.6119 11.4147,11.4899 10.5967,12.0469" fill="#4285F4"></path><path d="M7.8887,16 C10.0137,16 11.8107,15.289 13.1147,14.067 C13.1147,14.066 13.1157,14.065 13.1167,14.064 L10.5967,12.047 C10.5877,12.053 10.5807,12.061 10.5727,12.067 C9.8607,12.556 8.9507,12.833 7.8887,12.833 C5.8577,12.833 4.1387,11.457 3.4937,9.605 L0.8747,9.605 L0.8747,11.648 C2.2197,14.319 4.9287,16 7.8887,16" fill="#34A853"></path><g transform="translate(0 4)"><mask fill="#fff" id="google-mark-b"><use xlinkHref="#google-mark-a"></use></mask><path d="M3.4639,5.5337 C3.1369,4.5477 3.1359,3.4727 3.4609,2.4757 L3.4639,2.4777 C3.4679,2.4657 3.4749,2.4547 3.4789,2.4427 L3.4939,0.3287 L0.8939,0.3287 C0.8799,0.3577 0.8599,0.3827 0.8459,0.4117 C-0.2821,2.6667 -0.2821,5.3337 0.8459,7.5887 L0.8459,7.5997 C0.8549,7.6167 0.8659,7.6317 0.8749,7.6487 L3.4939,5.6057 C3.4849,5.5807 3.4729,5.5587 3.4639,5.5337" fill="#FBBC04" mask="url(#google-mark-b)"></path></g><mask fill="#fff" id="google-mark-d"><use xlinkHref="#google-mark-c"></use></mask><path d="M0.894,4.3291 L3.478,6.4431 C4.113,4.5611 5.843,3.1671 7.889,3.1671 C9.018,3.1451 10.102,3.5781 10.912,4.3671 L13.169,2.0781 C11.733,0.7231 9.85,-0.0219 7.889,0.0001 C4.941,0.0001 2.245,1.6791 0.894,4.3291" fill="#EA4335" mask="url(#google-mark-d)"></path></g></svg><svg className="w-commerce-commercequickcheckoutmicrosofticon" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><polygon fill="#F05022" points="7 7 1 7 1 1 7 1"></polygon><polygon fill="#7DB902" points="15 7 9 7 9 1 15 1"></polygon><polygon fill="#00A4EE" points="7 15 1 15 1 9 7 9"></polygon><polygon fill="#FFB700" points="15 15 9 15 9 9 15 9"></polygon></g></svg><div>Pay with browser.</div></a></div><a className="w-commerce-commercecartcheckoutbutton button checkout" data-loading-text="Hang Tight..." data-node-type="cart-checkout-button" href="/checkout" value="Continue to Checkout">Continue to Checkout</a></div></div></form><div className="w-commerce-commercecartemptystate"><div aria-label="This cart is empty" aria-live="polite" className="color-black">No items found.</div></div><div aria-live="assertive" className="w-commerce-commercecarterrorstate" data-node-type="commerce-cart-error" style={{ display: 'none' }}><div className="color-black w-cart-error-msg" data-w-cart-cart_order_min-error="The order minimum was not met. Add more items to your cart to continue." data-w-cart-checkout-error="Checkout is disabled on this site." data-w-cart-general-error="Something went wrong when adding this item to the cart." data-w-cart-quantity-error="Product is not available in this quantity." data-w-cart-subscription_error-error="Before you purchase, please use your email invite to verify your address so we can send order updates.">Product is not available in this quantity.</div></div></div></div></div></div><div aria-controls="w-nav-overlay-0" aria-expanded="false" aria-haspopup="menu" aria-label="menu" className="nav-menu-button w-nav-button" role="button" style={{ webkitUserSelect: 'text' }} tabIndex="0"><div className="nav-menu-icon w-icon-nav-menu"></div></div></div></div></div><div className="w-nav-overlay" data-wf-ignore="" id="w-nav-overlay-0"></div></div><section className="section"><div className="w-layout-blockcontainer container-full padding-10 glow w-container"><div className="space-page-top"></div><div className="blog-single-hero-wrapper"><div className="blog-wrapper-full-single"><div className="trigger-animation" data-w-id="027cc1ca-d4f5-9b29-dddc-6c1d00475990" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><div className="badge-card padding"><h6 className="color-white">Sustainability</h6></div><div className="space-text"></div><h2 className="blog-title">Way for a Greener Future</h2><div className="space-text"></div><p className="blog-text">Sustainability is no longer an optional endeavor for businesses.</p><div className="space-text"></div><h6 className="line-height-20px">April 16, 2024</h6><div className="space-blog"></div></div></div><div className="blog-single-image" data-w-id="027cc1ca-d4f5-9b29-dddc-6c1d0047599e" style={{ backgroundImage: 'url("/images/661e50fb8e75327e6f39acd5_Sustain.jpg")', opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><div className="blog-hero-large-overlay"></div></div></div></div></section><div className="section"><div className="fix-scroll-container"><div className="w-layout-grid blog-page-grid"><div className="blog-side-bar-left" data-w-id="68ca93ee-d6f6-0af0-b9b4-f23898143e94" id="w-node-_68ca93ee-d6f6-0af0-b9b4-f23898143e94-6f39ac7e" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><div className="blog-rich-text w-richtext" data-w-id="68ca93ee-d6f6-0af0-b9b4-f23898143e95" id="w-node-_68ca93ee-d6f6-0af0-b9b4-f23898143e95-6f39ac7e" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><h3><strong>The Business Case for Sustainability</strong>:</h3><p>Sustainable practices often lead to reduced energy and resource consumption, resulting in cost savings over time. Consumers increasingly prefer eco-friendly products and services, creating a growing market for sustainable businesses.</p><p>â€</p><h3><strong>Key Components of Sustainable Business Practices</strong>:</h3><p>Implement measures to reduce carbon emissions, conserve resources, and minimize waste. Assess and improve the sustainability of supply chains, from sourcing raw materials to distribution. Develop and promote products and services that have a minimal environmental footprint.</p><p>â€</p><h3><strong>Corporate Social Responsibility (CSR)</strong>: </h3><p>Invest in charitable endeavors and social initiatives that align with sustainability goals. Uphold ethical standards in dealings with employees, suppliers, and customers. Support environmental organizations and initiatives that promote conservation and sustainable development.</p><p>â€</p><h3><strong>Sustainable Innovation</strong>:</h3><p>Invest in research and development to create innovative solutions that reduce environmental impact. Embrace clean technologies and practices, such as renewable energy sources and energy-efficient systems. For products that meet ethical and sustainability criteria in production.</p><p>â€</p><p>â€</p><blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean venenatis interdum posuere. Morbi id magna at arcu tempus ornare. Fusce mauris purus, rhoncus a sollicitudin sit amet, placerat vitae nisl. Morbi feugiat est in accumsan facilisis.</blockquote><p>â€</p><h3>Conclusion:</h3><p>Sustainable business practices are not just a trend; they are a fundamental shift in the way companies operate. Embracing sustainability is not only a responsible choice but also a strategic one, as it can lead to financial savings, market competitiveness, and a positive impact on society and the environment.</p></div></div><div className="blog-side-bar-right" data-w-id="68ca93ee-d6f6-0af0-b9b4-f23898143ea2" id="w-node-_68ca93ee-d6f6-0af0-b9b4-f23898143ea2-6f39ac7e" style={{ opacity: '1' }}><div className="upper-box" data-w-id="68ca93ee-d6f6-0af0-b9b4-f23898143ea3" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><div className="blod-card-author" data-w-id="68ca93ee-d6f6-0af0-b9b4-f23898143ea4" style={{ opacity: '1' }}><div className="blog-card-image-wrapper"><img alt="" loading="lazy" src="/images/661e50fb8e75327e6f39ace8_Author1Small-2.jpg"/></div><div className="blog-author-info"><div className="w-layout-vflex author-name-occupation"><h4>Marcus King</h4><h6>Writer</h6></div><p className="centered">Marcus King is a writer with unique views. </p></div></div></div></div></div><div className="space-large"></div></div></div><section className="section background-dark"><div className="w-layout-blockcontainer container-full max-width-1440px w-container"><div className="footer-wrapper-full"><div className="space"></div><div className="footer"><div className="footer-flex-wrapper" data-w-id="7511f9df-060d-cd6f-8f86-c153652fe2d2" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><div className="footer-block-content"><a className="footer-logo-link w-inline-block" href="/"><img alt="Logo" className="logo" loading="lazy" src="/images/66222af0bbedc4b8ceb7e595_Logo-2.svg"/></a><div className="footer-descrption-wrapper"><p className="max-width-420px">Pushing the the boundaries of the blogosphere.</p></div><div className="footer-social-link-wrapper invert"><a className="footer-social-link w-inline-block" href="https://facebook.com/" target="_blank"><img alt="facebook icon black" className="footer-social-link-image" loading="lazy" src="/images/661e50fb8e75327e6f39ac48_facebook-black.webp"/></a><a className="footer-social-link w-inline-block" href="https://www.instagram.com/" target="_blank"><img alt="Instagram Icon Image Black" className="footer-social-link-image" loading="lazy" src="/images/661e50fb8e75327e6f39ac46_instagram-black.webp"/></a><a className="footer-social-link w-inline-block" href="https://www.twitter.com/" target="_blank"><img alt="social icon" className="footer-social-link-image" loading="lazy" sizes="(max-width: 767px) 16px, (max-width: 991px) 2vw, 16px" src="/images/6623989694d863895b33bdcb_twitter%20(1).png" srcSet="/images/6623989694d863895b33bdcb_twitter%20(1)-p-500.png 500w, /images/6623989694d863895b33bdcb_twitter%20(1).png 512w"/></a><a className="footer-social-link w-inline-block" href="https://www.youtube.com/" target="_blank"><img alt="YouTube White Icon Image Black" className="footer-social-link-image" loading="lazy" src="/images/661e50fb8e75327e6f39ac47_youtube-black.webp"/></a></div></div><div className="footer-grid-wrapper"><div className="footer-block"><div className="footer-title-text">Main</div><a className="footer-text" href="/">Home</a><a className="footer-text" href="/about-us">About</a><a className="footer-text" href="/authors">Authors <sup>CMS</sup></a><a className="footer-text" href="/authors_emily-davis">Author Single<sup>CMS</sup></a><a className="footer-text" href="/category_all">Shop <sup>E-commerce</sup></a><a className="footer-text" href="/product_cap">Shop Single <sup>E-commerce</sup></a><a className="footer-text" href="/contact">Contact</a></div><div className="footer-block"><div className="footer-title-text">More Pages</div><a className="footer-text" href="/blog">Blog <sup>CMS</sup></a><a className="footer-text" href="/blog_the-5g-technology">Blog Single<sup>CMS</sup></a><a className="footer-text" href="/categories">Categories <sup>CMS</sup></a><a className="footer-text" href="/blog-categories_technology">Categories Single<sup>CMS</sup></a><a className="footer-text" href="/privacy-policy">Privacy Policy</a><a className="footer-text" href="/terms-conditions">Terms &amp; Conditions</a></div><div className="footer-block"><div className="footer-title-text">Utilities</div><a className="footer-text" href="/utilities_style-guide">Style Guide</a><a className="footer-text" href="/utilities_licenses">Licenses</a><a className="footer-text" href="/utilities_changelog">Changelog</a><a className="footer-text" href="/utilities_instructions">Instructions</a><a className="footer-text" href="/404">404</a><a className="footer-text" href="/401">Password</a></div></div></div><div className="footer-divider" data-w-id="7511f9df-060d-cd6f-8f86-c153652fe2f5" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}></div><div className="footer-bottom" data-w-id="7511f9df-060d-cd6f-8f86-c153652fe2f6" style={{ opacity: '1', transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)', transformStyle: 'preserve-3d' }}><div className="footer-wrapper-half-small"><div className="footer-copyright">Â© NEXGEN Blog. All Rights Reserved.</div></div><div className="footer-wrapper-half-big self-align-right"><div className="footer-legal-text-wrapper"><div className="w-layout-hflex footer-flex-block"><p className="footer-legal-text">Built byÂ </p><a className="footer-legal-text-link" href="https://yves-portfolio.webflow.io/" target="_blank">Yves Adrales</a></div><div className="w-layout-hflex footer-flex-block"><p className="footer-legal-text">Powered byÂ </p><a className="footer-legal-text-link" href="https://webflow.com/" target="_blank">Webflow</a></div></div></div></div><div className="space smaller-on-mobile"></div></div></div></div></section>
    </div>
  );
}
