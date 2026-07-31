import { CircleUserRound, LayoutDashboard, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useCandidates } from "../hooks/useCandidates";

export default function Header() {
  const { theme, toggleTheme } = useCandidates();

  return (
    <header className="sticky top-0 z-40 flex h-[76px] items-center justify-between border-b border-[#dfe5e1] bg-white px-[max(5vw,32px)] max-sm:h-[66px] max-sm:px-[18px] dark:border-[#34433d] dark:bg-[#202c27]">
      <Link
        className="flex items-center gap-2.5 font-heading text-[21px] max-[400px]:text-lg"
        to="/candidates"
      >
        <span className="grid size-[37px] place-items-center rounded-[10px] bg-brand text-white">
          <CircleUserRound />
        </span>
        <b>
          Profile<span className="text-coral">ly</span>
        </b>
      </Link>

      <nav className="flex items-center gap-2.5">
        <Link
          className="flex h-10 items-center gap-2 rounded-lg bg-mint px-3.5 text-sm font-bold text-brand max-sm:hidden dark:bg-[#294b3f] dark:text-[#b9ddcf]"
          to="/candidates#saved-candidates"
          onClick={() =>
            setTimeout(
              () =>
                document
                  .getElementById("saved-candidates")
                  ?.scrollIntoView({ behavior: "smooth" }),
              0,
            )
          }
        >
          <LayoutDashboard size={17} /> Candidates
        </Link>
        <button
          className="grid size-10 place-items-center rounded-[9px] border border-[#dfe5e1] text-[#6f7b76] max-[400px]:size-9 dark:border-[#34433d] dark:text-[#dce9e4]"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  );
}
