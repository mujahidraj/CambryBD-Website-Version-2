import { getIELTSInfo } from "@/actions/ieltsInfo";
import IELTSBookingClient from "./IELTSBookingClient";
export default async function Page() {
    let data: any[] = [];
    try { data = await getIELTSInfo(); } catch { }
    return <IELTSBookingClient items={data} />;
}
