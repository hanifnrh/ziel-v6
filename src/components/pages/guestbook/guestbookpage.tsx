// src/components/pages/guestbook/guestbookpage.tsx
import GuestbookEntries from "@/pages/guestbook/_guestbookEntries";
import HeaderWhite from "../header-white";
import { cn } from "@/lib/utils";

interface ColorDotsProps {
  colors?: string[];
}

const ColorDots = ({
  colors = ["bg-white", "bg-white", "bg-white"],
}: ColorDotsProps) => (
  <div className="flex w-full items-center justify-center gap-4 z-10">
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
    <div className="w-full">
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-4 overflow-hidden pb-20 base:pb-52 px-4 md:px-12 xl:px-0">
           <HeaderWhite />
        <img
          src="/images/heroziel.png"
          alt=""
          className="w-full h-full absolute top-0 left-0 inset-0 object-cover"
        />
        <h1 className="w-80 xl:w-126 3xl:w-150 bg-[linear-gradient(180deg,rgba(255,255,255,1)_70%,rgba(101,175,214,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
          Guestbook
        </h1>
          <ColorDots />
        <GuestbookEntries />
      </div>
    </div>
  );
}

export default GuestbookPage;
