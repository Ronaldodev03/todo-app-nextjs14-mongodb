import { Lato } from "next/font/google";
import "./globals.css";
import ThemeButton from "./components/ThemeButton";

const roboto = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Todo App",
  description:
    "Welcome to TodoApp, a modern and dynamic solution designed to help you manage your tasks efficiently and stylishly. Built with the latest technology stack including Next.js 14, Tailwind CSS, MongoDB, and enhanced with features like dark mode and drag-and-drop functionality, TodoApp stands out as your ultimate tool for personal organization and productivity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} min-h-screen dark:bg-black transition-all  `}
      >
        {/* bg image */}
        <div className=" bg-ligth-bg-mobile dark:bg-dark-bg-mobile sm:bg-ligth-bg-desk sm:dark:bg-dark-bg-desk dark:bg-dark bg-center bg-no-repeat bg-cover h-[12.5rem] sm:h-[18.75rem] //max-w-[100rem] mx-auto"></div>

        {/* content */}
        <div className="-mt-[9.375rem] sm:-mt-[12.5rem] w-[87.2%] max-w-[33.75rem] mx-auto pb-10  ">
          {/* title + light/dark mode */}
          <div className=" flex justify-between items-center pb-4 sm:pb-8 transition-all ">
            <h1 className=" uppercase font-medium text-3xl sm:text-5xl">
              Todo
            </h1>
            <ThemeButton />
          </div>

          {/* children */}
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
