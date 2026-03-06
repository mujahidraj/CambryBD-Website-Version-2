import { getCourses } from "@/actions/courses";
import { getAllUniversities } from "@/actions/universities";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
    const [courses, universities] = await Promise.all([
        getCourses(),
        getAllUniversities(),
    ]);
    return (
        <CoursesClient
            courses={JSON.parse(JSON.stringify(courses))}
            universities={JSON.parse(JSON.stringify(universities))}
        />
    );
}
