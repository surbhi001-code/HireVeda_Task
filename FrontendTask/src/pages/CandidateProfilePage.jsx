import { useParams } from "react-router-dom";
import ResumePreview from "../components/profile/ResumePreview";
import { useCandidates } from "../hooks/useCandidates";

export default function CandidateProfilePage() {
  const { id } = useParams();
  const { getCandidate } = useCandidates();
  const candidate = getCandidate(id);

  return (
    <div className="min-h-screen bg-[#eef1ef] dark:bg-[#0b1512]">
      <div className="mx-auto max-w-[1040px] px-6 pt-7 pb-16 max-sm:px-3 max-sm:pt-5 max-sm:pb-11">
        
        <ResumePreview candidate={candidate} />
      </div>
    </div>
  );
}
