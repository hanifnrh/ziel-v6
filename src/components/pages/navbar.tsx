import {
  Home,
  BookOpen,
  User,
  Image,
  FileText,
  MessageSquare,
  Info,
  BookText,
  Form,
} from "lucide-react";

interface NavbarProps {
  currentPath: string;
}

const baseItem =
  "inline-flex items-center gap-2 justify-center " +
  "px-3 md:px-4 py-3 " +
  "outfit-regular text-sm md:text-base rounded-full";

const inactiveItem = "text-white";
const activeItem =
  "bg-white text-neutral-900 px-4 md:px-6 shadow-black/25 shadow-lg";

function Navbar({ currentPath }: NavbarProps) {
  const isActive = (href: string) => {
    if (href === "/") return currentPath === href;
    return currentPath.startsWith(href);
  };

  return (
    <div className="fixed bottom-10 3xl:bottom-20 w-full flex justify-center z-50">
      <div className="w-fit flex items-center gap-2 rounded-full bg-[#525252]/40 backdrop-blur-sm p-2">
        {/* Home - now dynamic */}
        <a href="/" className={`${baseItem} ${isActive("/") ? activeItem : inactiveItem}`}>
          <Home className="md:hidden w-5 h-5" />
          <span className="hidden md:inline">Home</span>
        </a>

        {/* About - now dynamic */}
        <a href="/about" className={`${baseItem} ${isActive("/about") ? activeItem : inactiveItem}`}>
          <Info className="md:hidden w-5 h-5" />
          <span className="hidden md:inline">About</span>
        </a>

        {/* Studies */}
        <a href="/studies" className={`${baseItem} ${isActive("/studies") ? activeItem : inactiveItem}`}>
          <BookText className="md:hidden w-5 h-5" />
          <span className="hidden md:inline">Studies</span>
        </a>

        {/* Gallery */}
        <a href="/gallery" className={`${baseItem} ${isActive("/gallery") ? activeItem : inactiveItem}`}>
          <Image className="md:hidden w-5 h-5" />
          <span className="hidden md:inline">Gallery</span>
        </a>

        {/* Blog */}
        <a href="/blog" className={`${baseItem} ${isActive("/blog") ? activeItem : inactiveItem}`}>
          <Form className="md:hidden w-5 h-5" />
          <span className="hidden md:inline">Blog</span>
        </a>
      </div>
    </div>
  );
}

export default Navbar;