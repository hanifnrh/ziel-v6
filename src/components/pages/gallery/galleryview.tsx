import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { parseTags } from "@/lib/tags"; // import your tag utility
import { useEffect, useState } from "react";
import { Loader } from "@/components/ui/loader";

// Types based on Hygraph schema
interface HygraphImage {
  id: string;
  imageTitle: string;
  image: { url: string };
  additionImage?: { url: string };
  imageDescription?: string;
  imageTag: string[];
}

interface GalleryViewTag {
  label: string;
  border: string;   // using same keys as parseTags output
  text: string;
}

interface GalleryView {
  id: string;
  title: string;
  imageUrl: string;
  additionImageUrl?: string;
  description?: string;
  tags: GalleryViewTag[];
}

// Sub-components
const ColorDots = ({
  colors = ["bg-violet-400", "bg-emerald-400", "bg-sky-400"],
}: {
  colors?: string[];
}) => (
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

const TagBadge = ({ tag }: { tag: GalleryViewTag }) => (
  <Badge
    variant="outline"
    className={cn(
      "px-3 py-1.5 rounded-xl border",
      tag.border,
      tag.text,
      "outfit-light font-light text-xs 3xl:text-sm tracking-[0] leading-[normal]",
      "bg-transparent hover:bg-transparent",
    )}
  >
    {tag.label}
  </Badge>
);

// Modal Component – now with body scroll lock and proper wheel scrolling
const ImageModal = ({
  image,
  onClose,
}: {
  image: GalleryView | null;
  onClose: () => void;
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [image]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 relative"
        onClick={(e) => e.stopPropagation()}
        // Ensure the modal content scrolls with the wheel
        onWheel={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl z-10"
          onClick={onClose}
        >
          ×
        </button>


        <div className="space-y-4">

          <div className="space-y-4 p-6">
                    <h2 className="text-2xl outfit-semibold mb-4">{image.title}</h2>
          {/* Main Image */}
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full rounded-lg object-contain"
          />

          {/* Additional Image */}
          {image.additionImageUrl && (
            <div>
              <img
                src={image.additionImageUrl}
                alt={`${image.title} - additional`}
                className="w-full rounded-lg object-contain"
              />
            </div>
          )}

          </div>

          <div className="bg-white/60 backdrop-blur-2xl p-6 sticky bottom-0 gap-4 flex flex-col rounded-b-2xl">
            {/* Description */}
            {image.description && (
              <div>
                <p className="text-neutral-800 whitespace-pre-wrap">
                  {image.description}
                </p>
              </div>
            )}

            {/* Tags */}
            {image.tags.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) => (
                    <TagBadge key={tag.label} tag={tag} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Gallery Card – Pinterest style (no fixed aspect ratio)
const GalleryViewCard = ({
  study,
  onClick,
}: {
  study: GalleryView;
  onClick: () => void;
}) => {
  return (
    <article
      className="w-full flex flex-col gap-2 xl:gap-4 group cursor-pointer hover:scale-[1.02] transition-transform duration-300"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={study.imageUrl}
          alt={study.title}
          className="w-full h-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {study.tags.map((tag) => (
          <TagBadge key={`${study.id}-${tag.label}`} tag={tag} />
        ))}
      </div>
    </article>
  );
};

// Main component
function GalleryView() {
  const [images, setImages] = useState<GalleryView[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryView | null>(null);

  // Fetch gallery data from Hygraph
  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch(import.meta.env.PUBLIC_HYGRAPH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.PUBLIC_HYGRAPH_TOKEN}`,
          },
          body: JSON.stringify({
            query: `
              query GetGallery {
                galleries {
                  id
                  imageTitle
                  image {
                    url
                  }
                  additionImage {
                    url
                  }
                  imageDescription
                  imageTag
                }
              }
            `,
          }),
        });

        const json = await response.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        const hygraphImages: HygraphImage[] = json.data?.galleries ?? [];

        // Map to GalleryView format using parseTags
        const mappedImages: GalleryView[] = hygraphImages.map((item) => ({
          id: item.id,
          title: item.imageTitle,
          imageUrl: item.image?.url || "/images/fallback.png",
          additionImageUrl: item.additionImage?.url,
          description: item.imageDescription,
          tags: parseTags(item.imageTag).map((t) => ({
            label: t.label,
            border: t.border,
            text: t.text,
          })),
        }));

        setImages(mappedImages);
      } catch (err) {
        console.error("Error fetching gallery images:", err);
        setError(err instanceof Error ? err.message : "Failed to load gallery");
      } finally {
        setIsLoading(false);
      }
    }

    fetchGallery();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
          <h1 className="w-80 xl:w-126 3xl:w-150 bg-linear-to-b from-[#8E51FF] to-white bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
            Gallery
          </h1>
          <ColorDots />
        </div>
        <div className="flex justify-center py-20">
          <Loader/>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
          <h1 className="w-80 xl:w-126 3xl:w-150 bg-linear-to-b from-[#8E51FF] to-white bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
            Gallery
          </h1>
          <ColorDots />
        </div>
        <div className="text-center text-red-600 py-20">
          Failed to load gallery: {error}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex flex-col px-4 md:px-12 xl:px-32 bg-white gap-20 pb-10">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
        <h1 className="w-80 xl:w-126 3xl:w-150 bg-linear-to-b from-[#8E51FF] to-white bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] outfit-semibold text-transparent text-3xl xl:text-[64px] 3xl:text-7xl text-center tracking-[0] leading-normal xl:leading-18 3xl:leading-normal z-20">
          Gallery
        </h1>
        <ColorDots />
      </div>

      <div className="flex flex-col gap-4 w-full">
        {images.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No images found in gallery.
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image) => (
              <GalleryViewCard
                key={image.id}
                study={image}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        )}
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}

export default GalleryView;