export const STORAGE_KEYS = {
  candidates: "hireveda_candidates",
  draft: "hireveda_candidate_draft",
  theme: "hireveda_theme",
};

export const createEmptyCandidate = () => ({
  id: "",
  basic: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    summary: "",
  },
  experience: [
    {
      company: "",
      title: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  education: [
    { institution: "", degree: "", field: "", startYear: "", endYear: "" },
  ],
  skills: [],
  projects: [{ name: "", description: "", technologies: "", link: "" }],
});

export const formSteps = [
  { key: "basic", label: "Basic info" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "review", label: "Review" },
];

export const createId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
