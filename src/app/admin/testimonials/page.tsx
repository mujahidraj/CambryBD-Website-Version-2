import { getTestimonials } from "@/actions/testimonials";
import TestimonialsClient from "./TestimonialsClient";

export default async function TestimonialsPage() {
    let testimonials: any[] = [];
    try { testimonials = await getTestimonials(); } catch { }
    return <TestimonialsClient testimonials={testimonials} />;
}
