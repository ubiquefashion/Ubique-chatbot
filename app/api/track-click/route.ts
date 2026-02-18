import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

// Initialize Redis (requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local)
const redis = Redis.fromEnv();

// POST — increment a click count
export async function POST(req: NextRequest) {
    try {
        const { platform } = (await req.json()) as { platform: string };

        if (platform !== "app_store" && platform !== "play_store") {
            return NextResponse.json(
                { error: "Invalid platform. Use 'app_store' or 'play_store'." },
                { status: 400 }
            );
        }

        // Increment counter in Redis
        const newCount = await redis.incr(`clicks:${platform}`);

        console.log(`🔔 ${platform} click recorded — total: ${newCount}`);

        return NextResponse.json({
            success: true,
            platform,
            count: newCount,
        });
    } catch (err) {
        console.error("Track click error:", err);
        return NextResponse.json(
            { error: "Failed to record click. Check your Redis keys." },
            { status: 500 }
        );
    }
}

// GET — view current counts
export async function GET() {
    try {
        const [appStore, playStore] = await Promise.all([
            redis.get<number>("clicks:app_store"),
            redis.get<number>("clicks:play_store"),
        ]);

        return NextResponse.json({
            app_store: appStore ?? 0,
            play_store: playStore ?? 0,
        });
    } catch (err) {
        console.error("Get click counts error:", err);
        return NextResponse.json(
            { error: "Failed to read click counts." },
            { status: 500 }
        );
    }
}
