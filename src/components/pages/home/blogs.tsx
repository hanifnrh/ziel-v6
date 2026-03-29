import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/date";
import { parseTags } from "@/lib/tags";

// Types – matches parseTags return value
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
  slug: string;
}

// Sub-components
const DotsIndicator = () => (
  <div className="flex w-full items-center justify-center gap-2 md:gap-4">
    <div className="w-4 h-4 xl:w-6 xl:h-6 rounded-full bg-white" />
    <div className="w-4 h-4 xl:w-6 xl:h-6 rounded-full bg-white" />
    <div className="w-12 xl:w-15 h-4 xl:h-6 rounded-full bg-white" />
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
      tag.border,      // Use border class from tag
      tag.text,        // Use text color class from tag
      "outfit-light font-light text-sm 3xl:text-sm tracking-[0] leading-[normal]",
      "bg-transparent hover:bg-transparent"
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
      href={`/blog/${post.slug}`}
      className="block w-full group hover:scale-[1.02] transition-transform duration-300"
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
            <div className="flex items-center gap-2 flex-wrap text-sm">
              {post.tags.map((tag) => (
                <TagBadge key={tag.label} tag={tag} />
              ))}
            </div>
            <div className="w-full md:w-fit flex justify-end">
              <span className="w-fit text-end md:text-start text-blue-500 text-sm lg:text-base outfit-medium gap-2 hover:text-blue-600 transition-colors inline-flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
};

// Main component
function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
              query GetLatestBlogs {
                blogs(orderBy: publishDate_DESC, first: 3) {
                  id
                  title
                  description
                  slug
                  publishDate
                  featuredImage {
                    url
                  }
                  tag
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

        const mappedPosts: BlogPost[] = blogsData.map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          date: formatDate(item.publishDate),
          imageUrl: item.featuredImage?.url || "/images/fallback.png",
          tags: parseTags(item.tag),
          slug: item.slug,
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err instanceof Error ? err.message : "Failed to load blogs");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-4 md:p-6 3xl:p-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">Loading blogs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 md:p-6 3xl:p-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full p-4 md:p-6 3xl:p-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-neutral-500">No blog posts found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 3xl:p-12">
      <section
        className="
          relative w-full
          flex flex-col items-center gap-6 3xl:gap-12
          px-4 xl:px-24 py-12 xl:py-20
          bg-[url('/images/blog-bg.png')]
          bg-cover bg-center bg-no-repeat
          rounded-[32px]
        "
      >
        {/* Header Section */}
        <header className="relative flex flex-col items-center gap-4 w-full xl:w-156.5 z-10">
          <DotsIndicator />
          <h3 className="outfit-medium text-2xl 3xl:text-3xl text-white text-center">
            Thoughts, ideas, and exploration throughout my experience.
          </h3>
        </header>

        {/* Blog Posts Grid */}
        <div className="flex flex-col w-full relative z-10 gap-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* See More Button */}
        <div className="w-full flex justify-end">
          <a
            href="/blog"
            className="
              w-fit bg-violet-500 text-white 
              px-4 md:px-6 py-2 md:py-3 
              rounded-full outfit-regular text-base
              hover:bg-violet-600 transition-colors
              focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
            "
          >
            See More
          </a>
        </div>
      </section>
    </div>
  );
}

export default Blogs;