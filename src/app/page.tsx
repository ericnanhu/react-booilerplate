import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import client from "@/../tina/__generated__/client";
import CourseCard from "@/components/courseCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.APP_URL}/api/course/getAll`, {
    method: "GET",
    next: { revalidate: Number(process.env.REVALIDATE) },
  });

  const {
    introduction,
    htmlCss,
    javascript,
    vuejs,
    reactjs,
    database,
    miscellaneous,
  } = await response.json();

  const courses = [
    {
      response: introduction,
      name: "Introduction",
      chapter: "1",
      className: "grid-rows-2",
    },
    {
      response: htmlCss,
      name: "HTML & CSS",
      chapter: "2",
      className: "grid-rows-2",
    },
    {
      response: javascript,
      name: "JavaScript",
      chapter: "3",
      className: "grid-rows-2",
    },
    {
      response: vuejs,
      name: "Vue.js",
      chapter: "4",
      className: "grid-rows-2",
    },
    {
      response: reactjs,
      name: "React.js",
      chapter: "5",
      className: "grid-rows-2",
    },
    {
      response: database,
      name: "Database",
      chapter: "6",
      className: "grid-rows-2",
    },
    {
      response: miscellaneous,
      name: "Miscellaneous",
      chapter: "7",
      className: "grid-rows-2",
    },
  ];

  return (
    <div className="grid grid-cols-12">
      <div className="hidden md:flex col-span-4">Sidebar</div>
      <div className="col-span-12 md:col-span-8 flex flex-col gap-4">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            response={course.response}
            name={course.name}
            chapter={course.chapter}
            session={session}
            className={course.className}
          />
        ))}
      </div>
    </div>
  );
}
