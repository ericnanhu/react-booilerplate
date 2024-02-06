import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import CourseCard from "@/components/courseCard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${process.env.APP_URL}/api/course/getAll`, {
    method: "GET",
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
      height: "",
    },
    {
      response: htmlCss,
      name: "HTML & CSS",
      chapter: "2",
      height: "sm:h-[26rem]",
    },
    {
      response: javascript,
      name: "JavaScript",
      chapter: "3",
      height: "",
    },
    {
      response: vuejs,
      name: "Vue.js & Nuxt.js",
      chapter: "4",
      height: "",
    },
    {
      response: reactjs,
      name: "React.js & Next.js",
      chapter: "5",
      height: "",
    },
    {
      response: database,
      name: "Database",
      chapter: "6",
      height: "",
    },
    {
      response: miscellaneous,
      name: "Miscellaneous Skills",
      chapter: "7",
      height: "",
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
            height={course.height}
          />
        ))}
      </div>
    </div>
  );
}
