"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import React from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  async function signInUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = formData.email;

    setLoading(true);

    try {
      await signIn("email", { email, callbackUrl: "/" });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 max-w-96">
        <h2 className="text-2xl font-bold">Sign In / Sign Up</h2>
        <p>
          You should receive a magic link within 5 minutes. If you don't have an
          account yet, we will automatically create one for you.
        </p>
        <form onSubmit={signInUser} className="flex flex-col gap-2">
          <label htmlFor="email" className="mx-1 hidden">
            We need to collect your email:
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Button color="primary" type="submit" loading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
