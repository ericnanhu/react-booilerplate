"use client";

import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button";

type NavBarProps = {
  session: Session | null;
};

export default function NavBar({ session }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.closest("#popupMenu") && !target.closest("#toggleBtn")) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="flex flex-row justify-between items-center shadow-md px-5 h-14">
        <div>
          <Link href="/" className="">
            TheDevSpace
          </Link>
        </div>
        <div className="hidden md:flex flex-row gap-14">
          <Link href="/" className="hover:text-primary transition duration-150">
            Start your journey
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
            <div>
              <Button
                color="primary"
                loading={false}
                className="hidden md:block"
                onClick={() => signIn()}>
                Sign In
              </Button>

              <button
                id="toggleBtn"
                className="focus:outline-none md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>

              <div
                id="popupMenu"
                className={`${
                  isMenuOpen ? "opacity-100" : "hidden opacity-0"
                } flex flex-col gap-4 absolute top-10 right-5 bg-light rounded shadow-md transition-all duration-150 p-5`}>
                <Link
                  href="/community/page/1"
                  className="md:hidden hover:text-primary transition duration-150">
                  Community
                </Link>

                <Link
                  href="/pricing"
                  className="md:hidden hover:text-primary transition duration-150">
                  Pricing
                </Link>

                <Link
                  href="/boilerplates"
                  className="md:hidden hover:text-primary transition duration-150">
                  Boilerplates
                </Link>

                <Button
                  color="primary"
                  loading={false}
                  className="mx-1"
                  onClick={() => signIn()}>
                  Sign In
                </Button>
              </div>
            </div>
          )}

          {session && (
            <div>
              <button
                id="toggleBtn"
                className="focus:outline-none "
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>

              <div
                id="popupMenu"
                className={`${
                  isMenuOpen ? "opacity-100" : "hidden opacity-0"
                } flex flex-col gap-2 absolute top-10 right-5 bg-light rounded shadow-md transition-all duration-150 p-5`}>
                <Button
                  color="danger-bordered"
                  loading={false}
                  className="w-full"
                  onClick={() => signOut()}>
                  Sign Out
                </Button>
                {session.user?.isActive && (
                  <Button color="danger" loading={false} className="w-full">
                    Cancel My Subscription
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
