import { getScholarships } from "@/actions/scholarships";
import { getAllUniversities } from "@/actions/universities";
import ScholarshipsClient from "./ScholarshipsClient";
export default async function Page() {
    let data: any[] = [];
    let universities: any[] = [];
    try { data = await getScholarships(); } catch { }
    try { universities = await getAllUniversities(); } catch { }
    return <ScholarshipsClient scholarships={data} universities={universities} />;
}
