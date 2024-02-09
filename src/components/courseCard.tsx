import type { Session } from "next-auth";
import Link from "next/link";

type CourseCardProps = {
  response: any;
  name: string;
  chapter: string;
  session: Session | null;
  height: string;
};

export default function CourseCard({
  response,
  name,
  chapter,
  session,
  height,
}: CourseCardProps) {
  const lessons = response?.data?.courseConnection?.edges?.map(
    (lesson: any) => {
      return {
        slug: lesson?.node?.id?.split("/")?.pop()?.split(".")[0] ?? "",
        title: lesson?.node?.title ?? "",
        isFree: lesson?.node?.isFree ?? false,
      };
    }
  );
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold text-primary">{name}</h2>
      <ul className={`sm:flex flex-col flex-wrap gap-1 ${height}`}>
        {lessons?.map((lesson: any, index: number) => (
          <li key={index}>
            {lesson.isFree === true ? (
              <Link href={`/course/${lesson.slug}`}>
                <span className="mr-2 text-xl font-semibold">
                  {chapter}.{index + 1}
                </span>{" "}
                <span className="hover:text-primary transition duration-150">
                  {lesson.title}
                </span>
              </Link>
            ) : session?.user?.isActive === true ? (
              <Link href={`/course/${lesson.slug}`}>
                <span className="mr-2 text-xl font-semibold">
                  {chapter}.{index + 1}
                </span>{" "}
                <span className="hover:text-primary transition duration-150">
                  {lesson.title}
                </span>
              </Link>
            ) : (
              <Link href="/pricing" className="disabled">
                <span className="mr-2 text-xl font-semibold">
                  {chapter}.{index + 1}
                </span>{" "}
                <span className="hover:text-primary transition duration-150">
                  {lesson.title}
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 inline align-middle mx-1">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
