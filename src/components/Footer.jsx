import { motion } from "motion/react";
import {
  FaLayerGroup,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowUp,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "How It Works", href: "#how-it-works" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Get Started", href: "#get-started" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Contact", href: "mailto:hello@example.com" },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50 px-4 pt-16 pb-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#get-started" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <FaLayerGroup size={22} />
              </span>

              <span className="text-2xl font-bold tracking-tight text-slate-900">
                Flow<span className="text-indigo-600">Pilot</span>
              </span>
            </a>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">
              A smarter way to organize your projects, empower your team, and
              make meaningful progress every day.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Footer link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-900">
                {group.title}
              </h3>

              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 transition hover:text-indigo-600"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-10 border-t border-slate-200" />

        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-slate-500">
            © {currentYear} FlowPilot. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Built as a portfolio project with React and Tailwind CSS.
          </p>

          <motion.a
            href="#get-started"
            whileHover={{ y: -3 }}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-indigo-600 hover:text-white"
          >
            <FaArrowUp />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
