import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Notification from "@/components/ui/notification";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen flex flex-col content">
      <p>
        This is a SaaS boilerplate created using Next.js. The boilerplate comes
        with:
      </p>

      <ul>
        <li>A user sign in/sign up system, created with Auth.js.</li>
        <li>A payment system, integrated with Stripe.</li>
        <li>Email system, integrated with SendGrid.</li>
        <li>A community blog system, based on Tina CMS.</li>
        <li>
          Several UI components, such as buttons, form inputs, cards,
          notifications, and more.
        </li>
      </ul>

      <p>More features and UI components coming soon.</p>

      <h2>Buttons</h2>

      <div className="flex flex-row gap-2">
        <Button color="primary" loading={true}>
          Button
        </Button>
        <Button color="primary-bordered" loading={true}>
          Button
        </Button>
        <Button color="danger" loading={true}>
          Button
        </Button>
        <Button color="danger-bordered" loading={true}>
          Button
        </Button>
        <Button color="primary" loading={false}>
          Button
        </Button>
        <Button color="primary-bordered" loading={false}>
          Button
        </Button>
        <Button color="danger" loading={false}>
          Button
        </Button>
        <Button color="danger-bordered" loading={false}>
          Button
        </Button>
      </div>
      <div>
        <Notification type="success" message="lorem ipsum" />
      </div>
    </div>
  );
}
