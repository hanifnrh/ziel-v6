import { ChevronDown, ChevronsDown, ChevronsRight, FileSearchCorner } from "lucide-react";

function DesignProcess() {
  return (
    // Design Process Section
    <div className="w-full bg-white rounded-t-0 md:rounded-t-[32px] mt-0 base:-mt-32 px-4 md:px-12 xl:px-32 pt-16 md:pt-20 z-20">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <div className="flex w-full items-center justify-center gap-2 md:gap-4">
          <div className="w-12 xl:w-15 h-4 xl:h-6 rounded-full bg-violet-400"></div>
          <div className="w-4 xl:w-6 h-4 xl:h-6 rounded-full bg-emerald-400"></div>
          <div className="w-4 xl:w-6 h-4 xl:h-6 rounded-full bg-sky-400"></div>
        </div>

        <h2 className="text-xl md:text-2xl 3xl:text-3xl text-neutral-900 outfit-medium w-full md:w-156.5 3xl:w-180 text-center leading-7">
          Good design is comfortable. I build designs focusing on the purpose
          and turn user needs into intuitive experiences.
        </h2>
      </div>

      <div className="flex flex-col base:flex-row items-center justify-between py-12 xl:py-24">
        <div className="w-full gap-2 flex flex-col">
          <div className="bg-[#8E51FF]/10 p-2 w-fit h-fit flex items-center justify-center rounded-full">
            <div className="p-3 text-white bg-linear-to-b from-[#8E51FF] to-[#553199] rounded-full flex items-center justify-center">
              <FileSearchCorner size={28} />
            </div>
          </div>

          <h4 className="outfit-medium text-violet-500 text-xl 3xl:text-2xl">
            Initial Research
          </h4>
          <p className="outfit-light text-neutral-600 text-base 3xl:text-lg">
            State the objectives of the research, empathize with users, define
            success metrics, and focus on user scenarios research.
          </p>
        </div>

        <div className="hidden base:flex px-4 xl:px-10 3xl:px-14">
          <ChevronsRight className="text-neutral-600" size={40} />
        </div>

         <div className="inline-flex base:hidden py-4 md:py-10 3xl:py-14">
          <ChevronsDown className="text-neutral-600" size={32} />
        </div>

        <div className="w-full gap-2 flex flex-col">
          <div className="bg-[#00BC7D]/10 p-2 w-fit h-fit flex items-center justify-center rounded-full">
            <div className="p-3 text-white bg-linear-to-b from-[#00BC7D] to-[#008D5E] rounded-full flex items-center justify-center">
              <FileSearchCorner size={28} />
            </div>
          </div>

          <h4 className="outfit-medium text-emerald-500 text-xl 3xl:text-2xl">
            Digestible Insights
          </h4>
          <p className="outfit-light text-neutral-600 text-base 3xl:text-lg">
            Analyzing research data into digestible formats such as empathy map,
            user persona, problem statements, root causes, key insights, and
            prioritization matrix.
          </p>
        </div>

       <div className="hidden base:flex px-4 xl:px-10 3xl:px-14">
          <ChevronsRight className="text-neutral-600" size={40} />
        </div>

         <div className="inline-flex base:hidden py-4 md:py-10 3xl:py-14">
          <ChevronsDown className="text-neutral-600" size={32} />
        </div>

        <div className="w-full gap-2 flex flex-col">
          <div className="bg-[#00A6F4]/10 p-2 w-fit h-fit flex items-center justify-center rounded-full">
            <div className="p-3 text-white bg-linear-to-b from-[#00A6F4] to-[#0089C9] rounded-full flex items-center justify-center">
              <FileSearchCorner size={28} />
            </div>
          </div>

          <h4 className="outfit-medium text-sky-500 text-xl 3xl:text-2xl">
            Design Delivery
          </h4>
          <p className="outfit-light text-neutral-600 text-base 3xl:text-lg">
            Executing research findings and insights into wireframes,
            high-fidelity designs, or prototypes. This goes iteratively cyclical
            to the whole process.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesignProcess;
