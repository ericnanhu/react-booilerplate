"use client";

import Button from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type SettingProps = {
  session: Session | null;
};

export default function Setting({ session }: SettingProps) {
  return (
    <>
      <p>
        <span className="font-semibold">Email: </span>
        <span>{session?.user?.email}</span>
      </p>
      <Button
        color="danger"
        loading={false}
        className="hidden md:block"
        onClick={() => signOut()}>
        Sign Out
      </Button>
      <Button
        color="danger-bordered"
        loading={false}
        className="hidden md:block">
        Cancel my subscription
      </Button>
    </>
  );
}
