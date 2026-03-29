import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Loader } from "@/components/ui/loader";
import { parseTags } from "@/lib/tags";

// Types
interface BlogTag {
  label: string;
  border: string;
  text: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  tags: BlogTag[];
  readMoreUrl: string;
}

const ITEMS_PER_PAGE = 4;

// Sub-components
const DotsIndicator = () => (
  <div className="flex w-full items-center justify-center gap-2 md:gap-4">
    <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-white" />
    <div className="w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-white" />
    <div className="w-12 xl:w-12 h-4 xl:h-5 rounded-full bg-white" />
  </div>
);

interface TagBadgeProps {
  tag: BlogTag;
}

const TagBadge = ({ tag }: TagBadgeProps) => (
  <Badge
    variant="outline"
    className={cn(
      "px-3 py-1.5 rounded-xl border",
      tag.border,
      tag.text,
      "outfit-light font-light text-sm 3xl:text-sm tracking-[0] leading-[normal]",
      "bg-transparent hover:bg-transparent",
    )}
  >
    {tag.label}
  </Badge>
);

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <a
      href={post.readMoreUrl}
      className="block w-full group hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
    >
      <article className="flex flex-col md:flex-row gap-4 bg-white rounded-[32px] p-4 lg:p-6">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full md:w-1/3 lg:w-75 lg:h-[166px] rounded-[18px] object-cover"
        />
        <div className="flex flex-col items-start justify-between gap-2 md:gap-4 flex-1">
          <div className="flex flex-col items-start justify-center gap-1">
            <p className="outfit-regular text-neutral-600 text-sm lg:text-base 3xl:text-lg">
              {post.date}
            </p>
            <h4 className="outfit-semibold text-neutral-900 text-lg lg:text-xl line-clamp-2">
              {post.title}
            </h4>
            <p className="outfit-regular text-neutral-600 text-sm lg:text-base 3xl:text-lg line-clamp-3">
              {post.description}
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-2 flex-wrap">
              {post.tags.map((tag, index) => (
                <TagBadge key={`${post.id}-${tag.label}-${index}`} tag={tag} />
              ))}
            </div>
            <div className="w-full md:w-fit flex justify-end">
              <a
                href={post.readMoreUrl}
                className="w-fit text-end md:text-start text-blue-500 text-sm lg:text-base outfit-medium gap-2 hover:text-blue-600 transition-colors inline-flex items-center"
              >
                Read More <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
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
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "bg-white flex items-center justify-center w-10 h-10 rounded-full mr-10",
          currentPage === 1
            ? "text-neutral-400 cursor-not-allowed"
            : "text-neutral-700 hover:bg-neutral-50",
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
              : "text-white hover:bg-neutral-50",
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "bg-white flex items-center justify-center w-10 h-10 rounded-full ml-10",
          currentPage === totalPages
            ? "text-neutral-400 cursor-not-allowed"
            : "text-neutral-700 hover:bg-neutral-50",
        )}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// Main component
function BlogContent() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);

  // Fetch blogs from Hygraph
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch(import.meta.env.PUBLIC_HYGRAPH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.PUBLIC_HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
              query GetBlogs {
                blogs(orderBy: publishDate_DESC) {
                  id
                  title
                  description
                  slug
                  tag
                  publishDate
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

        const blogsData = json.data?.blogs ?? [];

        // Map to BlogPost format
        const mappedBlogs: BlogPost[] = blogsData.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          date: new Date(item.publishDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          imageUrl: item.featuredImage?.url || "/images/fallback.png",
          tags: parseTags(item.tag),
          readMoreUrl: `/blog/${item.slug}`,
        }));

        setBlogs(mappedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Pagination effect
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedPosts(blogs.slice(startIndex, endIndex));
  }, [blogs, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-4 md:p-6 3xl:p-12 bg-white">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="w-full p-4 md:p-6 3xl:p-12 bg-white">
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">No blog posts found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 3xl:p-12 bg-white">
      <section
        className="
          relative w-full
          flex flex-col items-center gap-6 3xl:gap-12
          px-4 xl:px-24 py-12 xl:py-20
          bg-[url('/images/blog-bg.png')]
          bg-cover bg-center bg-no-repeat
          rounded-[24px]
        "
      >
        {/* Header Section */}
        <header className="relative flex flex-col items-center gap-4 w-full xl:w-156.5 z-10">
          <h1 className="w-80 xl:w-126 3xl:w-150 text-white outfit-semibold text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
            Blogs
          </h1>
          <DotsIndicator />
          <h3 className="text-xl md:text-2xl 3xl:text-3xl text-white outfit-medium w-full xl:w-156.5 3xl:w-180 text-center leading-7">
            Thoughts, ideas, and exploration throughout my experience as
            full-time curious learner.
          </h3>
        </header>

        {/* Blog Posts Grid */}
        <div className="flex flex-col w-full relative z-10 gap-4">
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="w-full flex flex-col items-center gap-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            {/* Page Info */}
            <div className="text-center text-white outfit-regular text-sm">
              Showing{" "}
              {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, blogs.length)}-
              {Math.min(currentPage * ITEMS_PER_PAGE, blogs.length)} of{" "}
              {blogs.length} posts
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default BlogContent;
