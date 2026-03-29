import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";

const reviews = [
  { img: "/logos/figma-logo.png" },
  { img: "/logos/tailwind-logo.png" },
  { img: "/logos/maze-logo.png" },
  { img: "/logos/notion-logo.png" },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit cursor-pointer overflow-hidden rounded-full border p-2 flex items-center justify-center",
        // light styles
        "border-gray-950/[.1] bg-gradient-to-t from-[#F3F3F3] to-white hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2 justify-center">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
