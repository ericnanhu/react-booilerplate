import Link from "next/link";
import client from "@/../tina/__generated__/client";

// export async function generateStaticParams() {
//   const pageSize = 2;

//   const communityResponse = await client.queries.communityConnection({
//     sort: "publishedAt",
//   });

//   const articles = communityResponse.data.communityConnection.edges;

//   const paginatedArticles = articles
//     ? articles.reduce((acc, _, index) => {
//         if (index % pageSize === 0) {
//           acc.push(articles.slice(index, index + pageSize));
//         }
//         return acc;
//       }, [])
//     : [];

//   return paginatedArticles;
// }

export default async function CommunityHomePage({
  params,
}: {
  params: {
    page: string;
  };
}) {
  const pageSize = 12;
  const totalPages = Math.ceil(
    (await client.queries.communityConnection()).data.communityConnection
      .totalCount / pageSize
  );

  // console.log(totalPages);

  let communityResponse = await client.queries.communityConnection({
    sort: "publishedAt",
    first: pageSize,
  });

  let pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push(communityResponse.data.communityConnection);
    communityResponse = await client.queries.communityConnection({
      sort: "publishedAt",
      first: pageSize,
      after: communityResponse.data.communityConnection.pageInfo.endCursor,
    });
  }

  // pages.push(communityResponse.data.communityConnection);

  console.log(pages);

  const paginatedArticles = pages[Number(params.page) - 1]?.edges?.map(
    (article) => {
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

  // console.log(paginatedArticles);
  const pageInfo = pages[Number(params.page) - 1]?.pageInfo;
  console.log(params.page);
  console.log(pageInfo);

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {paginatedArticles?.map((article, index) => (
          <Link key={index} href={`/community/${article.slug}`}>
            <div className="flex flex-col gap-2 rounded p-4 w-96 border-2 border-primary shadow-md hover:shadow-xl">
              <h2 className="text-2xl font-semibold">{article.title}</h2>
              <p>{article.description}</p>
              <p className="font-semibold text-primary">
                By {article.author?.name}
              </p>
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
