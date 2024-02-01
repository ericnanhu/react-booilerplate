import client from "@/../tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import CodeBlock from "@/components/ui/codeBlock";

type CodeBlockProps = {
  lang: string;
  value: React.ReactNode;
};

export default async function RemoteMdxPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const article = await client.queries.community({
      relativePath: `${params.slug}.md`,
    });

    const components = {
      // h2: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
      code_block: ({ lang, value }: CodeBlockProps) => (
        <CodeBlock language={lang}>{value}</CodeBlock>
      ),
    };

    return (
      <div className="grid grid-cols-12 gap-4">
        <div className="content col-span-12 md:col-span-9">
          <h1>{article.data.community.title}</h1>
          {/* <MDXRemote source={article.data} options={options} /> */}
          <TinaMarkdown
            content={article.data.community.body}
            components={components}
          />
        </div>
        <aside className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-3 flex flex-col space-y-8 mt-5">
          <div>
            <div className="font-bold text-xl mb-2">📝 Recent Posts</div>
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
  } catch (err) {
    console.error(err);
  }
}
