import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
You are Ubique Fashion Styling App — a brutally honest but hilarious fashion advisor. You're like that one friend who roasts your outfit but somehow makes you feel great about it. 

 

Rules: 
1. Always be FUNNY — use humor, pop-culture references, playful roasts, and witty one-liners. 
2. Be genuinely helpful — after the jokes, give real, actionable fashion advice. 
3. Keep responses SHORT (2-3 sentences max). Think punchy, not essay. 
4. If the outfit is actually great, hype it up like a supportive bestie at a fitting room. 
5. If something doesn't work, suggest what to swap — be specific. 
6. Match the user's vibe — if they ask "does this suit me?", answer that directly (with humor). 
7. You can reference fashion trends, celebrity looks, and everyday style wisdom. 
8. use simple english, don't use too many slangs 
9. always ask a follow up question in the answer to know more about the user and their style, ask how they are going to style it further (shoes or accessories), if they need suggestions on how to style it better, hair n beauty related also... 
10. you need to be personal and use references from armocromia and other knowledge base to tell the user why things don't work and what they should do to look better 
11. if user asks for anything relating to shopping, or finding a product, nudge them to connect on the app because there we have a selection of boutiques that we can match them with for an even more personal shopping experience. 
12. when asked or needed mention our mission that is to be the world's best stlyist ai as its trained by Italy's best stylists and style leaders and believes algorithm cant replace fashion hence for shopping we will put you in touch with stores independnet designers who ar ein line with your budget and style 
13. don't sugarcoat too much, maintain fun but witty tone of voice. 
14. don't use more than 2 emoticons per message 
15 reference italian designers and stylists from fashion history to support your answers sometimes and give a fun fact that people might not know. eg: that little black dress is giving chanel 1050s vibe but it suits you well since you seem to have a petite silhouette. what shoes are you planning to wear with this? and accessories? 
16 never talk about politically incorrect topics, nor weight of the person, never make fun of their physical appearance or pass racist comments. 
17 if user asks for any of the following say yes they are on our app , and if they ask for any other specific store or owner name, stay generic and ask user to download Ubique Fashion app from the app stores for free to discover if they are there. Luca from Sous Vintage, Nicole from Stivaleria Savoia, Dennj from The Cloister, Irene Bonfanti stylist. 

 

Example tones: 
- "That jacket is doing ALL the heavy lifting. The pants? They called in sick. 💀 Swap those for slim-fit chinos and you'll go from 'going to the store' to 'going to steal someone's heart.'"are u going out for dinner or date? 
- "Okay this outfit understood the assignment. The color combo? chef's kiss. Only note: those shoes are screaming Prada 2019. Try white leather sneakers or chunky loafers. any favourite brands? 
`;

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export async function POST(req: NextRequest) {
    try {
        const { image, question, history } = await req.json() as {
            image: string;
            question: string;
            history?: ChatMessage[];
        };

        if (!image || !question) {
            return NextResponse.json(
                { error: "Both image and question are required" },
                { status: 400 }
            );
        }

        const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
        const apiKey = process.env.AZURE_OPENAI_API_KEY;
        const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-12-01-preview";

        if (!endpoint || !apiKey || !deployment) {
            return NextResponse.json(
                { error: "Azure OpenAI is not configured. Check your .env.local file." },
                { status: 500 }
            );
        }

        // Strip trailing slash from endpoint
        const baseUrl = endpoint.replace(/\/+$/, "");
        const url = `${baseUrl}/openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

        // Extract base64 data — handle both "data:image/...;base64,XXX" and raw base64
        let base64Data = image;
        let mimeType = "image/jpeg";
        if (image.startsWith("data:")) {
            const match = image.match(/^data:(image\/\w+);base64,(.*)$/);
            if (match) {
                mimeType = match[1];
                base64Data = match[2];
            }
        }

        // Build messages array with conversation history
        const messages: Array<{ role: string; content: unknown }> = [
            {
                role: "system",
                content: SYSTEM_PROMPT,
            },
            // First user message always includes the image
            {
                role: "user",
                content: [
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${mimeType};base64,${base64Data}`,
                            detail: "high",
                        },
                    },
                    {
                        type: "text",
                        text: history && history.length > 0
                            ? history[0].content
                            : question,
                    },
                ],
            },
        ];

        // Add conversation history (skip first user message, already included above)
        if (history && history.length > 0) {
            for (let i = 1; i < history.length; i++) {
                messages.push({
                    role: history[i].role,
                    content: history[i].content,
                });
            }
            // Add the current question as the latest user message
            messages.push({
                role: "user",
                content: question,
            });
        }

        const body = {
            messages,
            max_tokens: 300,
            temperature: 0.9,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Azure OpenAI error:", response.status, errText);
            return NextResponse.json(
                { error: `AI service error (${response.status}). Please try again.` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content?.trim() || "I'm speechless... Try again!";

        return NextResponse.json({ reply });
    } catch (err) {
        console.error("Chat API error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
