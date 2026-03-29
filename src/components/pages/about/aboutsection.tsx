import { Badge } from "@/components/ui/badge";
import { MarqueeDemo } from "@/components/ui/marquee-demo";
import {
  Activity,
  ChevronsRight,
  CodeXml,
  Disc2,
  Download,
  Dribbble,
  Figma,
  FileSearchCorner,
  Github,
  Instagram,
  Linkedin,
  UserSearch,
} from "lucide-react";
import React from "react";
import Header from "../header-white";

const tools = [
  {
    label: "UI Design",
    borderColor: "border-[#dbeafe]",
    textColor: "text-blue-600",
  },
  {
    label: "UX Research",
    borderColor: "border-[#ddd6ff]",
    textColor: "text-violet-600",
  },
  {
    label: "Data Synthesis",
    borderColor: "border-[#a4f4cf]",
    textColor: "text-emerald-600",
  },
];

function AboutSection() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full flex flex-col justify-center items-center gap-4 3xl:gap-10 overflow-hidden pb-20 base:pb-52 3xl:pb-60 px-4 md:px-12 xl:px-0">
        <Header />
        <img
          src="/images/heroziel.png"
          alt=""
          className="w-full h-240 absolute top-0 left-0 inset-0 object-cover"
        />

        <div className="w-full justify-start grid grid-cols-2 xs:grid-cols-2 md:grid-cols-12 lg:w-220 3xl:w-240 gap-4 z-20">
          <h1 className="col-span-2 md:col-span-12 text-start w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_50%,rgba(101,175,214,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
            About Me
          </h1>
          {/* Upper Card */}
          <div className="flex flex-col w-full h-full col-span-2 xs:col-span-2 md:col-span-8 bg-white rounded-[24px] p-4 gap-1">
            <div className="flex items-center gap-3">
              <h3 className="outfit-semibold text-neutral-900 text-base 3xl:text-xl">
                Who Am I
              </h3>
            </div>
            <p className="outfit-light text-neutral-600 leading-6 text-base 3xl:text-lg">
              I’m Hanif, I go by Ziel, a practicing design engineer based in{" "}
              <span className="outfit-medium text-neutral-900">
                Bekasi, Indonesia.
              </span>{" "}
              I am a Computer Engineering graduate from Universitas Diponegoro.
              I focus on crafting engaging and user-friendly digital experiences
              through thoughtful UI/UX design and development.
            </p>
          </div>

          <div className="flex flex-col items-start justify-center w-full h-full col-span-2 xs:col-span-2 md:col-span-4 bg-white rounded-[24px] p-4 gap-1">
            <div className="w-full items-center justify-between flex md:grid md:grid-cols-2 lg:flex md:gap-4 lg:gap-0">
              <div className="w-full items-center justify-center flex col-span-1">
                <a
                href="https://www.instagram.com/ziel.works/"
                rel="canonical"
                target="_blank"
                className="w-fit md:w-full lg:w-fit flex items-center justify-center bg-linear-to-b from-white to-[#F3F3F3] p-2.5 md:p-2 lg:p-2.5 rounded-full border-3 border-slate-200">
                  <Instagram className="text-pink-500 w-6 h-6" />
                </a>
              </div>

              <div className="w-full items-center justify-center flex col-span-1">
                <a
                  href="https://dribbble.com/ziel_works"
                rel="canonical"
                target="_blank"
                className="w-fit md:w-full lg:w-fit flex items-center justify-center bg-linear-to-b from-white to-[#F3F3F3] p-2.5 md:p-2 lg:p-2.5 rounded-full border-3 border-slate-200">
                  <Dribbble className="text-purple-500 w-6 h-6" />
                </a>
              </div>

              <div className="w-full items-center justify-center flex col-span-1">
                <a
                          href="https://github.com/hanifnrh"
                rel="canonical"
                target="_blank"
                className="w-fit md:w-full lg:w-fit flex items-center justify-center bg-linear-to-b from-white to-[#F3F3F3] p-2.5 md:p-2 lg:p-2.5 rounded-full border-3 border-slate-200">
                  <Github className="text-neutral-900 w-6 h-6" />
                </a>
              </div>

              <div className="w-full items-center justify-center flex col-span-1">
                <a
                href="https://www.linkedin.com/in/nurrahmathanif/"
                rel="canonical"
                target="_blank"
                className="w-fit md:w-full lg:w-fit flex items-center justify-center bg-linear-to-b from-white to-[#F3F3F3] p-2.5 md:p-2 lg:p-2.5 rounded-full border-3 border-slate-200">
                  <Linkedin className="text-blue-500 w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="w-fit flex items-center gap-3">
              <h3 className="outfit-semibold text-neutral-900 text-base 3xl:text-xl">
                Socials
              </h3>
            </div>
            <p className="outfit-light text-neutral-600 leading-6 text-base 3xl:text-lg">
              Works, updates, and all.
            </p>
          </div>

          {/* 1st Card */}
          <div className="col-span-1 md:col-span-3 w-full bg-[#525252]/30 backdrop-blur-sm rounded-[24px] p-4 flex flex-col justify-center items-start gap-4 md:gap-8 lg:gap-14">
            <h3 className="text-white text-base 3xl:text-xl outfit-medium flex items-center justify-between w-full">
              UI/UX Design
              <Figma />
            </h3>
            <div className="flex justify-center items-center p-2 rounded-full bg-white">
              <img src="/logos/figma-logo.png" alt="" />
            </div>
          </div>

          {/* 2nd Card */}
          <div className="col-span-1 md:col-span-3 w-full bg-[#525252]/30 backdrop-blur-sm rounded-[24px] p-4 flex flex-col justify-center items-start gap-4 md:gap-8 lg:gap-14">
            <h3 className="text-white text-base 3xl:text-xl outfit-medium flex items-center justify-between w-full">
              User Research
              <UserSearch />
            </h3>
            <div className="w-full flex gap-2">
              <div className="flex justify-center items-center p-2 rounded-full bg-white">
                <img src="/logos/notion-logo.png" alt="" />
              </div>
              <div className="flex justify-center items-center p-2 rounded-full bg-white">
                <img src="/logos/maze-logo.png" alt="" />
              </div>
            </div>
          </div>

          {/* 3rd Card */}
          <div className="col-span-1 md:col-span-3 w-full bg-[#525252]/30 backdrop-blur-sm rounded-[24px] p-4 flex flex-col justify-center items-start gap-4 md:gap-8 lg:gap-14">
            <h3 className="text-white text-base 3xl:text-xl outfit-medium flex items-center justify-between w-full">
              SEO & Lead Gen
              <Activity />
            </h3>
            <div className="w-full flex gap-2">
              <div className="flex justify-center items-center p-2 rounded-full bg-white">
                <img src="/logos/semrush-logo.png" alt="" />
              </div>
              <div className="flex justify-center items-center p-2 rounded-full bg-white">
                <img src="/logos/analytics-logo.png" alt="" />
              </div>
            </div>
          </div>

          {/* 4th Card */}
          <div className="col-span-1 md:col-span-3 w-full bg-[#525252]/30 backdrop-blur-sm rounded-[24px] p-4 flex flex-col justify-center items-start gap-4 md:gap-8 lg:gap-14">
            <h3 className="text-white text-base 3xl:text-xl outfit-medium flex items-center justify-between w-full">
              Web Development
              <CodeXml />
            </h3>
            <div className="w-full flex gap-2">
              <div className="flex justify-center items-center p-2 rounded-full bg-white">
                <img src="/logos/react-logo.png" alt="" />
              </div>
              <div className="flex justify-center items-center p-2 rounded-full bg-white">
                <img src="/logos/tailwind-logo.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
