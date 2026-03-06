import { getEnglishTests } from "@/actions/englishTests";
import { getAllUniversities } from "@/actions/universities";
import EnglishTestsClient from "./EnglishTestsClient";
export default async function Page() {
    let data: any[] = [];
    let universities: any[] = [];
    try { data = await getEnglishTests(); } catch { }
    try { universities = await getAllUniversities(); } catch { }
    return <EnglishTestsClient tests={data} universities={universities} />;
}
