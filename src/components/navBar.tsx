"use client";

import { signIn } from "next-auth/react";
import type { Session } from "next-auth";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button";

type NavBarProps = {
  session: Session | null;
};

export default function NavBar({ session }: NavBarProps) {
  return (
    <nav className="flex flex-row justify-between items-center shadow-md px-5 h-14">
      <div>
        <Link href="/">TheDevSpace</Link>
      </div>
      <div className="hidden md:flex flex-row gap-14">
        <Link href="/" className="hover:text-primary transition duration-150">
          Courses
        </Link>

        <Link
          href="/community/page/1"
          className="hover:text-primary transition duration-150">
          Community
        </Link>

        <Link
          href="/pricing"
          className="hover:text-primary transition duration-150">
          Pricing
        </Link>

        <Link
          href="/boilerplates"
          className="hover:text-primary transition duration-150">
          Boilerplates
        </Link>
      </div>

      <div>
        {!session && (
          <Button
            color="primary"
            loading={false}
            className="hidden md:block"
            onClick={() => signIn()}>
            Sign In
          </Button>
        )}

        {session && (
          <Link
            href="/setting"
            className="border-2 border-primary bg-primary hover:border-primary-dark hover:bg-primary-dark focus:border-primary-darker focus:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2">
            Setting
          </Link>
        )}
      </div>
    </nav>
  );
}
