import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { STORAGE_KEYS } from "../data/candidate";
import { readStorage, writeStorage } from "../utils/storage";
import { CandidatesContext } from "../hooks/useCandidates";

export function CandidatesProvider({ children }) {
  const [candidates, setCandidates] = useState(() =>
    readStorage(STORAGE_KEYS.candidates, []),
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem(STORAGE_KEYS.theme) || "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const saveCandidate = (candidate) => {
    const exists = candidates.some((item) => item.id === candidate.id);
    const next = exists
      ? candidates.map((item) => (item.id === candidate.id ? candidate : item))
      : [candidate, ...candidates];
    writeStorage(STORAGE_KEYS.candidates, next);
    setCandidates(next);
    toast.success(
      exists ? "Profile updated successfully" : "Profile saved successfully",
    );
  };

  const deleteCandidate = (id) => {
    setCandidates((current) => {
      const next = current.filter((item) => item.id !== id);
      writeStorage(STORAGE_KEYS.candidates, next);
      return next;
    });
    toast.success("Candidate deleted successfully");
  };

  const getCandidate = (id) =>
    candidates.find((candidate) => candidate.id === id);

  const value = {
    candidates,
    theme,
    getCandidate,
    saveCandidate,
    deleteCandidate,
    toggleTheme: () =>
      setTheme((current) => (current === "light" ? "dark" : "light")),
  };

  return (
    <CandidatesContext.Provider value={value}>
      {children}
    </CandidatesContext.Provider>
  );
}
