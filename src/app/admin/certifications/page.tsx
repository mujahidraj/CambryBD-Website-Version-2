import { getCertifications } from "@/actions/certifications";
import CertificationsClient from "./CertificationsClient";
export default async function Page() {
    let data: any[] = [];
    try { data = await getCertifications(); } catch { }
    return <CertificationsClient certifications={data} />;
}
