import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlurText from "../ui/BlurText";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  X,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layers,
} from "lucide-react";

/* ───────────────────── sample data ───────────────────── */
const CATEGORIES = [
  "All",
  "Essays",
  "Short Read",
  "Thought Pieces",
  "Dev Log",
  "Travel",
];

const ALL_POSTS = Array.from({ length: 24 }, (_, i) => {
  const cats = CATEGORIES.slice(1);
  return {
    id: i + 1,
    image: [
      "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80",
    ][i % 6],
    title:
      [
        "Building Resilient Systems with Modern Architecture",
        "The Art of Writing Clean, Maintainable Code",
        "Lessons from Shipping My First Open Source Project",
        "Why I Switched to a Minimalist Dev Setup",
        "Debugging in Production: War Stories & Wisdom",
        "Exploring the Edges of Frontend Performance",
      ][i % 6] + (i >= 6 ? ` — Part ${Math.floor(i / 6) + 1}` : ""),
    description:
      "A deep-dive into the thinking, trade-offs, and late-night debugging sessions that shaped this piece of work. Read on to explore what I learned.",
    category: cats[i % cats.length],
    date: new Date(2026, 0, 25 - i).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: `${3 + (i % 7)} min read`,
    link: `/blog/${i + 1}`,
  };
});

