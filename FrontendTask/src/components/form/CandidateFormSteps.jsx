import ResumePreview from "../profile/ResumePreview";
import {
  AddEntryButton,
  Checkbox,
  EntryCard,
  Field,
  StepHeader,
  TagEditor,
  TextArea,
} from "./FormControls";

const experienceTemplate = {
  company: "",
  title: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};
const educationTemplate = {
  institution: "",
  degree: "",
  field: "",
  startYear: "",
  endYear: "",
};
const projectTemplate = {
  name: "",
  description: "",
  technologies: "",
  link: "",
};

export default function CandidateFormSteps({ form }) {
  const {
    step,
    candidate,
    setCandidate,
    setBasic,
    setEntry,
    addEntry,
    removeEntry,
    errors,
  } = form;

  if (step === 0)
    return (
      <>
        <StepHeader
          eyebrow="Start with the essentials"
          title="Basic information"
          text="Tell us who you are and how employers can reach you."
        />
        <div className="grid grid-cols-2 gap-x-5 max-sm:grid-cols-1">
          <Field
            label="Full name"
            required
            placeholder="e.g. Aisha Sharma"
            value={candidate.basic.fullName}
            onChange={(event) => setBasic("fullName", event.target.value)}
            error={errors.fullName}
          />
          <Field
            label="Email address"
            required
            type="email"
            placeholder="aisha@example.com"
            value={candidate.basic.email}
            onChange={(event) => setBasic("email", event.target.value)}
            error={errors.email}
          />
          <Field
            label="Phone number"
            required
            type="tel"
            placeholder="+91 98765 43210"
            value={candidate.basic.phone}
            onChange={(event) => setBasic("phone", event.target.value)}
            error={errors.phone}
          />
          <Field
            label="Location"
            required
            placeholder="Bengaluru, India"
            value={candidate.basic.location}
            onChange={(event) => setBasic("location", event.target.value)}
            error={errors.location}
          />
          <Field
            label="LinkedIn profile"
            placeholder="linkedin.com/in/username"
            value={candidate.basic.linkedin}
            onChange={(event) => setBasic("linkedin", event.target.value)}
            error={errors.linkedin}
          />
          <Field
            label="Portfolio / GitHub"
            optional
            placeholder="github.com/username"
            value={candidate.basic.portfolio}
            onChange={(event) => setBasic("portfolio", event.target.value)}
          />
        </div>
        <TextArea
          label="Professional summary"
          required
          rows="5"
          maxLength="600"
          placeholder="Write a concise overview of your experience, strengths, and career goals..."
          value={candidate.basic.summary}
          onChange={(event) => setBasic("summary", event.target.value)}
          error={errors.summary}
          hint={`${candidate.basic.summary.length}/600 characters`}
        />
      </>
    );

  if (step === 1)
    return (
      <>
        <StepHeader
          eyebrow="Your career journey"
          title="Work experience"
          text="Add your relevant roles, starting with the most recent."
        />
        {candidate.experience.map((item, index) => (
          <EntryCard
            title={`Experience ${index + 1}`}
            index={index}
            key={index}
            canRemove={candidate.experience.length > 1}
            onRemove={() => removeEntry("experience", index)}
          >
            <div className="grid grid-cols-2 gap-x-5 max-sm:grid-cols-1">
              <Field
                label="Company name"
                required
                placeholder="Company name"
                value={item.company}
                onChange={(event) =>
                  setEntry("experience", index, "company", event.target.value)
                }
                error={errors[`company-${index}`]}
              />
              <Field
                label="Job title"
                required
                placeholder="e.g. Frontend Developer"
                value={item.title}
                onChange={(event) =>
                  setEntry("experience", index, "title", event.target.value)
                }
                error={errors[`title-${index}`]}
              />
              <Field
                label="Start date"
                required
                type="month"
                value={item.startDate}
                onChange={(event) =>
                  setEntry("experience", index, "startDate", event.target.value)
                }
                error={errors[`startDate-${index}`]}
              />
              <Field
                label="End date"
                type="month"
                disabled={item.current}
                value={item.endDate}
                onChange={(event) =>
                  setEntry("experience", index, "endDate", event.target.value)
                }
              />
            </div>
            <Checkbox
              checked={item.current}
              onChange={(event) =>
                setEntry("experience", index, "current", event.target.checked)
              }
            >
              I currently work here
            </Checkbox>
            <TextArea
              label="Role description"
              rows="4"
              placeholder="Describe your responsibilities, impact, and achievements..."
              value={item.description}
              onChange={(event) =>
                setEntry("experience", index, "description", event.target.value)
              }
            />
          </EntryCard>
        ))}
        <AddEntryButton
          onClick={() => addEntry("experience", experienceTemplate)}
        >
          Add another experience
        </AddEntryButton>
      </>
    );

  if (step === 2)
    return (
      <>
        <StepHeader
          eyebrow="Academic background"
          title="Education"
          text="Share your qualifications and areas of study."
        />
        {candidate.education.map((item, index) => (
          <EntryCard
            title={`Education ${index + 1}`}
            index={index}
            key={index}
            canRemove={candidate.education.length > 1}
            onRemove={() => removeEntry("education", index)}
          >
            <div className="grid grid-cols-2 gap-x-5 max-sm:grid-cols-1">
              <Field
                label="Institution"
                required
                placeholder="University or institution"
                value={item.institution}
                onChange={(event) =>
                  setEntry(
                    "education",
                    index,
                    "institution",
                    event.target.value,
                  )
                }
                error={errors[`institution-${index}`]}
              />
              <Field
                label="Degree"
                required
                placeholder="e.g. Bachelor of Technology"
                value={item.degree}
                onChange={(event) =>
                  setEntry("education", index, "degree", event.target.value)
                }
                error={errors[`degree-${index}`]}
              />
              <Field
                label="Field of study"
                placeholder="e.g. Computer Science"
                value={item.field}
                onChange={(event) =>
                  setEntry("education", index, "field", event.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-2.5">
                <Field
                  label="Start year"
                  type="number"
                  min="1950"
                  max="2035"
                  placeholder="2020"
                  value={item.startYear}
                  onChange={(event) =>
                    setEntry(
                      "education",
                      index,
                      "startYear",
                      event.target.value,
                    )
                  }
                />
                <Field
                  label="End year"
                  type="number"
                  min="1950"
                  max="2035"
                  placeholder="2024"
                  value={item.endYear}
                  onChange={(event) =>
                    setEntry("education", index, "endYear", event.target.value)
                  }
                />
              </div>
            </div>
          </EntryCard>
        ))}
        <AddEntryButton
          onClick={() => addEntry("education", educationTemplate)}
        >
          Add another education
        </AddEntryButton>
      </>
    );

  if (step === 3)
    return (
      <>
        <StepHeader
          eyebrow="What you do best"
          title="Skills & expertise"
          text="Add the tools, technologies, and strengths that define your work."
        />
        <div className="form-card">
          <TagEditor
            label="Your skills"
            required
            items={candidate.skills}
            onChange={(skills) =>
              setCandidate((current) => ({ ...current, skills }))
            }
            placeholder="Type a skill and press Enter"
            suggestions={[
              "React",
              "JavaScript",
              "Tailwind CSS",
              "Node.js",
              "Figma",
              "Communication",
              "Leadership",
            ]}
          />
          {errors.skills && <p className="mt-2 text-[11px] text-[#cf4c43]">{errors.skills}</p>}
        </div>
      </>
    );

  if (step === 4)
    return (
      <>
        <StepHeader
          eyebrow="Work worth sharing"
          title="Projects"
          text="Showcase projects that demonstrate your practical experience."
        />
        {candidate.projects.map((item, index) => (
          <EntryCard
            title={`Project ${index + 1}`}
            index={index}
            key={index}
            canRemove={candidate.projects.length > 1}
            onRemove={() => removeEntry("projects", index)}
          >
            <div className="grid grid-cols-2 gap-x-5 max-sm:grid-cols-1">
              <Field
                label="Project name"
                required
                placeholder="e.g. Analytics Dashboard"
                value={item.name}
                onChange={(event) =>
                  setEntry("projects", index, "name", event.target.value)
                }
                error={errors[`project-${index}`]}
              />
              <Field
                label="Technologies used"
                placeholder="React, Tailwind CSS, REST API"
                value={item.technologies}
                onChange={(event) =>
                  setEntry(
                    "projects",
                    index,
                    "technologies",
                    event.target.value,
                  )
                }
              />
            </div>
            <TextArea
              label="Description"
              rows="4"
              placeholder="What did you build, and what problem did it solve?"
              value={item.description}
              onChange={(event) =>
                setEntry("projects", index, "description", event.target.value)
              }
            />
            <Field
              label="Project link"
              optional
              placeholder="https://..."
              value={item.link}
              onChange={(event) =>
                setEntry("projects", index, "link", event.target.value)
              }
            />
          </EntryCard>
        ))}
        <AddEntryButton onClick={() => addEntry("projects", projectTemplate)}>
          Add another project
        </AddEntryButton>
      </>
    );

/*
              placeholder="e.g. English — Fluent"
*/
  return (
    <>
      <StepHeader
        eyebrow="Everything looks good"
        title="Review your profile"
        text="Check your information before saving. You can return to any section to make changes."
      />
      <ResumePreview candidate={candidate} />
    </>
  );
}
