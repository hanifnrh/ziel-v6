import { Badge } from "@/components/ui/badge";
import { MarqueeDemo } from "@/components/ui/marquee-demo";
import { ChevronsRight, Disc2, Download, FileSearchCorner } from "lucide-react";
import React from "react";
import HeaderWhite from "../header-white";
import { cn } from "@/lib/utils";
import ButtonGithub from "./button-github";
import ButtonGoogle from "./button-google";

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

interface ColorDotsProps {
  colors?: string[];
}

const ColorDots = ({
  colors = ["bg-white", "bg-white", "bg-white"],
}: ColorDotsProps) => (
  <div className="flex w-full items-center justify-center gap-4">
    {colors.map((color, index) => (
      <div
        key={index}
        className={cn(
          "rounded-full",
          color,
          index === 0 ? "w-15 h-6" : "w-6 h-6",
        )}
      />
    ))}
  </div>
);

function GuestbookPage() {
  return (
    <div className="w-full px-4 md:px-12 xl:px-32">
      <img
        src="/images/heroziel.png"
        alt=""
        className="w-full h-210 3xl:h-240 absolute top-0 left-0 inset-0 object-cover"
      />
      {/* GuestbookPage Section */}
      <HeaderWhite />
      <div className="relative w-full flex flex-col justify-center items-center gap-8 3xl:gap-10 overflow-hidden pb-20 base:pb-52 3xl:pb-60 px-4 md:px-12 xl:px-0">
        <h1 className="w-80 xl:w-126 3xl:w-150 bg-[linear-gradient(180deg,rgba(255,255,255,1)_70%,rgba(101,175,214,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
          Guestbook
        </h1>
        <ColorDots />

        <div className="w-full flex items-center justify-center gap-4 z-20">
          {/* Left Cards */}
          <ButtonGithub />

          {/* Right Cards */}
          <ButtonGoogle />
        </div>

        {/* Guestbook Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
          {/* Card 1 */}
          <div className="col-span-1 rounded-[24px] bg-[#525252]/30 backdrop-blur-sm text-white p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img
                src="/images/profile-picture.jpg"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div className="flex flex-col gap-1">
                <h4 className="outfit-medium">Username</h4>
                <p className="outfit-regular">200 days ago</p>
              </div>
            </div>
            <p className="outfit-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>

          {/* Card 2 */}
          <div className="col-span-1 rounded-[24px] bg-[#525252]/30 backdrop-blur-sm text-white p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img
                src="/images/profile-picture.jpg"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div className="flex flex-col gap-1">
                <h4 className="outfit-medium">Username</h4>
                <p className="outfit-regular">200 days ago</p>
              </div>
            </div>
            <p className="outfit-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>

          {/* Card 3 */}
          <div className="col-span-1 rounded-[24px] bg-[#525252]/30 backdrop-blur-sm text-white p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <img
                src="/images/profile-picture.jpg"
                className="w-12 h-12 rounded-full"
                alt=""
              />
              <div className="flex flex-col gap-1">
                <h4 className="outfit-medium">Username</h4>
                <p className="outfit-regular">200 days ago</p>
              </div>
            </div>
            <p className="outfit-light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestbookPage;
