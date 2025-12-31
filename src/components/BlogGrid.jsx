import { useState, useEffect } from "react";
import BlogCard from "./BlogCard.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";

export default function BlogGrid() {
  const cardsData = [
    ...Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      image:
        "https://images.unsplash.com/photo-1496979551903-46e46589a88b?auto=format&fit=crop&w=634&q=80",
      title: `Boxing icon has the will for a couple more fights ${i + 1}`,
      description:
        "The highly anticipated world championship fight will take place at 10am and is the second major boxing blockbuster in the nation after 43 years.",
      link: `/article/${i + 1}`,
    })),
  ];

  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cardsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = cardsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

  return (
    <div className="py-16">
      <div className="max-w-screen mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
        {currentCards.map((card) => (
          <BlogCard
            key={card.id}
            image={card.image}
            title={card.title}
            description={card.description}
            link={card.link}
            data-aos="fade-up"
          />
        ))}
      </div>

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
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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
  );
}
