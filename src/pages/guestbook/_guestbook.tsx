import Footer from "@/components/pages/footer";
import GuestbookPage from "@/components/pages/guestbook/guestbookpage";
import Navbar from "@/components/pages/navbar";

interface GuestbookProps {
  currentPath: string;
}

function Guestbook({ currentPath }: GuestbookProps) {
  return (
    <div className="flex flex-col justify-center items-center bg-neutral-50 dark:bg-neutral-900 w-full">
      <div className="w-full flex flex-col justify-center items-center gap-12 bg-white overflow-hidden shadow-neutral-200 shadow-2xl">

        <Navbar currentPath={currentPath} />
        
        <GuestbookPage />

        <Footer />
      </div>
    </div>
  );
}

export default Guestbook;
