import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { nowMs } from "@/lib/time";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const key = `paste:${id}`;

  const paste = await redis.get<any>(key);

  if (!paste) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // TTL check (TEST_MODE compatible)
  if (
    paste.ttl_seconds !== null &&
    nowMs(req) > paste.created_at + paste.ttl_seconds * 1000
  ) {
    await redis.del(key);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // View limit check
  if (paste.max_views !== null && paste.views >= paste.max_views) {
    await redis.del(key);
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  paste.views += 1;
  await redis.set(key, paste);

  return NextResponse.json({
    content: paste.content,
    remaining_views:
      paste.max_views === null
        ? null
        : Math.max(0, paste.max_views - paste.views),
    expires_at:
      paste.ttl_seconds !== null
        ? new Date(
            paste.created_at + paste.ttl_seconds * 1000
          ).toISOString()
        : null,
  });
}
