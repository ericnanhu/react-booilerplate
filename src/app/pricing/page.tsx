import PricingCard from "@/components/pricingCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Pricing() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="min-h-screen flex flex-col gap-10 justify-center">
        <h1 className="text-center font-bold text-3xl">
          Please choose a plan ⬇️
        </h1>
        <div className="flex flex-row flex-wrap gap-8 mx-auto justify-center">
          <PricingCard
            name="Subscription"
            description="If you want to try out the course without long-term commitment."
            price="$25/month"
            term="monthly"
            features={["Access to all course materials."]}
            plan="monthly"
            session={session}
          />

          <PricingCard
            name="One-time Payment"
            description="If you want to try out the course without long-term commitment"
            price="$450"
            term="once"
            features={[
              "Access to all course materials.",
              "Life long updates.",
              "Get one boilerplate for free.",
              "Get the PDF version of the course",
            ]}
            plan="onetime"
            session={session}
          />
        </div>
      </div>
    </>
  );
}
