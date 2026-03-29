import Footer from "@/components/pages/footer";
import HeaderBlue from "@/components/pages/header-blue";
import Navbar from "@/components/pages/navbar";
import GalleryView from "@/components/pages/gallery/galleryview";

interface GalleryProps {
  currentPath: string;
}

function Gallery({ currentPath }: GalleryProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full">
      <div className="w-full flex flex-col justify-center items-center gap-12 bg-white overflow-hidden shadow-neutral-200 shadow-2xl">
        <Navbar currentPath={currentPath} />

        <HeaderBlue />

         <GalleryView />

        <Footer />
      </div>
    </div>
  );
}

export default Gallery;
