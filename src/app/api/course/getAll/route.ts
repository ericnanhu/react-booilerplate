import { NextRequest, NextResponse } from "next/server";
import client from "@/../tina/__generated__/client";

const handler = async (request: NextRequest) => {
  try {
    const [
      introduction,
      htmlCss,
      javascript,
      vuejs,
      reactjs,
      database,
      miscellaneous,
    ] = await Promise.all([
      client.queries.courseConnection({
        filter: { chapter: { eq: "introduction" } },
        sort: "lesson",
      }),
      client.queries.courseConnection({
        filter: { chapter: { eq: "htmlCss" } },
        sort: "lesson",
      }),
      client.queries.courseConnection({
        filter: { chapter: { eq: "javascript" } },
        sort: "lesson",
      }),
      client.queries.courseConnection({
        filter: { chapter: { eq: "vuejs" } },
        sort: "lesson",
      }),
      client.queries.courseConnection({
        filter: { chapter: { eq: "reactjs" } },
        sort: "lesson",
      }),
      client.queries.courseConnection({
        filter: { chapter: { eq: "database" } },
        sort: "lesson",
      }),
      client.queries.courseConnection({
        filter: { chapter: { eq: "miscellaneous" } },
        sort: "lesson",
      }),
    ]);

    return NextResponse.json(
      {
        introduction,
        htmlCss,
        javascript,
        vuejs,
        reactjs,
        database,
        miscellaneous,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch lesson");
  }
};

export { handler as GET };
