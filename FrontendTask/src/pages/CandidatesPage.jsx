import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCandidates } from "../hooks/useCandidates";
import { candidateInitials } from "../utils/formatters";

function CandidateCard({ candidate, onDelete }) {
  const navigate = useNavigate();
  return (
    <article
      className="cursor-pointer rounded-[15px] border border-[#dfe5e1] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#a9cbbf] dark:border-[#34433d] dark:bg-[#202c27]"
      onClick={() => navigate(`/candidates/${candidate.id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="grid size-12 place-items-center rounded-2xl bg-linear-to-br from-[#e8aa92] to-[#d96e54] font-heading text-[15px] font-extrabold text-white">
          {candidateInitials(candidate.basic.fullName)}
        </div>
        <div className="flex gap-1">
          <button
            className="grid size-8 place-items-center rounded-lg text-[#94a09a] hover:bg-[#edf3ef] hover:text-brand"
            onClick={(event) => {
              event.stopPropagation();
              navigate(`/candidates/${candidate.id}/edit`);
            }}
          >
            <Pencil size={16} />
          </button>
          <button
            className="grid size-[33px] place-items-center rounded-lg text-[#94a09a] hover:bg-[#edf3ef] hover:text-brand"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(candidate);
            }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <h3 className="mt-5 text-[19px] font-bold">{candidate.basic.fullName}</h3>
      <p className="mt-1 text-sm">
        {candidate.experience[0]?.title || "Candidate"}{" "}
        {candidate.experience[0]?.company && (
          <span className="text-[#6f7b76]">
            at {candidate.experience[0].company}
          </span>
        )}
      </p>
      <div className="my-4.5 grid gap-2 border-y border-[#dfe5e1] py-4">
        {candidate.basic.location && (
          <span className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#6f7b76]">
            <MapPin size={14} />
            {candidate.basic.location}
          </span>
        )}
        {candidate.basic.email && (
          <span className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] text-[#6f7b76]">
            <Mail size={14} />
            {candidate.basic.email}
          </span>
        )}
      </div>
      <div className="flex min-h-6 flex-wrap gap-1.5">
        {candidate.skills.slice(0, 3).map((skill) => (
          <span
            className="rounded-md bg-[#edf4f0] px-2 py-1 text-[11px] font-bold text-[#35715f]"
            key={skill}
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 3 && (
          <span className="rounded-md bg-[#edf4f0] px-2 py-1 text-[11px] font-bold text-[#35715f]">
            +{candidate.skills.length - 3}
          </span>
        )}
      </div>
      <button className="flex items-center gap-1.5 border-0 bg-transparent pt-5 text-[13px] font-bold text-brand-light">
        View full profile <ArrowRight size={16} />
      </button>
    </article>
  );
}

export default function CandidatesPage() {
  const { candidates, deleteCandidate } = useCandidates();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const filtered = useMemo(
    () =>
      candidates.filter((candidate) =>
        `${candidate.basic.fullName} ${candidate.basic.email} ${candidate.basic.location} ${candidate.skills.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [candidates, query],
  );

  const confirmDelete = () => {
    deleteCandidate(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f7f4] dark:bg-[#15201c] dark:text-[#edf5f1]">
      <main className="flex-1">
        <section className="relative grid grid-cols-1 overflow-hidden bg-brand px-6 py-12 text-white sm:px-10 lg:grid-cols-2 lg:px-20 lg:py-16">
          <div className="relative z-10">
            <span className="mb-3 block text-xs font-extrabold uppercase tracking-widest text-[#77bba4]">
              Talent workspace
            </span>

            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Great people.
              <br />
              <em className="font-serif font-normal text-[#f0a48d]">
                Beautifully presented.
              </em>
            </h1>

            <p className="mt-5 w-full leading-7 text-[#bed3cb] lg:w-2/3">
              Create polished candidate profiles, keep every detail organized,
              and find the right person faster.
            </p>

            <button
              className="btn mt-7 bg-white text-brand"
              onClick={() => navigate("/candidates/new")}
            >
              <Plus size={18} />
              Create candidate
            </button>
          </div>

          <div
            className="relative z-10 hidden min-h-64 sm:block"
            aria-hidden="true"
          >
            <div className="absolute top-8 left-4 flex w-48 -rotate-3 items-center gap-3 rounded-xl bg-white p-3.5 text-[#21352e] shadow-2xl">
              <span className="grid size-10 place-items-center rounded-lg bg-[#fff2bd] text-xs font-extrabold">
                JS
              </span>

              <div className="grid">
                <b>JavaScript</b>
                <small className="text-[#89938f]">Advanced skill</small>
              </div>

              <Check
                className="ml-auto rounded-full bg-[#2e8a6d] p-0.5 text-white"
                size={15}
              />
            </div>

            <div className="absolute top-12 left-1/2 grid size-40 -translate-x-1/2 place-items-center rounded-full border-8 border-white/10 bg-[#f4a68d]">
              <UserRound size={64} />
            </div>

            <div className="absolute right-4 bottom-8 flex w-48 rotate-3 items-center gap-3 rounded-xl bg-white p-3.5 text-[#21352e] shadow-2xl">
              <Sparkles className="text-coral" size={20} />

              <div className="grid">
                <b>Profile ready</b>
                <small className="text-[#89938f]">All sections complete</small>
              </div>
            </div>
          </div>
        </section>

        <section
          id="saved-candidates"
          className="w-full scroll-mt-[76px] px-4 pt-10 pb-16 sm:px-8 lg:px-16 lg:pt-14 lg:pb-20"
        >
          <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="mb-3 block text-xs font-extrabold uppercase tracking-widest text-[#77bba4]">
                Your talent pool
              </span>

              <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
                Saved candidates
                <b className="ml-2 rounded-full bg-mint px-2 py-1 font-sans text-xs font-semibold text-brand">
                  {candidates.length}
                </b>
              </h2>
            </div>

            <div className="flex h-12 w-full items-center gap-2 rounded-xl border border-[#dfe5e1] bg-white px-4 text-[#6f7b76] sm:w-96 dark:border-[#34433d] dark:bg-[#202c27]">
              <Search size={18} />

              <input
                className="w-full border-0 bg-transparent text-[#17231f] outline-none dark:text-white"
                aria-label="Search candidates"
                placeholder="Search by name, skill, or location..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </div>

          {!filtered.length ? (
            <div className="rounded-2xl border border-dashed border-[#bdcbc5] bg-white px-5 py-16 text-center dark:border-[#34433d] dark:bg-[#202c27]">
              <div className="mx-auto mb-5 grid size-16 place-items-center rounded-2xl bg-mint text-brand">
                <UserRound />
              </div>

              <h3 className="text-xl font-bold">
                {query
                  ? "No matching candidates"
                  : "Your candidate list is empty"}
              </h3>

              <p className="mt-2 mb-5 text-[#6f7b76]">
                {query
                  ? "Try a different name, skill, or location."
                  : "Create your first polished candidate profile to get started."}
              </p>

              {!query && (
                <button
                  className="btn-primary"
                  onClick={() => navigate("/candidates/new")}
                >
                  <Plus size={18} />
                  Create candidate
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#10241e]/55 px-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) =>
            event.target === event.currentTarget && setDeleteTarget(null)
          }
        >
          <section
            className="w-full rounded-2xl bg-white p-7 shadow-2xl sm:w-96 dark:bg-[#202c27]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <div className="mb-5 grid size-12 place-items-center rounded-xl bg-[#fff0ed] text-[#d9574d]">
              <Trash2 size={22} />
            </div>

            <h2 id="delete-title" className="text-xl font-bold">
              Delete candidate profile?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#6f7b76]">
              You’re about to delete{" "}
              <strong className="text-[#263a33] dark:text-white">
                {deleteTarget.basic.fullName}
              </strong>
              . This action cannot be undone.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                className="btn-secondary h-11"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>

              <button
                className="btn h-11 bg-[#d9574d] text-white hover:bg-[#c84840]"
                onClick={confirmDelete}
              >
                <Trash2 size={16} />
                Delete profile
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
