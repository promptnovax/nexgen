'use client';
import React, { useEffect } from 'react';

export default function 401Content() {
  useEffect(() => {
    // Re-initialize Webflow scripts if needed
    if (window.Webflow && window.Webflow.destroy) {
        window.Webflow.destroy();
        window.Webflow.ready();
    }
  }, []);

  return (
    <div className="webflow-page-wrapper">
      {/* Generated from https://nexgen-blog.webflow.io/401 */}
      <div className="utility-page-wrap"><div className="utility-page-content w-password-page w-form"><form action="/.wf_auth" aria-label="Email Form" className="utility-page-form w-password-page" data-name="Email Form" data-wf-element-id="64dbc39cca66b00cd2ac67e800000000000c" data-wf-page-id="661e50fb8e75327e6f39ac5d" id="email-form" method="post" name="email-form"><img alt="" className="invert" src="/images/66237e74bddd1c67705bb73d_hide.png"/><h3>Protected Page</h3><label className="w-password-page" htmlFor="pass">Password</label><input autoFocus="true" className="w-password-page w-input" data-name="field" id="pass" maxLength="256" name="pass" placeholder="Enter your password" type="password"/><input className="button w-password-page w-button" data-wait="Please wait..." type="submit" value="Submit"/><div className="w-password-page w-form-fail"><div>Incorrect password. Please try again.</div></div><div className="w-password-page w-embed w-script" style={{ display: 'none' }}><input name="path" type="hidden" value="&lt;%WF_FORM_VALUE_PATH%&gt;"/><input name="page" type="hidden" value="&lt;%WF_FORM_VALUE_PAGE%&gt;"/></div><div className="w-password-page w-embed w-script" style={{ display: 'none' }}></div></form></div></div>
    </div>
  );
}
