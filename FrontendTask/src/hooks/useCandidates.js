import { createContext, useContext } from "react";

export const CandidatesContext = createContext(null);

export function useCandidates() {
  const context = useContext(CandidatesContext);
  if (!context)
    throw new Error("useCandidates must be used inside CandidatesProvider");
  return context;
}
