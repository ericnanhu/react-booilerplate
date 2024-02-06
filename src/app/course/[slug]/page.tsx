import client from "@/../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import CodeBlock from "@/components/ui/codeBlock";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

type CodeBlockProps = {
  lang: string;
  value: React.ReactNode;
};

type ImageProps = {
  url: string;
  alt: string;
};

type ComponentProps = CodeBlockProps & ImageProps;

type Components<ComponentAndProps extends object> = {
  [K in keyof ComponentAndProps]: (props: ComponentAndProps[K]) => JSX.Element;
};

export async function generateStaticParams() {
  const courseResponse = await client.queries.courseConnection();
  const lessons = courseResponse.data.courseConnection.edges;

  const slugs = lessons?.map((lesson) => {
    return {
      slug: lesson?.node?.id?.split("/")?.pop()?.split(".")[0] ?? "",
    };
  });

  return slugs as any[];
}

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.APP_URL}/api/course/getSingle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug: params.slug }),
  });

  const { lesson } = await response.json();

  const components: Components<Record<string, ComponentProps>> = {
    code_block: (props: CodeBlockProps) => (
      <CodeBlock language={props.lang}>{props.value}</CodeBlock>
    ),
    img: (props: ImageProps) => (
      <Image src={props.url} width={800} height={500} alt={props.alt} />
    ),
  };

  const content = (
    <div className="grid grid-cols-12 gap-4">
      <div className="content col-span-12 md:col-span-9">
        <h1>{lesson.data.course.title}</h1>

        <TinaMarkdown
          content={lesson.data.course.body}
          components={components}
        />
      </div>
      <aside className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-3 flex flex-col space-y-8 mt-5">
        <div>
          <div className="font-bold text-xl mb-2">📚 Course Outline</div>
          <ul className="flex flex-col space-y-2"></ul>
        </div>

        <div>
          <div className="font-bold text-xl mb-2">
            📝 Recent Community Articles
          </div>
          <ul className="flex flex-col space-y-2"></ul>
        </div>

        <div>
          <div className="font-bold text-xl mb-2">
            📧 Subscribe to Our Newsletter
          </div>
        </div>
      </aside>
    </div>
  );

  if (lesson.data.course.isFree === false) {
    if (session) {
      if (session.user?.isActive === true) {
        return content;
      } else {
        return (
          <div className="grid grid-cols-12 gap-4">
            <div className="content col-span-12 md:col-span-9">
              <h1>{lesson.data.course.title}</h1>

              <p>
                You need to <Link href={"/pricing"}>purchase a paid plan</Link>{" "}
                to access this content.
              </p>
            </div>
            <aside className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-3 flex flex-col space-y-8 mt-5">
              <div>
                <div className="font-bold text-xl mb-2">📚 Course Outline</div>
                <ul className="flex flex-col space-y-2"></ul>
              </div>

              <div>
                <div className="font-bold text-xl mb-2">
                  📝 Recent Community Articles
                </div>
                <ul className="flex flex-col space-y-2"></ul>
              </div>

              <div>
                <div className="font-bold text-xl mb-2">
                  📧 Subscribe to Our Newsletter
                </div>
              </div>
            </aside>
          </div>
        );
      }
    } else {
      return (
        <div className="grid grid-cols-12 gap-4">
          <div className="content col-span-12 md:col-span-9">
            <h1>{lesson.data.course.title}</h1>

            <p>
              You need to <Link href={"/signin"}>sign in</Link> to access this
              content.
            </p>
          </div>
          <aside className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-3 flex flex-col space-y-8 mt-5">
            <div>
              <div className="font-bold text-xl mb-2">📚 Course Outline</div>
              <ul className="flex flex-col space-y-2"></ul>
            </div>

            <div>
              <div className="font-bold text-xl mb-2">
                📝 Recent Community Articles
              </div>
              <ul className="flex flex-col space-y-2"></ul>
            </div>

            <div>
              <div className="font-bold text-xl mb-2">
                📧 Subscribe to Our Newsletter
              </div>
            </div>
          </aside>
        </div>
      );
    }
  } else {
    return content;
  }
}
