import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { FaReact, FaCss3Alt } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isEmpty = useSelector((state) => state.groq.isEmpty);

  return (
    <nav className="fixed top-0 flex justify-between items-center w-full py-4 px-4 md:px-32 bg-white z-50">
      <div className="relative flex flex-col w-32 group">
        <div className="max-w-fit flex items-center">
          <a
            href="https://www.linkedin.com/in/oryza-sativa-fedvp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="gradient w-12 h-8 rounded-md"></div>
          </a>
        </div>
        <div className="absolute hidden group-hover:block left-16 h-full px-2 rounded-md bg-black/[.1]">
          oreoryza
        </div>
      </div>
      <div className="flex items-center gap-4">
        {!isEmpty && (
          <div className="relative group flex items-center w-40 justify-end">
            <div className="absolute hidden group-hover:flex left-0 w-4 h-4 rounded-md items-center justify-start gap-2">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaReact className="text-xl opacity-50 hover:opacity-100 hover:text-[#08DDFF]" />
              </a>
              <a
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiRedux className="text-xl opacity-50 hover:opacity-100 hover:text-[#7A50BE]" />
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTailwindCssFill className="text-xl opacity-50 hover:opacity-100 hover:text-[#38BDF8]" />
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaCss3Alt className="text-xl opacity-50 hover:opacity-100 hover:text-blue-500" />
              </a>
            </div>
            <button className="hover:bg-black/[.1] py-1 px-2 ms-4 rounded-md active:bg-black/[.2]">
              Tools
            </button>
          </div>
        )}
        <button
          title="Change Theme"
          className="hover:bg-black/[.1] py-1 px-2 rounded-md active:bg-black/[.2]"
          onClick={() => dispatch(toggleTheme())}
        >
          <i
            className={`bi ${
              theme === "light" ? "bi-sun-fill" : "bi-moon-fill"
            } text-lg`}
          ></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
