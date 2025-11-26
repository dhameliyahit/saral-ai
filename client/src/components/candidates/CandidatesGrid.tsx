// components/candidates/CandidatesGrid.tsx
import React, { memo } from "react";
import type { Candidate } from "../../types/candidate";
import CandidateCard from "./CandidateCard";

interface CandidatesGridProps {
  candidates: Candidate[];
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onShortlist: (id: string) => void;
  onViewDetails: (candidate: Candidate) => void;
  viewMode?: "grid" | "list";
}

const CandidatesGrid: React.FC<CandidatesGridProps> = ({
  candidates,
  onLike,
  onDislike,
  onShortlist,
  onViewDetails,
  viewMode = "grid",
}) => {
  const renderCard = (candidate: Candidate) => (
    <CandidateCard
      key={candidate.id || candidate._id}
      candidate={candidate}
      onLike={onLike}
      onDislike={onDislike}
      onShortlist={onShortlist}
      onViewDetails={onViewDetails}
    />
  );

  if (!candidates || candidates.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm py-10">
        No candidates found
      </p>
    );
  }

  return viewMode === "list" ? (
    <div className="space-y-4">
      {candidates.map(renderCard)}
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {candidates.map(renderCard)}
    </div>
  );
};

export default memo(CandidatesGrid);
