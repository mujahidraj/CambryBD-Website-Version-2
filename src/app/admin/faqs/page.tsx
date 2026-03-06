import { getAllFaqs } from "@/actions/faqs";
import FaqsClient from "./FaqsClient";

export default async function FaqsPage() {
    let faqs: any[] = [];
    try { faqs = await getAllFaqs(); } catch { }
    return <FaqsClient faqs={faqs} />;
}
