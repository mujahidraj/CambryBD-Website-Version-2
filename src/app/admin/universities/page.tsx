import { getAllUniversities } from "@/actions/universities";
import { getCountries } from "@/actions/countries";
import UniversitiesClient from "./UniversitiesClient";

export default async function UniversitiesPage() {
    const [universities, countries] = await Promise.all([
        getAllUniversities(),
        getCountries(),
    ]);
    return (
        <UniversitiesClient
            universities={JSON.parse(JSON.stringify(universities))}
            countries={JSON.parse(JSON.stringify(countries))}
        />
    );
}
