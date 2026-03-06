import { getLeads } from "@/actions/leads";
import LeadsClient from "./LeadsClient";

export default async function LeadsPage() {
    const leads = await getLeads();
    return <LeadsClient leads={JSON.parse(JSON.stringify(leads))} />;
}
