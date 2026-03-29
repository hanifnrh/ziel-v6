import { Download } from "lucide-react";
import React from "react";

function HeaderWhite() {
  return (
      <div className="w-full flex justify-between items-center px-4 xl:px-40 py-4 3xl:py-6 sticky top-0 z-20">
        <div className="flex items-center text-white bg-NONE text-sm xl:text-base outfit-medium gap-2 rounded-[12px] px-2 py-2 cursor-pointer">
          <div className="text-sky-500 bg-linear-to-b from-white to-[#F3F3F3] p-2 rounded-sm flex items-center justify-center">
            <Download size={18} />
          </div>
          RESUME
        </div>

        <div className="absolute left-1/2 -translate-x-1/2">
          <img
            src="/logos/ziel-logo-white.png"
            alt=""
            className="w-8 xl:w-full h-auto"
          />
        </div>

        <div className="flex items-center text-sky-500 text-sm xl:text-base outfit-medium gap-2 bg-white rounded-[24px] px-4 py-2 xl:py-4 cursor-pointer border-4 border-sky-200">
          Get in Touch
        </div>
      </div>
  );
}

export default HeaderWhite