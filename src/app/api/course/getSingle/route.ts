import { NextRequest, NextResponse } from "next/server";
import client from "@/../tina/__generated__/client";

const handler = async (request: NextRequest) => {
  try {
    const data = await request.json();

    const lesson = await client.queries.course({
      relativePath: `${data.slug}.md`,
    });

    return NextResponse.json(
      {
        lesson,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching lesson:", error);
    throw new Error("Failed to fetch lesson");
  }
};

export { handler as POST };
