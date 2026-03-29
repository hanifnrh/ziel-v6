import AboutSection from "@/components/pages/about/aboutsection";
import Experiences from "@/components/pages/about/experiences";
import Footer from "@/components/pages/footer";
import Navbar from "@/components/pages/navbar";

interface AboutProps {
  currentPath: string;
}

function About({ currentPath }: AboutProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full">
      <div className="w-full flex flex-col justify-center items-center gap-12 bg-white overflow-hidden shadow-neutral-200 shadow-2xl">

       <Navbar currentPath={currentPath} />
        
        <AboutSection />

        <Experiences />

        <Footer />
      </div>
    </div>
  );
}

export default About;
