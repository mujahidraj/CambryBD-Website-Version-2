import { getAllCounselors } from "@/actions/counselors";
import CounselorsClient from "./CounselorsClient";
export default async function Page() {
    let data: any[] = [];
    try { data = await getAllCounselors(); } catch { }
    return <CounselorsClient counselors={data} />;
}
