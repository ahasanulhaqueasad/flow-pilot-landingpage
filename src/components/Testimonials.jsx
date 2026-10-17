import { motion } from "motion/react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    company: "Creative Studio",
    initials: "SJ",
    avatarColor: "bg-violet-100 text-violet-700",
    rating: 5,
    quote:
      "FlowPilot makes managing multiple projects so much easier. Everything is organized, and our team always knows what to do next.",
  },
  {
    name: "Michael Chen",
    role: "Startup Founder",
    company: "LaunchLabs",
    initials: "MC",
    avatarColor: "bg-sky-100 text-sky-700",
    rating: 5,
    quote:
      "The simple interface and clear project overview help us stay focused. It is a great concept for a team's everyday workflow.",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Manager",
    company: "Growth Collective",
    initials: "ER",
    avatarColor: "bg-rose-100 text-rose-700",
    rating: 5,
    quote:
      "Having tasks, deadlines, and team updates together makes planning feel much more manageable. I love the clean experience.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Testimonials
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Loved by teams that
            <span className="text-indigo-600"> get things done.</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            A sample of the kind of experience FlowPilot aims to deliver to
            teams and professionals.
          </p>

          <p className="mt-3 text-xs text-slate-400">
            Demo testimonials — fictional examples for this portfolio project.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-indigo-100/50"
            >
              <div className="flex items-center justify-between">
                <FaQuoteLeft className="text-3xl text-indigo-200" />

                <div
                  className="flex gap-1"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: testimonial.rating }).map(
                    (_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        className="text-amber-400"
                        size={14}
                      />
                    ),
                  )}
                </div>
              </div>

              <p className="mt-6 min-h-36 text-base leading-8 text-slate-600">
                “{testimonial.quote}”
              </p>

              <div className="my-6 border-t border-slate-100" />

              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${testimonial.avatarColor}`}
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>

                <div>
                  <h3 className="font-bold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {testimonial.role}
                  </p>

                  <p className="text-xs text-slate-400">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
