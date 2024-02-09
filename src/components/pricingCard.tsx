"use client";

import Button from "@/components/ui/button";
import type { Session } from "next-auth";
import { useState } from "react";
import { signIn } from "next-auth/react";

type PricingCardProps = {
  name: string;
  description: string;
  price: string;
  term: string;
  features: string[];
  plan: "monthly" | "biannually" | "annually" | "onetime";
  session: Session | null;
};

export default function PricingCard({
  name,
  description,
  price,
  term,
  features,
  plan,
  session,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);

    if (plan === "onetime") {
      // For onetime purchase
      try {
        const response = await fetch(`/api/stripe/checkout/course/onetime`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        setLoading(false);

        if (response.ok) {
          const url = await response.json();
          window.open(url.redirectUrl, "_target");
        } else {
          console.error("Error:", response.statusText);
        }

        const status = response.status;

        if (status === 401) {
          window.open("/signin", "_target");
        }

        console.log("Status Code:", status);
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    } else {
      // For subscriptions
      const res = await fetch(`/api/stripe/checkout/course/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: plan,
        }),
      });
      const url = await res.json();

      setLoading(false);

      window.open(url.redirectUrl, "_target");
    }
  };

  return (
    <div className="flex flex-col gap-5 border-2 border-primary rounded-md shadow-md p-5 h-fit">
      <h2 className="text-2xl">{name}</h2>

      <p className="text-sm">{description}</p>

      <p>
        <span className="text-3xl">{price}</span>
        <span className="text-sm">, billed {term}.</span>
      </p>

      <ul className="text-sm font-thin list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {session ? (
        <Button
          color="primary"
          loading={loading}
          className="w-full "
          onClick={() => checkout()}>
          Get this plan
        </Button>
      ) : (
        <Button
          color="primary"
          loading={false}
          className="w-full "
          onClick={() => signIn()}>
          Create an account
        </Button>
      )}
    </div>
  );
}
