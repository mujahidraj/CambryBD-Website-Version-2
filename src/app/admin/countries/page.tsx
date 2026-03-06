import { getCountries } from "@/actions/countries";
import CountriesClient from "./CountriesClient";
export default async function Page() {
    let data: any[] = [];
    try { data = await getCountries(); } catch { }
    return <CountriesClient countries={data} />;
}
