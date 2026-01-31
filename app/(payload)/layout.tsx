/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from "@payload-config";
import "@payloadcms/next/css";
import { RootLayout } from "@payloadcms/next/layouts";
// import React from "react";

import { importMap } from "./admin/importMap";
import { serverFunction } from "./admin/serverFunction";

const Layout = ({ children }: { children: React.ReactNode }) => (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
        {children}
    </RootLayout>
);

export default Layout;
