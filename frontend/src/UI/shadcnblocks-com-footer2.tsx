import { GiDinosaurRex } from "react-icons/gi";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    alt: "DocGen brand",
    title: "DocGen",
    url: "#",
  },
  tagline = "Generate polished docs from raw code.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Home", url: "#" },
        { text: "Pricing", url: "#pricing" },
        { text: "Docs", url: "#docs" },
        { text: "Contact", url: "#contact" },
      ],
    },
    {
      title: "Features",
      links: [
        { text: "README Generator", url: "#" },
        { text: "API Docs", url: "#" },
        { text: "Code Explanation", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help Center", url: "#" },
        { text: "Support", url: "#" },
        { text: "Status", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "LinkedIn", url: "#" },
        { text: "GitHub", url: "#" },
      ],
    },
  ],
  copyright = "© 2026 DocGen. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="px-4 pb-4">
      <div
        className="rounded-[20px] border border-white/10 px-6 py-10 md:px-8"
        style={{ backgroundColor: "var(--code-bg)" }}
      >
        <footer>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6">
            <div className="col-span-1 mb-4 sm:col-span-2 lg:mb-0">
              <div className="flex items-center gap-3">
                <a
                  href={logo.url}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5"
                >
                  <GiDinosaurRex className="h-6 w-6 text-red-500" />
                </a>
                <div>
                  <p className="text-lg font-semibold" style={{ color: "var(--text-h)" }}>
                    {logo.title}
                  </p>
                  <p className="text-xs opacity-70">{tagline}</p>
                </div>
              </div>
            </div>

            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 text-sm font-bold" style={{ color: "var(--text-h)" }}>
                  {section.title}
                </h3>
                <ul className="space-y-3 opacity-80">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="text-sm font-medium hover:text-cyan-300">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-sm opacity-80 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-cyan-300">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
