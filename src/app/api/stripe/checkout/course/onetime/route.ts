import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const checkoutHandler = async (req: NextRequest, res: NextResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email as string,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: user?.stripeCustomerId as string,
    line_items: [
      {
        price: process.env.PRICE_KEY_ONETIME,
        quantity: 1,
      },
    ],
    // {CHECKOUT_SESSION_ID} is a string literal which the Stripe SDK will replace; do not manually change it or replace it with a variable!
    success_url: `${process.env.APP_URL}/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.APP_URL}/?cancelledPayment=true`,
    payment_intent_data: {
      metadata: {
        payingUserId: user?.id as string,
      },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      {
        code: "stripe-error",
        error: "Could not create checkout session",
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { redirectUrl: checkoutSession.url },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
};

export { checkoutHandler as GET, checkoutHandler as POST };
