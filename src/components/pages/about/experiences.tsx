interface ExperienceItemProps {
  logo: string;
  title: string;
  company: string;
  duration?: string;
  location?: string;
  descriptions: string[];
  badgeType?: "internship" | "contract" | "fulltime";
  badgeText?: string;
}

interface ColorDotProps {
  width?: string;
  height?: string;
  color: string;
}

interface BadgeProps {
  type: "internship" | "contract" | "fulltime";
  text?: string;
  className?: string;
  showIcon?: boolean;
}

// Badge configuration with variants
const badgeConfig = {
  internship: {
    icon: "/assets/badge-intern.png",
    textColor: "text-purple-800",
    bgGradient: "bg-linear-to-b from-white to-[#FEF1FF]",
    borderColor: "border-purple-200",
    defaultText: "Internship",
  },
  contract: {
    icon: "/assets/badge-fulltime.png",
    textColor: "text-amber-600",
    bgGradient: "bg-linear-to-b from-white to-[#FFF5E3]",
    borderColor: "border-amber-200",
    defaultText: "Contract",
  },
  fulltime: {
    icon: "/assets/badge-fulltime.png", // You can change this to a different icon
    textColor: "text-green-700",
    bgGradient: "bg-linear-to-b from-white to-[#E3FFE3]",
    borderColor: "border-green-200",
    defaultText: "Full-time",
  },
} as const;

// Reusable Badge Component with variants
function Badge({ type, text, className = "", showIcon = true }: BadgeProps) {
  const config = badgeConfig[type];

  return (
    <div
      className={`flex w-fit h-fit gap-1.5 px-2 p-1 lg:p-1.5 lg:px-3 rounded-2xl ${config.bgGradient} border ${config.borderColor} items-center justify-center ${config.textColor} outfit-light text-sm md:text-base ${className}`}
    >
      {showIcon && (
        <img src={config.icon} alt={`${type} badge`} className="w-3 h-3" />
      )}
      {text || config.defaultText}
    </div>
  );
}

// Reusable Color Dot Component
function ColorDot({
  width = "w-4 xl:w-6",
  height = "h-4 xl:h-6",
  color,
}: ColorDotProps) {
  return <div className={`${width} ${height} rounded-full ${color}`}></div>;
}

// Color Dots Component
function ColorDots() {
  return (
    <div className="flex w-full items-center justify-start gap-2 md:gap-4">
      <ColorDot
        width="w-12 xl:w-15"
        height="h-4 xl:h-6"
        color="bg-violet-400"
      />
      <ColorDot color="bg-emerald-400" />
      <ColorDot color="bg-sky-400" />
    </div>
  );
}

// Reusable Experience Item Component
function ExperienceItem({
  logo,
  title,
  company,
  duration,
  location,
  descriptions,
  badgeType = "internship",
  badgeText,
}: ExperienceItemProps) {
  return (
    <div className="grid grid-cols-12">
      {/* LEFT */}
      <div className="col-span-12 lg:col-span-10 xl:col-span-8 flex flex-col gap-6">
        {/* TOP LEFT */}
        <div className="flex gap-3 md:gap-6">
          <div className="w-12 h-12 flex items-center justify-center p-2.5 md:p-3 rounded-xl bg-linear-to-b from-white to-[#f3f3f3] border border-neutral-300">
            <img src={logo} alt={`${title} logo`} className="w-full" />
          </div>

          <div className="flex w-full justify-between">
            <div className="w-full flex flex-col gap-1">
              <h4 className="outfit-medium text-neutral-900 text-xl lg:text-2xl">
                {title}
              </h4>
              <p className="outfit-regular text-neutral-600 text-base">
                {company}
              </p>
              <p className="outfit-light text-neutral-600 text-base">
                {duration}
              </p>
              <p className="outfit-light text-neutral-600 text-base">
                {location}
              </p>
            </div>

            {/* Mobile Badge */}
            <div className="flex w-full justify-end lg:hidden">
              <Badge type={badgeType} text={badgeText} className="lg:hidden" />
            </div>
          </div>
        </div>
        {/* BOTTOM LEFT */}
        <div className="pl-6 md:pl-18 lg:pl-20">
          <ul className="outfit-light text-neutral-600 list-disc text-base">
            {descriptions.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop Badge */}
      <div className="w-full hidden items-end col-span-2 xl:col-span-4 lg:flex flex-col">
        <Badge
          type={badgeType}
          text={badgeText}
          className="hidden lg:flex text-base"
        />
      </div>
    </div>
  );
}

