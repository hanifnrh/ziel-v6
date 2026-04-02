import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GuestbookEntry {
  id: number;
  created_at: string;
  content: string;
  user_name: string;
  user_avatar: string;
  user_id: string;
}

export default function GuestbookEntries() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  // Determine if we're on mobile (breakpoint at 768px)
  const isMobile = viewportWidth < 768;

  // Get limit based on auth status AND screen size
  const getLimit = () => {
    if (user) {
      // Logged in: 6 on desktop, 3 on mobile
      return isMobile ? 3 : 6;
    } else {
      // Logged out: 9 on desktop, 6 on mobile
      return isMobile ? 6 : 9;
    }
  };

  // Fetch entries with current limit and page
  const fetchEntries = async (page: number) => {
    setIsLoading(true);
    const limit = getLimit();
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from("guestbook")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching entries:", error);
    } else {
      setEntries(data || []);
      if (count) setTotalPages(Math.ceil(count / limit));
    }
    setIsLoading(false);
  };

  // Watch for window resize
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When limit changes (due to resize or auth), reset to page 1 and refetch
  useEffect(() => {
    setCurrentPage(1);
    fetchEntries(1);
  }, [user, isMobile]); // isMobile depends on viewportWidth

  // When page changes, fetch that page (without resetting)
  useEffect(() => {
    if (currentPage !== 1) fetchEntries(currentPage);
  }, [currentPage]);

  // Initial auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (provider: "github" | "google") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + window.location.pathname,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newMessage.trim()) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("guestbook").insert({
      content: newMessage.trim(),
      user_id: user.id,
      user_name:
        user.user_metadata.full_name ||
        user.user_metadata.name ||
        user.email?.split("@")[0] ||
        "Anonymous",
      user_avatar:
        user.user_metadata.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email?.[0] || "U")}&background=random`,
    });

    if (error) {
      console.error("Error posting message:", error);
    } else {
      setNewMessage("");
      setCurrentPage(1);
      await fetchEntries(1);
    }
    setIsSubmitting(false);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(dateStr).getTime()) / 1000
    );
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-5xl mx-auto space-y-8 mt-10">
      {!user && (
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* GitHub & Google buttons – unchanged */}
          <button onClick={() => signIn("github")}>
            <div className="group relative bg-white px-6 py-4 flex items-center gap-2 w-fit border-3 border-neutral-200 rounded-[24px] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-t from-neutral-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="outfit-medium text-neutral-800 relative z-10 flex items-center gap-2">
                Sign in with GitHub
                <img src="/logos/github-logo.png" alt="" className="w-5 h-5" />
              </span>
            </div>
          </button>
          <button onClick={() => signIn("google")}>
            <div className="group relative bg-white px-6 py-4 flex items-center gap-2 w-fit border-3 border-sky-200 rounded-[24px] overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-linear-to-t from-sky-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="outfit-medium text-blue-500 relative z-10 flex items-center gap-2">
                Sign in with Google
                <img src="/logos/google-logo.png" alt="" className="w-5 h-5" />
              </span>
            </div>
          </button>
        </div>
      )}

      {user && (
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-160 bg-white backdrop-blur-sm rounded-[24px] p-4 space-y-4"
        >
          <div className="flex items-center justify-start gap-4 pt-2">
            <img
              src={user.user_metadata.avatar_url}
              className="w-8 h-8 rounded-full"
              alt=""
            />
            <span className="outfit-medium text-neutral-900">
              Hi, {user.user_metadata.full_name || user.email}
            </span>
          </div>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Leave a message..."
            rows={3}
            className="w-full p-3 rounded-xl bg-neutral-100 text-neutral-600 placeholder:text-neutral-600 placeholder:outfit-light resize-none focus-visible:outline-none"
            required
          />
          <div className="flex w-full justify-between">
            <button
              onClick={signOut}
              className="px-6 py-2 bg-white text-red-600 outfit-regular hover:bg-linear-to-t hover:shadow-lg active:scale-[0.98] border-4 border-red-200 rounded-2xl disabled:opacity-50 transition-all cursor-pointer"
            >
              Sign Out
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-linear-to-t from-blue-600 to-blue-400 text-white outfit-regular rounded-2xl border-4 border-blue-200 disabled:opacity-50 transition-all duration-200 hover:shadow-lg active:scale-[0.98] cursor-pointer"
            >
              {isSubmitting ? "Posting..." : "Sign Guestbook"}
            </button>
          </div>
        </form>
      )}

      {isLoading && <div className="text-white text-center">Loading messages...</div>}

      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 w-full">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-[24px] bg-[#525252]/30 backdrop-blur-sm text-white p-5 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={entry.user_avatar}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />
                  <div>
                    <h4 className="outfit-regular">{entry.user_name}</h4>
                    <p className="text-sm outfit-light text-neutral-100">
                      {timeAgo(entry.created_at)}
                    </p>
                  </div>
                </div>
                <p className="text-base outfit-light leading-relaxed">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 flex-wrap z-20 bg-white rounded-[24px] p-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-md text-neutral-800 disabled:opacity-30 hover:bg-white/30 transition cursor-pointer"
              >
                <ChevronLeft />
              </button>

              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`w-12 h-12 flex items-center justify-center rounded-md transition cursor-pointer outfit-regular ${
                    pageNum === currentPage
                      ? "bg-linear-to-t from-blue-600 to-blue-400 text-white"
                      : "text-neutral-600"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-12 h-12 flex items-center justify-center bg-white rounded-md text-neutral-800 disabled:opacity-30 hover:bg-white/30 transition cursor-pointer"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}