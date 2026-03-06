"use client";

export default function UniversityMarquee({ universities }: { universities: { name: string, imageUrl: string }[] }) {
    if (universities.length === 0) return null;

    // Duplicate for seamless loop
    const items = [...universities, ...universities];

    return (
        <section className="py-12 bg-[#F8F9FA] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                <span className="text-[var(--brand-blue)] font-semibold text-sm uppercase tracking-wider">Our Partners</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">Partner Universities Worldwide</h2>
            </div>
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10" />
                <div className="flex animate-marquee whitespace-nowrap">
                    {items.map((university, i) => {
                        return (
                            <div
                                key={`${university.name}-${i}`}
                                className="inline-flex items-center justify-center mx-4 sm:mx-6 px-4 py-2 sm:py-3 bg-white border border-gray-100 rounded-full shadow-sm hover:shadow-md transition-shadow shrink-0 group"
                            >
                                <img 
                                    src={university.imageUrl} 
                                    alt={`${university.name} avatar`} 
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                    className="h-10 w-10 sm:h-12 sm:w-12 object-cover mr-3 sm:mr-4 rounded-full border border-gray-200 group-hover:scale-110 transition-transform"
                                />
                                <span className="text-sm sm:text-base pr-2 font-bold text-gray-800 whitespace-nowrap">{university.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
