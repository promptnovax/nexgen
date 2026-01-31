'use client';
import React, { useEffect } from 'react';

export default function Content404() {
  useEffect(() => {
    // Re-initialize Webflow scripts if needed
    if ((window as any).Webflow && (window as any).Webflow.destroy) {
      (window as any).Webflow.destroy();
      (window as any).Webflow.ready();
    }
  }, []);

  return (
    <div className="webflow-page-wrapper">
      {/* Generated from https://nexgen-blog.webflow.io/404 */}
      <div className="utility-page-wrap"><div className="utility-page-content"><img alt="" className="_404-image invert" sizes="(max-width: 479px) 100vw, 260px" src="/images/66237e7477d74333f51760ec_chat.png" srcSet="/images/66237e7477d74333f51760ec_chat-p-500.png 500w, /images/66237e7477d74333f51760ec_chat.png 512w" /><h3>Page Not Found</h3><div>The page you are looking for doesn't exist or has been moved</div><div className="space-text"></div><a className="submit-button w-button" href="/">back to home</a></div></div>
    </div>
  );
}
