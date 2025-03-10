export const Testimonials = () => {
    const testimonials = [
        {
            quote: "This platform has saved our team at least 20 hours every week on repetitive tasks. The ROI is incredible.",
            author: "Sarah Johnson",
            role: "Operations Manager",
            company: "TechCorp"
        },
        {
            quote: "I was able to build an automation that would have cost thousands to develop custom. Did it in an afternoon!",
            author: "Michael Chen",
            role: "Marketing Director",
            company: "GrowthBrand"
        },
        {
            quote: "We've connected our entire tech stack without writing a single line of code. Game changer for our small team.",
            author: "Alex Rivera",
            role: "Founder",
            company: "StartupX"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Users Say</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Join thousands of teams that have transformed their workflows
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                            <div className="text-yellow-400 flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                            <div>
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        <span>Trusted by 10,000+ companies worldwide</span>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-70">
                        {['Company 1', 'Company 2', 'Company 3', 'Company 4', 'Company 5'].map((company, i) => (
                            <div key={i} className="h-8 flex items-center justify-center">
                                <div className="bg-gray-300 h-4 w-24 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}