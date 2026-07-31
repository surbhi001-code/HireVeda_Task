import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "../data/candidate";
import { writeStorage } from "../utils/storage";

export function useCandidateForm(initialCandidate) {
  const [candidate, setCandidate] = useState(initialCandidate);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [draftSaved, setDraftSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      writeStorage(STORAGE_KEYS.draft, candidate);
      setDraftSaved(true);
      window.setTimeout(() => setDraftSaved(false), 1400);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [candidate]);

  const setBasic = (key, value) => {
    setCandidate((current) => ({
      ...current,
      basic: { ...current.basic, [key]: value },
    }));
  };

  const setEntry = (group, index, key, value) => {
    setCandidate((current) => ({
      ...current,
      [group]: current[group].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }));
  };

  const addEntry = (group, template) => {
    setCandidate((current) => ({
      ...current,
      [group]: [...current[group], template],
    }));
  };

  const removeEntry = (group, index) => {
    setCandidate((current) => ({
      ...current,
      [group]: current[group].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const validate = () => {
    const next = {};
    if (step === 0) {
      if (!candidate.basic.fullName.trim())
        next.fullName = "Full name is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.basic.email))
        next.email = "Enter a valid email address";
      if (!candidate.basic.phone.trim())
        next.phone = "Phone number is required";
      else if (
        candidate.basic.phone.replace(/\D/g, "").length < 7 ||
        candidate.basic.phone.replace(/\D/g, "").length > 15
      )
        next.phone = "Enter a valid phone number (7–15 digits)";
      if (!candidate.basic.location.trim())
        next.location = "Location is required";
      if (candidate.basic.linkedin && !candidate.basic.linkedin.includes("."))
        next.linkedin = "Enter a valid profile URL";
      if (!candidate.basic.summary.trim())
        next.summary = "A short professional summary is required";
    }
    if (step === 1)
      candidate.experience.forEach((item, index) => {
        if (!item.company.trim())
          next[`company-${index}`] = "Company is required";
        if (!item.title.trim())
          next[`title-${index}`] = "Job title is required";
        if (!item.startDate)
          next[`startDate-${index}`] = "Start date is required";
      });
    if (step === 2)
      candidate.education.forEach((item, index) => {
        if (!item.institution.trim())
          next[`institution-${index}`] = "Institution is required";
        if (!item.degree.trim()) next[`degree-${index}`] = "Degree is required";
      });
    if (step === 3 && !candidate.skills.length)
      next.skills = "Add at least one skill";
    if (step === 4)
      candidate.projects.forEach((item, index) => {
        if (!item.name.trim())
          next[`project-${index}`] = "Project name is required";
      });
    setErrors(next);
    return !Object.keys(next).length;
  };

  const goNext = () => {
    if (!validate()) return;
    setStep((current) => Math.min(current + 1, 5));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    candidate,
    setCandidate,
    step,
    setStep,
    errors,
    draftSaved,
    setBasic,
    setEntry,
    addEntry,
    removeEntry,
    goNext,
  };
}
