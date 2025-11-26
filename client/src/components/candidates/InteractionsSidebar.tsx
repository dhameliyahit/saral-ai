import React from "react";
import { FaThumbsUp, FaThumbsDown, FaStar, FaUserAlt } from "react-icons/fa";
import type { Candidate } from "../../types/candidate";

interface InteractionsSidebarProps {
  liked: Candidate[];
  disliked: Candidate[];
  shortlisted: Candidate[];
  onSelect: (candidate: Candidate) => void;
}

const Section = ({
  icon: Icon,
  title,
  candidates,
  onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  candidates: Candidate[];
  onSelect: (candidate: Candidate) => void;
}) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow p-3 space-y-3">
    <div className="flex items-center space-x-2">
      <Icon className="text-blue-600 text-lg" />
      <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
        {title} ({candidates.length})
      </h4>
    </div>

    {candidates.length === 0 ? (
      <p className="text-xs text-gray-500 flex items-center space-x-2">
        <FaUserAlt className="text-gray-300" />
        <span>No candidates</span>
      </p>
    ) : (
      <ul className="space-y-1 max-h-60 overflow-y-auto scrollbar-thin">
        {candidates.map((candidate) => (
          <li
            key={candidate._id || candidate.id}
            onClick={() => onSelect(candidate)}
            className="p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition cursor-pointer group"
          >
            <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700 truncate">
              {candidate.name}
            </p>
            {candidate.jobTitle && (
              <p className="text-[11px] text-gray-500 truncate">{candidate.jobTitle}</p>
            )}
            {candidate.experience && (
              <p className="text-[10px] text-gray-400 truncate">
                Experience: {candidate.experience} yrs
              </p>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const InteractionsSidebar: React.FC<InteractionsSidebarProps> = ({
  liked,
  disliked,
  shortlisted,
  onSelect,
}) => {
  return (
    <aside className="w-full lg:w-72 fixed lg:sticky lg:top-24 right-2 space-y-4 z-40">
      <Section icon={FaStar} title="Shortlisted" candidates={shortlisted} onSelect={onSelect} />
      <Section icon={FaThumbsUp} title="Liked" candidates={liked} onSelect={onSelect} />
      <Section icon={FaThumbsDown} title="Not a fit" candidates={disliked} onSelect={onSelect} />
    </aside>
  );
};

export default InteractionsSidebar;
