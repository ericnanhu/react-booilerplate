import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Setting from "@/components/setting";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-5 max-w-96">
        <h2 className="text-2xl font-bold">Manage your account</h2>
        <Setting session={session} />
      </div>
    </div>
  );
}
