import { Download } from "lucide-react";
import React from "react";

function HeaderBlue() {
  return (
    <div className="w-full flex justify-between items-center px-4 xl:px-40 py-4 3xl:py-6 z-20">
      <a
        href="https://drive.google.com/file/d/1WPDoHeShQjspFq0fUBfwl3Gv8ED2d4Un/view?usp=sharing"
        rel="canonical"
        target="_blank"
        className="flex items-center text-sky-500 bg-NONE text-sm xl:text-base outfit-medium gap-2 rounded-[12px] px-2 py-2 cursor-pointer"
      >
        <div className="text-white bg-linear-to-b from-sky-400 to-sky-600 p-2 rounded-sm flex items-center justify-center">
          <Download size={18} />
        </div>
        RESUME
      </a>

      <a href="/" className="absolute left-1/2 -translate-x-1/2">
        <img
          src="/logos/ziel-logo-blue.png"
          alt=""
          className="w-8 xl:w-full h-auto"
        />
      </a>

      <a
        href="mailto:nurrahmathaniff@gmail.com"
        rel="canonical"
        target="_blank"
        className="flex items-center text-sky-500 text-sm xl:text-base outfit-medium gap-2 bg-white rounded-[24px] px-4 py-2 xl:py-4 cursor-pointer border-4 border-sky-200"
      >
        Get in Touch
      </a>
    </div>
  );
}

export default HeaderBlue;
