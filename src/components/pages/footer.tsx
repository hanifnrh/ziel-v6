import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

const linkItems = [
  { label: "Analytics" },
  { label: "About" },
  { label: "Resume" },
  { label: "Guestbook" },
];

const contactItems = [
  { label: "Email" },
  { label: "Instagram" },
  { label: "LinkedIn" },
];

const versionBadges = [
  {
    label: "Version 1.0",
    color: "text-blue-600",
    borderColor: "border-[#dbeafe]",
    href: "https://ziel-orcin.vercel.app/",
  },
  {
    label: "Version 2.0",
    color: "text-violet-600",
    borderColor: "border-[#ddd6ff]",
    href: "https://zielporto.vercel.app/",
  },
  {
    label: "Version 3.0",
    color: "text-emerald-600",
    borderColor: "border-[#a4f4cf]",
    href: "https://dailyziel.vercel.app/",
  },
  {
    label: "Version 4.0",
    color: "text-red-600",
    borderColor: "border-[#ffc9c9]",
    href: "https://ziel-v4.vercel.app/",
  },
  {
    label: "Version 5.0",
    color: "text-yellow-600",
    borderColor: "border-[#fee685]",
    href: "https://ziel-v5.vercel.app/",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full p-4 md:p-6 3xl:p-12">
      <div className="flex flex-col w-full items-start gap-6 p-4 md:p-6 lg:p-8 bg-[#ffffff] rounded-[32px] border border-solid border-[#e5e5e5] shadow-[0px_20px_30px_#ebebeb80] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)]">
        <div className="flex flex-col md:flex-row w-full items-start justify-between gap-10 xl:gap-0">
          <div className="flex flex-col w-full lg:w-100 3xl:w-110 items-start gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="bg-sky-500 rounded-2xl md:rounded-lg p-3 md:p-2">
                <img
                  className="flex-shrink-0"
                  alt="Frame"
                  src="/logos/ziel-logo-white.png"
                />
              </div>

              <h2 className="font-['Outfit',Helvetica] font-semibold text-neutral-900 text-2xl tracking-[0] leading-[normal]">
                Ziel
              </h2>
            </div>

            <div className="flex flex-col items-start gap-1.5 w-full">
              <p className="[font-family:'Outfit',Helvetica] font-light text-neutral-600 text-base 3xl:text-lg tracking-[0] leading-[normal]">
                Designing digital experiences with intention, guided by
                research, empathy, and a deep understanding of real user needs.
              </p>
            </div>
          </div>

          <nav className="w-full justify-between lg:justify-end inline-flex items-start gap-12 lg:gap-4">
            <div className="flex flex-col w-full lg:w-52 xl:w-60 items-start gap-2">
              <div className="inline-flex gap-1.5 flex-col items-start">
                <h3 className="[font-family:'Outfit',Helvetica] font-semibold text-neutral-900 text-base 3xl:text-lg tracking-[0] leading-[normal]">
                  Links
                </h3>
              </div>

              <ul className="inline-flex gap-1 flex-col items-start">
                {linkItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={`/${item.label.toLowerCase()}`}
                      className="[font-family:'Outfit',Helvetica] font-light text-neutral-600 text-base tracking-[0] leading-[normal] hover:text-neutral-900 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col w-full lg:w-52 xl:w-60 items-start gap-2">
              <div className="inline-flex gap-1.5 flex-col items-start">
                <h3 className="[font-family:'Outfit',Helvetica] font-semibold text-neutral-900 text-base 3xl:text-lg tracking-[0] leading-[normal]">
                  Contacts
                </h3>
              </div>

              <ul className="inline-flex gap-1 flex-col items-start">
                {contactItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="[font-family:'Outfit',Helvetica] font-light text-neutral-600 text-base tracking-[0] leading-[normal] hover:text-neutral-900 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <Separator className="w-full" />

        <div className="flex flex-col md:flex-row gap-4 md:gap-0 items-start justify-between w-full">
          <p className="[font-family:'Outfit',Helvetica] font-light text-neutral-600 text-base tracking-[0] leading-[normal]">
            v.6.0 © 2025 Ziel. All rights reserved.
          </p>

          <div className="inline-flex flex-wrap items-start gap-[4px]">
            {versionBadges.map((badge, index) => (
              <a
                key={index}
                href={badge.href}
                className="inline-flex no-underline cursor-pointer"
              >
                <Badge
                  variant="outline"
                  className={`inline-flex items-center justify-center gap-2.5 px-3 py-1.5 rounded-xl ${badge.borderColor} ${badge.color} [font-family:'Outfit',Helvetica] font-light text-sm 3xl:text-sm tracking-[0] leading-[normal] hover:bg-transparent`}
                >
                  {badge.label}
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(101,175,214,1)_0%,rgba(255,255,255,1)_80%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Outfit',Helvetica] font-semibold text-transparent text-[172px] xl:text-[240px] text-center tracking-[0] leading-[normal] -mt-24 xl:-mt-28">
        ZIEL
      </div>
    </footer>
  );
}