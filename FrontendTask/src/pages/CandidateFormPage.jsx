import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code2,
  FileText,
  GraduationCap,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import CandidateFormSteps from "../components/form/CandidateFormSteps";
import {
  createEmptyCandidate,
  createId,
  formSteps,
  STORAGE_KEYS,
} from "../data/candidate";
import { useCandidateForm } from "../hooks/useCandidateForm";
import { useCandidates } from "../hooks/useCandidates";
import { readStorage } from "../utils/storage";

const stepIcons = [
  UserRound,
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Code2,
  FileText,
];

export default function CandidateFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCandidate, saveCandidate } = useCandidates();
  const savedCandidate = id ? getCandidate(id) : null;
  const initialCandidate = id
    ? savedCandidate || createEmptyCandidate()
    : readStorage(STORAGE_KEYS.draft, createEmptyCandidate());
  const form = useCandidateForm(initialCandidate);

  if (id && !savedCandidate) return <Navigate to="/candidates" replace />;

  const submit = () => {
    const candidate = {
      ...form.candidate,
      id: form.candidate.id || createId(),
      updatedAt: new Date().toISOString(),
    };
    saveCandidate(candidate);
    localStorage.removeItem(STORAGE_KEYS.draft);
    navigate(`/candidates/${candidate.id}`);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f2f6f3_0%,#f7f8f6_45%,#f7f8f6_100%)] dark:bg-[linear-gradient(180deg,#0b1512_0%,#0f1b17_45%,#0b1512_100%)]">
      <div className="sticky top-[92px] z-20 mx-auto mt-5 block max-w-[980px] rounded-2xl border border-[#dfe6e2] bg-white/95 px-5 shadow-[0_8px_30px_rgba(20,62,50,0.08)] backdrop-blur max-[560px]:hidden dark:border-[#30443b] dark:bg-[#15241f]/95 dark:shadow-[0_8px_35px_rgba(0,0,0,0.25)]">
        <nav
          className="mx-auto grid max-w-[900px] grid-cols-6 py-4"
          aria-label="Form progress"
        >
          {formSteps.map((item, index) => {
            const Icon = stepIcons[index];
            const isActive = index === form.step;
            const isDone = index < form.step;
            return (
              <button
                type="button"
                key={item.key}
                className={`group relative flex flex-col items-center gap-2 text-center ${isActive ? "text-brand" : isDone ? "text-[#397764]" : "text-[#9ba7a2]"}`}
                onClick={() => index <= form.step && form.setStep(index)}
              >
                {index < formSteps.length - 1 && (
                  <span
                    className={`absolute top-[18px] left-[calc(50%+24px)] h-px w-[calc(100%-48px)] ${isDone ? "bg-[#6cae98]" : "bg-[#dbe4df]"}`}
                  />
                )}
                <i
                  className={`relative z-10 grid size-9 place-items-center rounded-full border-2 not-italic transition ${
                    isActive
                      ? "border-brand bg-brand text-white shadow-[0_0_0_5px_rgba(22,79,63,0.1)]"
                      : isDone
                        ? "border-[#5d9f89] bg-[#e2f1eb] text-[#32745e]"
                        : "border-[#d6e0db] bg-white text-[#9ba7a2] dark:border-[#3b5047] dark:bg-[#172720] dark:text-[#83968e]"
                  }`}
                >
                  {isDone ? <Check size={16} /> : <Icon size={16} />}
                </i>
                <span
                  className={`text-[11px] font-bold ${isActive ? "text-brand" : ""}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sticky top-[66px] z-30 hidden border-b border-[#dce5e0] bg-white px-2 py-3 shadow-md max-[560px]:block dark:border-[#30443b] dark:bg-[#13211d]">
        <nav className="grid grid-cols-6" aria-label="Mobile form progress">
          {formSteps.map((item, index) => {
            const Icon = stepIcons[index];
            const isActive = index === form.step;
            const isDone = index < form.step;
            return (
              <button
                type="button"
                key={item.key}
                className={`relative flex flex-col items-center gap-1.5 ${isActive ? "text-brand" : isDone ? "text-[#397764]" : "text-[#9ba7a2]"}`}
                onClick={() => index <= form.step && form.setStep(index)}
                aria-label={item.label}
              >
                {index < formSteps.length - 1 && (
                  <span
                    className={`absolute top-[15px] left-[calc(50%+18px)] h-px w-[calc(100%-36px)] ${isDone ? "bg-[#6cae98]" : "bg-[#dbe4df]"}`}
                  />
                )}
                <i
                  className={`relative z-10 grid size-[30px] place-items-center rounded-full border-2 not-italic ${
                    isActive
                      ? "border-brand bg-brand text-white"
                      : isDone
                        ? "border-[#5d9f89] bg-[#e2f1eb] text-[#32745e]"
                      : "border-[#d6e0db] bg-white dark:border-[#3b5047] dark:bg-[#172720]"
                  }`}
                >
                  {isDone ? <Check size={14} /> : <Icon size={14} />}
                </i>
                <span className="max-w-[52px] truncate text-[8px] font-bold">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <main
        className={`mx-auto mt-8 mb-16 rounded-[22px] border border-[#dfe7e2] bg-white px-12 py-10 shadow-[0_18px_55px_rgba(24,67,53,0.08)] max-[560px]:mt-0 max-[560px]:mb-0 max-[560px]:rounded-none max-[560px]:border-0 max-[560px]:bg-transparent max-[560px]:px-[18px] max-[560px]:pt-9 max-[560px]:pb-8 max-[560px]:shadow-none dark:border-[#2d4037] dark:bg-[#101d19] dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)] max-[560px]:dark:bg-transparent ${form.step === 5 ? "max-w-[1060px]" : "max-w-[920px]"}`}
      >
        <CandidateFormSteps form={form} />
        <div className="mt-8 flex items-center justify-between border-t border-[#dce3df] pt-6 max-[560px]:sticky max-[560px]:bottom-0 max-[560px]:z-10 max-[560px]:-mx-[18px] max-[560px]:-mb-8 max-[560px]:bg-[#f7f8f6] max-[560px]:px-[18px] max-[560px]:py-4 dark:border-[#304139] max-[560px]:dark:bg-[#101d19]">
          <button
            className="btn-secondary max-sm:h-11 max-sm:px-3.5"
            disabled={form.step === 0}
            onClick={() => form.setStep((current) => current - 1)}
          >
            <ArrowLeft size={17} /> Back
          </button>
          {form.step < 5 ? (
            <button
              className="btn-primary max-sm:h-11 max-sm:px-3.5"
              onClick={form.goNext}
            >
              Continue <ArrowRight size={17} />
            </button>
          ) : (
            <button
              className="btn bg-coral text-white max-sm:h-11 max-sm:px-3.5"
              onClick={submit}
            >
              <Check size={17} /> Save profile
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
