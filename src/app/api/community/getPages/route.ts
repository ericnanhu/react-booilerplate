import { NextResponse } from "next/server";
import client from "@/../tina/__generated__/client";

const handler = async () => {
  try {
    const pageSize = 12;

    // Total number of pages
    const totalPages = Math.ceil(
      (await client.queries.communityConnection()).data.communityConnection
        .totalCount / pageSize
    );

    // Get the first page
    const initialQuery = await client.queries.communityConnection({
      sort: "publishedAt",
      first: pageSize,
    });

    let pages = [initialQuery.data.communityConnection];

    for (let i = 1; i < totalPages; i++) {
      const cursor = pages[i - 1].pageInfo.endCursor;
      const nextPage = await client.queries.communityConnection({
        sort: "publishedAt",
        first: pageSize,
        after: cursor,
      });
      pages.push(nextPage.data.communityConnection);
    }

    return NextResponse.json(
      {
        totalPages,
        pages,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching community articles:", error);
    throw new Error("Failed to fetch community data");
  }
};

export { handler as GET };
