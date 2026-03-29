import Footer from "@/components/pages/footer";
import Blogs from "@/components/pages/home/blogs";
import CaseStudies from "@/components/pages/home/case-studies";
import DesignProcess from "@/components/pages/home/design-process";
import Hero from "@/components/pages/home/hero";
import Navbar from "@/components/pages/navbar";

interface HomeProps {
  currentPath: string;
}

function Home({ currentPath }: HomeProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full">
      <div className="w-full flex flex-col justify-center items-center gap-12 bg-white overflow-hidden shadow-neutral-200 shadow-2xl">

        <Navbar currentPath={currentPath} />
        
        <Hero />

        <DesignProcess />

        <CaseStudies />

        <Blogs />

        <Footer />
      </div>
    </div>
  );
}

export default Home;
