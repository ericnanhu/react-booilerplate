import Link from "next/link";
import client from "@/../tina/__generated__/client";
import Image from "next/image";

export async function generateStaticParams() {
  const pageSize = Number(process.env.PAGE_SIZE);
  const totalPages = Math.ceil(
    (await client.queries.communityConnection()).data.communityConnection
      .totalCount / pageSize
  );

  let pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push({
      page: (i + 1).toString(),
    });
  }

  return pages;
}

export default async function CommunityHomePage({
  params,
}: {
  params: {
    page: string;
  };
}) {
  const response = await fetch(
    `${process.env.APP_URL}/api/community/getPages`,
    {
      method: "GET",
      next: { revalidate: Number(process.env.REVALIDATE) },
    }
  );

  const { totalPages, pages } = await response.json();

  const paginatedArticles = pages[Number(params.page) - 1]?.edges?.map(
    (article: any) => {
      return {
        slug: article?.node?.id?.split("/")?.pop()?.split(".")[0] ?? "",
        title: article?.node?.title ?? "",
        description: article?.node?.description ?? "",
        coverImage: article?.node?.coverImage ?? "",
        author: article?.node?.author ?? null,
        publishedAt: article?.node?.publishedAt ?? "",
      };
    }
  );
  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {paginatedArticles?.map((article: any, index: any) => (
          <Link key={index} href={`/community/${article.slug}`}>
            <div className="flex flex-col gap-2 rounded-md p-4 w-96 border-2 border-primary shadow-md hover:shadow-xl">
              <Image
                src={article.coverImage}
                width={500}
                height={500}
                alt={article.title}
              />
              <h2 className="text-2xl font-semibold">{article.title}</h2>
              <p>{article.description}</p>
              <div className="flex flex-row justify-between">
                <p className="font-semibold text-primary">
                  By {article.author?.name}
                </p>
                <p className="text-gray-500">
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "long",
                  }).format(new Date(article.publishedAt))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="flex flex-row gap-4 justify-center mt-10 mb-5">
          {Number(params.page) > 1 ? (
            <Link
              href={`/community/page/${Number(params.page) - 1}`}
              className="border-2  border-primary bg-primary hover:border-primary-dark hover:bg-primary-dark focus:border-primary-darker focus:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2">
              Prev
            </Link>
          ) : null}
          {Number(params.page) < totalPages ? (
            <Link
              href={`/community/page/${Number(params.page) + 1}`}
              className="border-2  border-primary bg-primary hover:border-primary-dark hover:bg-primary-dark focus:border-primary-darker focus:bg-primary-darker focus:outline-none focus:ring focus:ring-primary-light transition-all duration-150 text-light text-sm font-semibold rounded-md px-4 py-2">
              Next
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}
