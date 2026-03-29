import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Loader } from "@/components/ui/loader";

// Types (same as before)
interface CaseStudyTag {
  label: string;
  borderColor: string;
  textColor: string;
}

interface CaseStudy {
  id: string; // Hygraph uses string IDs
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tags: CaseStudyTag[];
  caseStudyUrl?: string;
}

const DEFAULT_TAGS: CaseStudyTag[] = [
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
    label: "Case Study",
    borderColor: "border-[#a4f4cf]",
    textColor: "text-emerald-600",
  },
];

const ITEMS_PER_PAGE = 6;

const COLOR_OPTIONS = [
  { name: "indigo", border: "border-indigo-200", text: "text-indigo-600" },
  { name: "blue", border: "border-blue-200", text: "text-blue-600" },
  { name: "green", border: "border-green-200", text: "text-green-600" },
  { name: "violet", border: "border-violet-200", text: "text-violet-600" },
  { name: "purple", border: "border-purple-200", text: "text-purple-600" },
  { name: "sky", border: "border-sky-200", text: "text-sky-600" },
];

// Helper to convert tag field to CaseStudyTag[]
function parseTags(tagField: string | string[] | undefined): CaseStudyTag[] {
  let tagsArray: string[] = [];
  if (tagField) {
    tagsArray = Array.isArray(tagField) ? tagField : [tagField];
  }
  // If no tags are provided, add a default "Case Study" tag
  if (tagsArray.length === 0) {
    tagsArray = ["Case Study"];
  }
  return tagsArray.map((label) => {
    const randomIndex = Math.floor(Math.random() * COLOR_OPTIONS.length);
    const color = COLOR_OPTIONS[randomIndex];
    return {
      label,
      borderColor: color.border,
      textColor: color.text,
    };
  });
}

// Sub-components
interface ColorDotsProps {
  colors?: string[];
}

const ColorDots = ({
  colors = ["bg-violet-400", "bg-emerald-400", "bg-sky-400"],
}: ColorDotsProps) => (
  <div className="flex w-full items-center justify-center gap-4">
    {colors.map((color, index) => (
      <div
        key={index}
        className={cn(
          "rounded-full",
          color,
          index === 1 ? "w-12 h-5" : "w-5 h-5",
        )}
      />
    ))}
  </div>
);

interface TagBadgeProps {
  tag: CaseStudyTag;
}

const TagBadge = ({ tag }: TagBadgeProps) => (
  <Badge
    variant="outline"
    className={cn(
      "px-3 py-1.5 rounded-xl border",
      tag.borderColor,
      tag.textColor,
      "outfit-light font-light text-xs 3xl:text-sm tracking-[0] leading-[normal]",
      "bg-transparent hover:bg-transparent",
    )}
  >
    {tag.label}
  </Badge>
);

interface CaseStudyCardProps {
  study: CaseStudy;
}

const CaseStudyCard = ({ study }: CaseStudyCardProps) => {
  return (
    <a
      href={study.caseStudyUrl}
      className="block w-full group hover:scale-[1.02] transition-transform duration-300"
    >
      <article className="w-full flex flex-col gap-2 xl:gap-4 group cursor-pointer hover:scale-[1.02] transition-transform duration-300">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={study.imageUrl}
            alt={`${study.subtitle} case study`}
            className="w-full aspect-video object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {study.tags.map((tag) => (
            <TagBadge key={`${study.id}-${tag.label}`} tag={tag} />
          ))}
        </div>

        <div className="flex flex-col gap-0 md:gap-1">
          <h4 className="text-neutral-600 outfit-regular uppercase text-sm 3xl:text-base tracking-tight">
            {study.title}
          </h4>
          <p className="outfit-medium text-neutral-900 text-base 3xl:text-lg line-clamp-2">
            {study.subtitle}
          </p>
        </div>

        <a href={study.caseStudyUrl} className="block w-full group ...">
          <div className="text-violet-500 text-base 3xl:text-lg outfit-regular text-end flex items-center justify-end gap-1 group-hover:text-violet-600 transition-colors">
            Read Case Study
            <ArrowRight
              size={16}
              className="inline-block group-hover:translate-x-1 transition-transform"
            />
          </div>
        </a>
      </article>
    </a>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full border mr-10",
          currentPage === 1
            ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
            : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400",
        )}
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full text-base outfit-regular",
            currentPage === page
              ? "bg-violet-500 text-white"
              : "text-neutral-700 hover:bg-neutral-50",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full border ml-10",
          currentPage === totalPages
            ? "border-neutral-300 text-neutral-400 cursor-not-allowed"
            : "border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400",
        )}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// Main component
function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const response = await fetch(import.meta.env.PUBLIC_HYGRAPH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.PUBLIC_HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
              query GetProjects {
                projects(orderBy: publishDate_DESC) {
                  id
                  title
                  subtitle
                  slug
                  tag
                  publishDate
                  cardColor
                  featuredImage {
                    url
                  }
                }
              }
            `,
          }),
        });

        const json = await response.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        const projects = json.data.projects ?? [];

        // Map projects to CaseStudy format
        const mappedStudies: CaseStudy[] = projects.map((item: any) => ({
          id: item.id,
          title: item.title,
          // Use a fallback for subtitle: you might want to add a "subtitle" field to Hygraph later
          subtitle: item.subtitle || item.title.split(" ")[0] || "Project",
          description: item.description,
          imageUrl: item.featuredImage?.url || "/images/fallback.png",
          tags: parseTags(item.tag),
          caseStudyUrl: `/studies/${item.slug}`,
        }));

        setCaseStudies(mappedStudies);
      } catch (err) {
        console.error("Error fetching case studies:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load case studies",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchCaseStudies();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(caseStudies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedStudies = caseStudies.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </section>
    );
  }

  // No data state
  if (caseStudies.length === 0) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">No case studies found.</div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
      {/* Header section remains unchanged */}
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <h1 className="w-80 xl:w-126 3xl:w-150 bg-linear-to-b from-[#8E51FF] to-white bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
          Case Studies
        </h1>
        <ColorDots />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        <div className="text-center text-neutral-600 outfit-regular text-sm">
          Showing {Math.min(startIndex + 1, caseStudies.length)}-
          {Math.min(endIndex, caseStudies.length)} of {caseStudies.length} case
          studies
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
