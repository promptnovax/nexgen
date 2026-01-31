import { NextRequest, NextResponse } from 'next/server';
import { getTenant } from "@/lib/tenant";

export async function GET(req: NextRequest) {
    try {
        const site = await getTenant();
        const host = req.headers.get('host');
        return NextResponse.json({
            detectedSite: site ? {
                id: (site as any).id,
                name: (site as any).name,
                domain: (site as any).domain
            } : null,
            requestHost: host,
            normalizedHost: host?.toLowerCase().split(':')[0]
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
