import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  const body = await req.json();

  const { clerk_user_id, username, email, imageUrl } = body;

  try {
    await sql`
        INSERT INTO users (clerk_user_id, username, email, image_url)
        VALUES (${clerk_user_id}, ${username}, ${email}, ${imageUrl})
        ON CONFLICT (clerk_user_id) DO UPDATE SET
          username = EXCLUDED.username,
          email = EXCLUDED.email,
          image_url = EXCLUDED.image_url,
          updated_at = NOW();
      `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("DBエラー", error);
    return new Response(JSON.stringify({ error: "DBエラー" }), { status: 500 });
  }
}
