import Footer from "@/components/pages/footer";
import HeaderBlue from "@/components/pages/header-blue";
import Navbar from "@/components/pages/navbar";
import CaseStudies from "@/components/pages/studies/case-studies";

interface StudiesProps {
  currentPath: string;
}

function Studies({ currentPath }: StudiesProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full">
      <div className="w-full flex flex-col justify-center items-center gap-12 bg-white overflow-hidden shadow-neutral-200 shadow-2xl">
        <Navbar currentPath={currentPath} />

        <HeaderBlue />

        <CaseStudies />

        <Footer />
      </div>
    </div>
  );
}

export default Studies;
