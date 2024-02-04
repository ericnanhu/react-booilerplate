import type { Session } from "next-auth";
import Link from "next/link";

type CourseCardProps = {
  response: any;
  name: string;
  chapter: string;
  session: Session | null;
  className: string;
};

export default function CourseCard({
  response,
  name,
  chapter,
  session,
  className,
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
    <div className="border-2 border-primary rounded-md p-4 flex flex-col gap-4">
      <h2 className="text-3xl font-semibold">{name}</h2>
      <ul className={`md:grid grid-flow-col auto-cols-fr ${className}`}>
        {lessons?.map((lesson: any, index: number) => (
          <li key={index} className="mb-2">
            {lesson.isFree === true ? (
              <Link href={`/course/${lesson.slug}`}>
                <span>
                  {chapter}.{index + 1}
                </span>{" "}
                <span className="hover:text-primary transition duration-150">
                  {lesson.title}
                </span>
              </Link>
            ) : session?.user?.isActive === true ? (
              <Link href={`/course/${lesson.slug}`}>
                <span>
                  {chapter}.{index + 1}
                </span>{" "}
                <span className="hover:text-primary transition duration-150">
                  {lesson.title}
                </span>
              </Link>
            ) : (
              <Link href="/pricing" className="disabled">
                <span>
                  {chapter}.{index + 1}
                </span>{" "}
                <span className="hover:text-primary transition duration-150">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 inline mx-1">
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  {lesson.title}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
