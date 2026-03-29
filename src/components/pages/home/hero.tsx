import { Badge } from "@/components/ui/badge";
import { MarqueeDemo } from "@/components/ui/marquee-demo";
import { ChevronsRight, Disc2, Download, FileSearchCorner } from "lucide-react";
import React from "react";
import HeaderWhite from "../header-white";

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

function Hero() {
  return (
    <div className="w-full">
      <img
        src="/images/heroziel.png"
        alt=""
        className="w-full h-210 3xl:h-240 absolute top-0 left-0 inset-0 object-cover"
      />
      {/* Hero Section */}
      <HeaderWhite />
      <div className="relative w-full flex flex-col justify-center items-center gap-4 3xl:gap-10 overflow-hidden pb-20 base:pb-52 3xl:pb-60 px-4 md:px-12 xl:px-0">
        <h1 className="w-80 xl:w-126 3xl:w-150 bg-[linear-gradient(180deg,rgba(255,255,255,1)_70%,rgba(101,175,214,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
          Purpose Driven Product Designer
        </h1>

        <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-12 md:w-129 3xl:w-150 gap-4 z-20">
          {/* Upper Card */}
          <div className="flex flex-col w-full xs:col-span-2 md:col-span-12 bg-white rounded-[24px] p-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 3xl:w-10 rounded-full p-2 bg-sky-500">
                <img
                  src="/logos/ziel-logo-white.png"
                  alt=""
                  className="w-full"
                />
              </div>
              <h3 className="outfit-semibold text-neutral-900 text-base 3xl:text-xl">
                Hi, I'm Ziel!
              </h3>
            </div>
            <p className="outfit-light text-neutral-600 leading-6 text-base 3xl:text-lg">
              Interface Designer who practices deep research analysis to help
              translate user needs into well-crafted digital experience.
            </p>
          </div>

          {/* Left Cards */}
          <div className="col-span-1 md:col-span-5 w-full bg-[#525252]/30 backdrop-blur-sm rounded-[24px] p-4 flex flex-col justify-center items-start gap-2">
            <h3 className="text-white text-base 3xl:text-xl outfit-medium flex items-center justify-between w-full">
              Core Principles
              <Disc2 />
            </h3>
            <div className="flex flex-col gap-1 text-base 3xl:text-lg">
              <div className="flex items-center gap-2 text-white outfit-regular">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                User oriented
              </div>
              <div className="flex items-center gap-2 text-white outfit-regular">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                Data-driven
              </div>
              <div className="flex items-center gap-2 text-white outfit-regular">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                Iterative research
              </div>
              <div className="flex items-center gap-2 text-white outfit-regular">
                <div className="w-3 h-3 bg-violet-400 rounded-full"></div>
                Behavioral analysis
              </div>
            </div>
          </div>

          {/* Right Cards */}
          <div className="w-full col-span-1 md:col-span-7 bg-white rounded-[24px] p-4 flex flex-col gap-2">
            <div>
              <MarqueeDemo />
            </div>
            <h3 className="text-neutral-900 outfit-medium flex items-center justify-between w-full text-base 3xl:text-xl">
              Tools I Use
            </h3>
            <div className="flex flex-wrap items-start gap-1 w-full">
              {tools.map((tool, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className={`px-3 py-1.5 rounded-xl border ${tool.borderColor} ${tool.textColor} outfit-light text-[10px] 3xl:text-xs tracking-[0] leading-[normal] bg-transparent hover:bg-transparent`}
                >
                  {tool.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
