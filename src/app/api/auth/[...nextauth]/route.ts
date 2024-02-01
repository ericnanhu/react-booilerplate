import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db";
import EmailProvider from "next-auth/providers/email";
import Stripe from "stripe";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

      await stripe.customers
        .create({
          email: user.email!,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId: customer.id,
            },
          });
        });
    },
  },
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email as string,
          },
          select: {
            id: true,
            email: true,
            isActive: true,
            stripeCustomerId: true,
          },
        });

        if (user) {
          session.user = {
            id: user.id,
            email: user.email,
            isActive: user.isActive,
            stripeCustomerId: user.stripeCustomerId,
          };
        }
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
