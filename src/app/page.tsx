import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Notification from "@/components/ui/notification";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3"></div>
      <div className="col-span-9">
        Main content
        <div>
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
    </div>
  );
}