/* ───────────────────── component ───────────────────── */
export default function AllBlogs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  /* filter + search */
  const filtered = useMemo(() => {
    let list = ALL_POSTS;
    if (activeCategory !== "All")
      list = list.filter((p) => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => setCurrentPage(1), [activeCategory, searchQuery]);

  /* ── card size helper for bento grid ── */
  const sizeClass = (idx) => {
    const pos = idx % 9;
    if (pos === 0) return "md:col-span-2 md:row-span-2";
    if (pos === 3 || pos === 7) return "md:col-span-2";
    return "";
  };

  return (
    <section className="relative min-h-screen bg-[#E0F0EA]">
      {/* subtle decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-150 h-150 rounded-full bg-[#2B1F39]/3 blur-[140px]" />
        <div className="absolute top-1/2 -left-48 w-125 h-125 rounded-full bg-[#6C5B7B]/5 blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-100 h-100 rounded-full bg-[#2B1F39]/2 blur-[100px]" />
      </div>

      {/* navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* main content */}
      <div className="relative z-10 pt-32 pb-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* ────── hero header card (mirrors Home hero-section-head) ────── */}
          <div
            className="overflow-hidden md:rounded-3xl bg-[#2B1F39] px-6 sm:px-10 md:px-14 lg:px-20 pt-10 md:pt-14 pb-10 md:pb-14 mb-16"
            data-aos="fade-up"
          >
            {/* back link */}
            <Link
              to="/"
              className="line-btn m-0! p-0! border-0! bg-transparent! group inline-flex items-center mb-8"
              style={{ textDecoration: "none" }}
            >
              <h6
                className="inline-flex items-center gap-2 italic text-[#E0F0EA]/60 hover:text-[#E0F0EA] transition-colors"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  fontWeight: 500,
                }}
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Back to Home
              </h6>
            </Link>

            {/* title row */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div className="flex-1">
                <BlurText
                  text="All Articles"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={() => {}}
                  className=""
                  style={{
                    color: "#E0F0EA",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: "bold",
                    fontStyle: "normal",
                    fontSize: "clamp(2.5rem, 5vw + 1rem, 5.6rem)",
                    lineHeight: "1.1",
                    textAlign: "left",
                    opacity: 1,
                  }}
                />
                <BlurText
                  text="Every piece I've published — filtered, searchable, and waiting for you."
                  delay={100}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={() => {}}
                  className=""
                  style={{
                    color: "#E0F0EA",
                    opacity: 0.5,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 300,
                    fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                    lineHeight: "1.7",
                    textAlign: "left",
                    marginTop: "12px",
                  }}
                />
              </div>              
            </div>

            <hr className="border-[#E0F0EA]/10 mb-8" />

            {/* filter bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              {/* category pills */}
              <div className="flex flex-wrap gap-2.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                    }}
                    className={`px-5 py-2 rounded-full text-xs uppercase transition-all duration-300
                      ${
                        activeCategory === cat
                          ? "bg-[#E0F0EA] text-[#2B1F39] shadow-lg shadow-[#E0F0EA]/15 scale-105"
                          : "text-[#E0F0EA]/45 border border-[#E0F0EA]/12 hover:border-[#E0F0EA]/35 hover:text-[#E0F0EA]/80"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* search */}
              <div className="relative shrink-0">
                {searchOpen ? (
                  <div className="flex items-center gap-2 bg-[#E0F0EA]/10 border border-[#E0F0EA]/15 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Search size={15} className="text-[#E0F0EA]/40" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search articles…"
                      className="bg-transparent text-[#E0F0EA] placeholder-[#E0F0EA]/25 text-sm outline-none w-52"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="text-[#E0F0EA]/40 hover:text-[#E0F0EA] transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-2 text-[#E0F0EA]/40 hover:text-[#E0F0EA]/80 border border-[#E0F0EA]/12 hover:border-[#E0F0EA]/30 rounded-full px-5 py-2 transition-all"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.8rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    <Search size={14} />
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ────── bento grid ────── */}
          {paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-36 text-center">
              <Search size={52} className="text-[#2B1F39]/15 mb-5" />
              <p
                className="text-[#2B1F39]/35 text-lg"
                style={{
                  fontFamily: "Roboto, sans-serif",
                  opacity: 1,
                  fontWeight: 400,
                }}
              >
                No articles match your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-5">
              {paginated.map((post, idx) => {
                const isHero = sizeClass(idx).includes("row-span-2");
                const isWide = sizeClass(idx).includes("col-span-2") && !isHero;

                return (
                  <Link
                    key={post.id}
                    to={post.link}
                    className={`group relative overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500 ${sizeClass(idx)}`}
                    data-aos="fade-up"
                    data-aos-delay={idx * 60}
                  >
                    {/* bg image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />

                    {/* gradient overlay — dark purple from bottom */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#2B1F39] via-[#2B1F39]/50 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* top badges */}
                    <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10">
                      <span
                        className="px-3.5 py-1.5 rounded-full bg-[#E0F0EA]/90 text-[#2B1F39] backdrop-blur-md border border-white/20 shadow-sm"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-[#E0F0EA]/60"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 400,
                        }}
                      >
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>

                    {/* content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <p
                        className="text-[#E0F0EA]/45 mb-2.5 flex items-center gap-1.5"
                        style={{
                          fontFamily: "Roboto, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 400,
                          opacity: 1,
                          textAlign: "left",
                          letterSpacing: "0.02em",
                        }}
                      >
                        <Calendar size={11} /> {post.date}
                      </p>
                      <h3
                        className={`text-[#E0F0EA] leading-snug ${
                          isHero
                            ? "text-2xl md:text-3xl"
                            : isWide
                              ? "text-xl"
                              : "text-lg"
                        }`}
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontWeight: 700,
                          lineHeight: 1.25,
                          textAlign: "left",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {post.title}
                      </h3>
                      {(isHero || isWide) && (
                        <p
                          className="mt-3 text-[#E0F0EA]/50 line-clamp-2"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fontSize: "0.9rem",
                            fontWeight: 300,
                            lineHeight: 1.65,
                            opacity: 1,
                            textAlign: "left",
                          }}
                        >
                          {post.description}
                        </p>
                      )}
                      <div
                        className="mt-4 flex items-center gap-2 text-[#E0F0EA]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                        }}
                      >
                        Read article
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>

                    {/* border on hover */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-[#E0F0EA]/0 group-hover:border-[#E0F0EA]/20 transition-all duration-500" />
                  </Link>
                );
              })}
            </div>
          )}

          {/* ────── pagination ────── */}
          {totalPages > 1 && (
            <div className="mt-24 flex justify-center" data-aos="fade-up">
              <div className="flex items-center gap-2 rounded-full px-5 py-3 bg-white/50 backdrop-blur-md border border-[#2B1F39]/8 shadow-lg">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[#2B1F39]/50 hover:text-[#2B1F39] hover:bg-[#2B1F39]/8 transition disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                      }}
                      className={`min-w-10 h-10 px-3.5 rounded-full text-sm transition-all duration-300
                        ${
                          page === currentPage
                            ? "bg-[#2B1F39] text-[#E0F0EA] shadow-md shadow-[#2B1F39]/25 scale-105"
                            : "text-[#2B1F39]/40 hover:text-[#2B1F39] hover:bg-[#2B1F39]/8"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-[#2B1F39]/50 hover:text-[#2B1F39] hover:bg-[#2B1F39]/8 transition disabled:opacity-25 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </section>
  );
}
