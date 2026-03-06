import { getAnnouncements } from "@/actions/announcements";
import AnnouncementsClient from "./AnnouncementsClient";

export default async function Page() {
    let data: any[] = [];
    try { data = await getAnnouncements(); } catch { }
    return <AnnouncementsClient announcements={data} />;
}
