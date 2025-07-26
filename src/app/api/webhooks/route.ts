// app/api/clerk/webhook/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    console.log(`Received webhook with ID ${evt.data.id} and event type of ${eventType}`);

    if (eventType === "user.created") {
      // Type guard to ensure we have user data
      if ('email_addresses' in evt.data && 'first_name' in evt.data) {
        const { id, email_addresses, first_name } = evt.data;
        const email = email_addresses?.[0]?.email_address;

        if (!email) {
          console.warn("Missing email in user.created webhook");
          return new Response("Missing email", { status: 400 });
        }

        // Insert user into Supabase via Prisma
        await prisma.user.create({
          data: {
            userId: id,
            email: email,
            name: first_name || null,
          },
        });

        console.log(`Created user ${id} in Prisma`);
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
