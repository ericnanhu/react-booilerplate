import Stripe from "stripe";
import prisma from "@/lib/db";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const webhookHandler = async (request: Request) => {
  try {
    const rawBody = await request.text();
    const signature = headers().get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
      console.log("Event created");
    } catch (error: any) {
      console.log(`❌ Error message: ${error}`);

      return new Response("Webhook error", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    switch (event.type) {
      case "customer.subscription.created": {
        const subscription = event.data.object as Stripe.Subscription;
        await prisma.user.update({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
          data: {
            isActive: true,
          },
        });
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new Response("Stripe success", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error: any) {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
};

export { webhookHandler as POST };
