import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import CourseCard from "@/components/courseCard";
import Button from "@/components/ui/button";
import PricingCard from "@/components/pricingCard";
import CodeBlock from "@/components/ui/codeBlock";
import Notification from "@/components/ui/notification";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // const response = await fetch(`${process.env.APP_URL}/api/course/getAll`, {
  //   method: "GET",
  // });

  // const {
  //   introduction,
  //   htmlCss,
  //   javascript,
  //   vuejs,
  //   reactjs,
  //   database,
  //   miscellaneous,
  // } = await response.json();

  // const courses = [
  //   {
  //     response: introduction,
  //     name: "Introduction",
  //     chapter: "1",
  //     height: "",
  //   },
  //   {
  //     response: htmlCss,
  //     name: "HTML & CSS",
  //     chapter: "2",
  //     height: "sm:h-[26rem]",
  //   },
  //   {
  //     response: javascript,
  //     name: "JavaScript",
  //     chapter: "3",
  //     height: "",
  //   },
  //   {
  //     response: vuejs,
  //     name: "Vue.js & Nuxt.js",
  //     chapter: "4",
  //     height: "",
  //   },
  //   {
  //     response: reactjs,
  //     name: "React.js & Next.js",
  //     chapter: "5",
  //     height: "",
  //   },
  //   {
  //     response: database,
  //     name: "Database",
  //     chapter: "6",
  //     height: "",
  //   },
  //   {
  //     response: miscellaneous,
  //     name: "Miscellaneous Skills",
  //     chapter: "7",
  //     height: "",
  //   },
  // ];

  return (
    <div className="flex flex-col gap-8">
      <div className="h-screen grid">
        <p className="text-center text-9xl place-self-center">
          The React Boilerplate
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="border-b-4 border-primary text-2xl">Buttons</div>
        <div className="flex flex-row flex-wrap gap-4">
          <Button color="primary" loading={false}>
            Click me!
          </Button>
          <Button color="primary" loading={true}>
            Click me!
          </Button>
          <Button color="primary-bordered" loading={false}>
            Click me!
          </Button>
          <Button color="primary-bordered" loading={true}>
            Click me!
          </Button>
          <Button color="danger" loading={false}>
            Click me!
          </Button>
          <Button color="danger" loading={true}>
            Click me!
          </Button>
          <Button color="danger-bordered" loading={false}>
            Click me!
          </Button>
          <Button color="danger-bordered" loading={true}>
            Click me!
          </Button>
        </div>
        <div className="border-b-4 border-primary text-2xl">Pricing</div>
        <div className="flex flex-row flex-wrap gap-4">
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
        <div className="border-b-4 border-primary text-2xl">Notification</div>
        <div className="flex flex-row flex-wrap gap-4">
          <Notification
            type="success"
            message="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, facere
        rerum deserunt minima tempora dicta enim ipsum soluta laudantium at
        quibusdam repellat explicabo dolorum quod animi numquam quidem, ad
        tenetur!"
          />
        </div>
      </div>
    </div>
  );
}
