import React from "react";

export default function Footer() {
  return (
    <>
      <div
        class="footer-section bg-[#2B1F39] text-[#E0F0EA] px-6 sm:px-10 md:px-16 lg:px-24 xl:px-36 2xl:px-36 pt-14 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-6 sm:pb-6 md:pb-8 lg:pb-8 xl:pb-10 rounded-t-3xl"
        id="footer-section-id"
      >
        <h1 class="font-semibold! italic!" data-aos="fade-down">
          Get in Touch
        </h1>
        <p
          class="text-[#E0F0EA]! font-light! px-5 sm:px-10 md:px-15 lg:px-20 xl:px-25"
          data-aos="fade-down"
        >
          "Whether it's an opportunity, a project idea, or even just a good{" "}
          <br />
          meme — I'm always open to connect. Let’s build, brainstorm, or <br />
          just share a laugh. Reach out!"
        </p>
        <div class="social-container my-5 flex flex-col items-center justify-center">
          <div
            class="social-media flex justify-center mt-4"
            data-aos="fade-down"
          >
            <a
              href="https://x.com/DivSingh2006?t=OA4u2w-u7Xkt17R9KpYTkQ&s=09"
              target="_blank"
            >
              <i class="fa-brands fa-x-twitter"></i>
            </a>
            <a href="https://github.com/divyamsingh007" target="_blank">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com/btwimdivyam/" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/divyam-singh-duhoon-0010211bb/"
              target="_blank"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&to=legendprice007@gmail.com"
              target="_blank"
            >
              <i class="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>
        <div class="footer-bottom relative px-6 md:px-10 lg:px-20 flex justify-between mt-20">
          <div>
            <h5 class="leading-none! text-left! italic! font-normal! opacity-75 text-xl! relative z-10">
              Designed & developed with passion
            </h5>
            <h5 class="leading-none! text-left! -mt-1 md:-mt-2 text-xl!  relative z-0 -ml-1">
              © 2025 Divyam Singh. All rights reserved.
            </h5>
          </div>
          <div class="hidden justify-center sm:flex">
            <a
              href="#top"
              class="text-gray-300 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-x-2"
            >
              Back to top
              <i class="fa-solid fa-arrow-up"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
