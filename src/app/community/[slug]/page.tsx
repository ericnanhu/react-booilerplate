import client from "@/../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import CodeBlock from "@/components/ui/codeBlock";
import Image from "next/image";

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
  const communityResponse = await client.queries.communityConnection();
  const articles = communityResponse.data.communityConnection.edges;

  const slugs = articles?.map((article) => {
    return {
      slug: article?.node?.id?.split("/")?.pop()?.split(".")[0] ?? "",
    };
  });

  return slugs as any[];
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const response = await fetch(
    `${process.env.APP_URL}/api/community/getSingle`,
    {
      method: "POST",
      next: { revalidate: Number(process.env.REVALIDATE) },
      body: `{"slug": "${params.slug}"}`,
    }
  );

  const { article } = await response.json();

  const components: Components<Record<string, ComponentProps>> = {
    code_block: (props: CodeBlockProps) => (
      <CodeBlock language={props.lang}>{props.value}</CodeBlock>
    ),
    img: (props: ImageProps) => (
      <Image src={props.url} width={800} height={500} alt={props.alt} />
    ),
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="content col-span-12 md:col-span-9">
        <Image
          src={article.data.community.coverImage}
          width={1000}
          height={500}
          alt={article.data.community.title}
          priority
        />
        <h1>{article.data.community.title}</h1>

        <TinaMarkdown
          content={article.data.community.body}
          components={components}
        />
      </div>
      <aside className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-3 flex flex-col space-y-8 mt-5">
        <div>
          <div className="font-bold text-xl mb-2">
            📝 Recent Community Articles
          </div>
          <ul className="flex flex-col space-y-2"></ul>
        </div>

        <div>
          <div className="font-bold text-xl mb-2">
            📧 Let&apos;s Get in Touch!
          </div>
        </div>
      </aside>
    </div>
  );
}
