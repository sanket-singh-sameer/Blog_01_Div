import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import Background from "../components/Background";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

export default function AllBlogs() {
  const cardsData = [
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      image:
        "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
      title: `Boxing icon has the will for a couple more fights ${i + 1}`,
      description:
        "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
      link: `/article/${i + 1}`,
      category: "Short Read",
    })),
  ];

  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cardsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = cardsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    AOS.refresh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <section className="relative min-h-screen">
        <div className="fixed inset-0 z-0">
          <Background />
        </div>

        <div className="relative z-20">
          <Navbar />
        </div>

        <div className="relative z-10 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[#DFEFE9]/70 hover:text-[#DFEFE9] transition-colors mb-4"
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </Link>
                <h1
                  className="text-4xl md:text-5xl font-light text-[#DFEFE9]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  data-aos="fade-right"
                >
                  All Blogs
                </h1>
                <p
                  className="text-[#DFEFE9]/60 mt-2"
                  data-aos="fade-right"
                  data-aos-delay="100"
                >
                  Explore all my articles and thoughts
                </p>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCards.map((card, index) => (
                <BlogCard
                  key={card.id}
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  link={card.link}
                  category={card.category}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center">
                <div
                  className="flex items-center gap-2 rounded-full px-4 py-2
                              bg-[#2B1F39]/70 backdrop-blur-md
                              border border-white/10 shadow-xl"
                >
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-9 h-9 flex items-center justify-center rounded-full
                               text-[#DFEFE9]/70 hover:text-[#DFEFE9]
                               hover:bg-white/10 transition
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const isActive = page === currentPage;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-9 h-9 px-3 rounded-full text-sm font-medium transition-all
                          ${
                            isActive
                              ? "bg-[#DFEFE9] text-[#2B1F39] shadow-md scale-105"
                              : "text-[#DFEFE9]/70 hover:text-[#DFEFE9] hover:bg-white/10"
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
                    className="w-9 h-9 flex items-center justify-center rounded-full
                               text-[#DFEFE9]/70 hover:text-[#DFEFE9]
                               hover:bg-white/10 transition
                               disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <Footer />
        </div>
      </section>
    </>
  );
}