// Define TypeScript type for experiences data
interface ExperienceData {
  logo: string;
  title: string;
  company: string;
  location?: string;
  duration?: string;
  descriptions: string[];
  badgeType: "internship" | "contract" | "fulltime";
  badgeText?: string;
}

// Experiences Data
const experiencesData: ExperienceData[] = [
  {
    logo: "/logos/monash-logo.png",
    title: "UI/UX Designer & Researcher",
    company: "Action Lab, Monash University",
    duration: "Jan 2026 - Present",
    location: "BSD City, Tangerang, Indonesia",
    descriptions: ["TBA."],
    badgeType: "contract",
    badgeText: "Full Time", // Optional override
  },
  {
    logo: "/logos/cimb-logo.png",
    title: "UI/UX Designer",
    company: "PT Bank CIMB Niaga, Tbk",
    duration: "Oct 2025 - Dec 2025",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Designed internal application, manpower planning module based on the established design system, existing manual procedures, and enhanced business flow.",
      "Collaborated in an agile environment with developers, a delivery manager, technical lead, and product owners.",
      "Gathered requirements of the designated module from various operational sectors of CIMB Niaga, ensuring the system is realistically solving manual administration problems.",
      "Frequently validating the current design sprint to the design system, working with Senior UI/UX Designers and product owners to state the limitation of the DS.",
    ],
    badgeType: "internship",
    badgeText: "Internship",
  },
  {
    logo: "/logos/ecofix-logo.png",
    title: "Web Designer & Developer",
    company: "PT Gama Abyakta Sejahtera",
    duration: "Dec 2024 - Feb 2025",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Built SEO-optimized websites, developed internal tools for social media analysis, and collaborated on internal applications. Improved SEO performance and user experience through research, design, and best practices.",
      "Collaborating in an agile environment with developers, a delivery manager, technical lead, and product owners.",
      "Working in CSR project to support their environmental initiatives.",
    ],
    badgeType: "internship",
    badgeText: "Internship",
  },
  {
    logo: "/logos/tth-logo.png",
    title: "UI/UX Designer",
    company: "Telkom Test House",
    duration: "Jul 2023 - Aug 2023",
    location: "Jakarta, Indonesia",
    descriptions: [
      "Designed web and mobile UI for the Telkom Test House Whistleblowing System, focusing on user experience.",
      "Conducted data analysis for service quality and collaborated on improving organizational standards.",
    ],
    badgeType: "internship",
    badgeText: "Internship",
  },
];

function Experiences() {
  return (
    // Experiences Section
    <div className="w-full flex flex-col bg-white rounded-t-0 md:rounded-t-[32px] mt-0 base:-mt-32 px-4 md:px-12 xl:px-32 pt-16 md:pt-20 z-20 gap-24">
      <div className="flex flex-col items-start justify-center gap-4 md:gap-8">
        <ColorDots />
        <h2 className="text-xl md:text-2xl 3xl:text-3xl text-neutral-900 outfit-medium w-full md:w-156.5 3xl:w-180 text-start leading-7">
          Evolving with every challenges and encounter with people in the field,
          I gather valuable experiences that shape my professional journey.
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        {experiencesData.map((exp, index) => (
          <ExperienceItem key={index} {...exp} />
        ))}
      </div>
    </div>
  );
}

export default Experiences;
