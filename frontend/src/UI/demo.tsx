import { Footer2 } from "./shadcnblocks-com-footer2";

const demoData = {
  logo: {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=120&h=120&q=80",
    alt: "DocGen brand",
    title: "DocGen",
    url: "#",
  },
  tagline: "Components made easy.",
  menuItems: [
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
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Blog", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help", url: "#" },
        { text: "Sales", url: "#" },
        { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "LinkedIn", url: "#" },
      ],
    },
  ],
  copyright: "© 2026 Copyright. All rights reserved.",
  bottomLinks: [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
};

function Footer2Demo() {
  return <Footer2 {...demoData} />;
}

export { Footer2Demo };
