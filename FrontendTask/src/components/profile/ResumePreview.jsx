import { Link as LinkIcon, Mail, MapPin, Phone } from "lucide-react";
import { candidateInitials, formatDate, safeUrl } from "../../utils/formatters";

const linkClass =
  "mt-2 flex items-center gap-1.5 text-xs font-bold text-[#27725b] dark:text-[#71caa8]";

function Section({ title, children }) {
  return (
    <section className="mb-7">
      <h2 className="resume-title">{title}</h2>
      {children}
    </section>
  );
}

function ResumeItem({ title, subtitle, date, description, link }) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between gap-3">
        <h3 className="text-[15px] font-bold dark:text-[#edf5f1]">{title || "Untitled"}</h3>
        {date && (
          <time className="whitespace-nowrap text-[11px] font-medium text-[#84908b] dark:text-[#94a79f]">
            {date}
          </time>
        )}
      </div>
      {subtitle && (
        <h4 className="my-1 font-sans text-[13px] font-semibold text-[#39705f] dark:text-[#70c4a3]">
          {subtitle}
        </h4>
      )}
      {description && (
        <p className="whitespace-pre-line text-[13px] leading-[1.7] text-[#5f6d68] dark:text-[#b5c5be]">
          {description}
        </p>
      )}
      {link && (
        <a
          className={linkClass}
          href={safeUrl(link)}
          target="_blank"
          rel="noreferrer"
        >
          <LinkIcon size={12} /> View project
        </a>
      )}
    </div>
  );
}

export default function ResumePreview({ candidate }) {
  const {
    basic,
    experience,
    education,
    skills,
    projects,
  } = candidate;
  const visibleExperience = experience.filter(
    (item) => item.company || item.title,
  );
  const visibleEducation = education.filter(
    (item) => item.institution || item.degree,
  );
  const visibleProjects = projects.filter((item) => item.name);

  return (
    <article className="overflow-hidden rounded-md border border-[#e4e8e5] bg-white text-[#22302b] shadow-[0_15px_45px_rgba(29,55,46,0.12)] dark:border-[#304139] dark:bg-[#101d19] dark:text-[#edf5f1] dark:shadow-[0_18px_55px_rgba(0,0,0,0.3)]">
      <header className="flex items-center gap-5 bg-[#173f35] px-10 py-9 text-white max-sm:items-start max-sm:px-[22px] max-sm:py-6 max-[400px]:block dark:bg-[#153c32]">
        <div className="grid size-[68px] shrink-0 place-items-center rounded-[18px] bg-linear-to-br from-[#e8aa92] to-[#d96e54] font-heading text-xl font-extrabold max-sm:size-[53px] max-sm:rounded-[14px] max-sm:text-base">
          {candidateInitials(basic.fullName)}
        </div>
        <div className="max-[400px]:mt-4">
          <h1 className="text-[30px] font-bold tracking-[-0.7px] max-sm:text-[25px]">
            {basic.fullName || "Your name"}
          </h1>
          <p className="mt-1 text-sm text-[#aad0c2]">
            {experience[0]?.title || "Professional title"}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 max-sm:gap-2">
            {basic.email && (
              <span className="flex items-center gap-1.5 text-xs text-[#c6dcd4]">
                <Mail size={14} />
                {basic.email}
              </span>
            )}
            {basic.phone && (
              <span className="flex items-center gap-1.5 text-xs text-[#c6dcd4]">
                <Phone size={14} />
                {basic.phone}
              </span>
            )}
            {basic.location && (
              <span className="flex items-center gap-1.5 text-xs text-[#c6dcd4]">
                <MapPin size={14} />
                {basic.location}
              </span>
            )}
          </div>
        </div>
      </header>
      <div className="grid min-h-[450px] grid-cols-[2fr_1fr] max-sm:grid-cols-1">
        <main className="px-[38px] py-9 max-sm:px-[22px] max-sm:py-7">
          {basic.summary && (
            <Section title="Profile">
              <p className="whitespace-pre-line text-[13px] leading-[1.75] text-[#5f6d68] dark:text-[#b5c5be]">
                {basic.summary}
              </p>
            </Section>
          )}
          {!!visibleExperience.length && (
            <Section title="Experience">
              {visibleExperience.map((item, index) => (
                <ResumeItem
                  key={index}
                  title={item.title}
                  subtitle={item.company}
                  date={`${formatDate(item.startDate)} — ${item.current ? "Present" : formatDate(item.endDate)}`}
                  description={item.description}
                />
              ))}
            </Section>
          )}
          {!!visibleProjects.length && (
            <Section title="Selected projects">
              {visibleProjects.map((item, index) => (
                <ResumeItem
                  key={index}
                  title={item.name}
                  subtitle={item.technologies}
                  description={item.description}
                  link={item.link}
                />
              ))}
            </Section>
          )}
        </main>
        <aside className="border-l border-[#e2e8e4] bg-[#f1f5f2] px-7 py-9 max-sm:border-t max-sm:border-l-0 max-sm:px-[22px] max-sm:py-7 dark:border-[#304139] dark:bg-[#14231e]">
          {!!skills.length && (
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    className="rounded-md bg-[#dcebe5] px-2.5 py-1.5 text-[11px] font-semibold text-[#285e4e] dark:bg-[#24483b] dark:text-[#8bd5b8]"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          )}
          {!!visibleEducation.length && (
            <Section title="Education">
              {visibleEducation.map((item, index) => (
                <ResumeItem
                  key={index}
                  title={item.degree}
                  subtitle={`${item.institution}${item.field ? ` · ${item.field}` : ""}`}
                  date={[item.startYear, item.endYear]
                    .filter(Boolean)
                    .join(" — ")}
                />
              ))}
            </Section>
          )}
          {(basic.linkedin || basic.portfolio) && (
            <Section title="Links">
              {basic.linkedin && (
                <a
                  className={linkClass}
                  href={safeUrl(basic.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon size={13} /> LinkedIn profile
                </a>
              )}
              {basic.portfolio && (
                <a
                  className={linkClass}
                  href={safeUrl(basic.portfolio)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon size={13} /> Portfolio / GitHub
                </a>
              )}
            </Section>
          )}
        </aside>
      </div>
    </article>
  );
}
