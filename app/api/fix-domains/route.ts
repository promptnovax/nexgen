import { NextRequest, NextResponse } from 'next/server';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";

export async function GET(req: NextRequest) {
    try {
        const payload = await getPayload({ config: configPromise, importMap });

        // Fix Site 1
        const s1 = await payload.update({
            collection: 'sites',
            id: 1,
            data: { domain: 'localhost' } as any,
            overrideAccess: true,
        });

        // Fix Site 3
        const s3 = await payload.update({
            collection: 'sites',
            id: 3,
            data: { domain: 'site3.localhost' } as any,
            overrideAccess: true,
        });

        return NextResponse.json({
            message: "Sites fixed",
            site1: { id: s1.id, domain: s1.domain },
            site3: { id: s3.id, domain: s3.domain }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
