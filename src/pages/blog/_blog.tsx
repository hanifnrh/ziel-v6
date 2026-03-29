import BlogContent from "@/components/pages/blog/blog";
import Footer from "@/components/pages/footer";
import HeaderBlue from "@/components/pages/header-blue";
import Navbar from "@/components/pages/navbar";

interface BlogProps {
  currentPath: string;
}

function Blog({ currentPath }: BlogProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full">
      <div className="w-full flex flex-col justify-center items-center bg-white overflow-hidden shadow-neutral-200 shadow-2xl">
        <Navbar currentPath={currentPath} />

        <HeaderBlue />

        <BlogContent />

        <Footer />
      </div>
    </div>
  );
}

export default Blog;
