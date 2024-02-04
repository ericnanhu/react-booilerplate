import { NextRequest, NextResponse } from "next/server";
import client from "@/../tina/__generated__/client";

const handler = async (request: NextRequest) => {
  try {
    const data = await request.json();

    const article = await client.queries.community({
      relativePath: `${data.slug}.md`,
    });

    return NextResponse.json(
      {
        article,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch community article");
  }
};

export { handler as POST };
