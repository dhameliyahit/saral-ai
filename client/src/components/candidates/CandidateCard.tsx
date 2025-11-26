import React from "react";
import {
  FiHeart,
  FiThumbsDown,
  FiStar,
  FiMapPin,
  FiBriefcase,
  FiClock,
} from "react-icons/fi";
import type { Candidate } from "../../types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onShortlist: (id: string) => void;
  onViewDetails: (candidate: Candidate) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
  candidate,
  onLike,
  onDislike,
  onShortlist,
  onViewDetails,
}) => {
  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getAvailabilityDot = (availability: string) => {
    switch (availability) {
      case "immediate":
      case "available":
        return "bg-green-500";
      case "2 weeks":
      case "notice":
        return "bg-yellow-500";
      case "1 month":
        return "bg-orange-500";
      case "unavailable":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div
      onClick={() => onViewDetails(candidate)}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden group"
    >
      {/* Header */}
      <div className="p-5 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-12 h-12 rounded-full object-cover shadow-md border border-gray-200"
              />
              <span
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${getAvailabilityDot(
                  candidate.availability
                )}`}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                {candidate.name}
              </h3>
              <p className="text-xs text-gray-500">{candidate.jobTitle}</p>
            </div>
          </div>

          <span
            className={`px-3 py-1 rounded-full border text-xs font-semibold ${getMatchColor(
              candidate.matchPercentage
            )}`}
          >
            {candidate.matchPercentage}% Match
          </span>
        </div>

        {/* Info row */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
          {candidate.currentCompany && (
            <div className="flex items-center space-x-1">
              <FiBriefcase className="text-gray-400" />
              <span>{candidate.currentCompany}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <FiClock className="text-gray-400" />
            <span>{candidate.experience} yrs exp</span>
          </div>
          {candidate.location && (
            <div className="flex items-center space-x-1">
              <FiMapPin className="text-gray-400" />
              <span>{candidate.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Skills */}
      <div className="px-5 pt-4">
        <div className="flex flex-wrap gap-2">
          {candidate.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg">
              +{candidate.skills.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 pt-4">
        <div className="flex items-center justify-between">
          {/* LIKE + DISLIKE */}
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike(candidate.id);
              }}
              aria-pressed={candidate.isLiked}
              className={`p-2 cursor-pointer rounded-lg border transition-all group/btn ${
                candidate.isLiked
                  ? "text-green-600 bg-green-50 border-green-200"
                  : "text-gray-400 hover:text-green-600 hover:bg-green-50 hover:border-green-200"
              }`}
            >
              <FiHeart className="transition-transform duration-200 group-hover/btn:scale-110" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDislike(candidate.id);
              }}
              aria-pressed={candidate.isDisliked}
              className={`p-2 cursor-pointer rounded-lg border transition-all group/btn ${
                candidate.isDisliked
                  ? "text-red-600 bg-red-50 border-red-200"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200"
              }`}
            >
              <FiThumbsDown className="transition-transform duration-200 group-hover/btn:scale-110" />
            </button>
          </div>

          {/* SHORTLIST */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShortlist(candidate.id);
            }}
            aria-pressed={candidate.isShortlisted}
            className={`flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-lg border transition-all group/btn ${
              candidate.isShortlisted
                ? "text-yellow-600 bg-yellow-50 border-yellow-200"
                : "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 hover:border-yellow-200"
            }`}
          >
            <FiStar className="transition-transform duration-200 group-hover/btn:scale-110" />
            <span className="text-xs font-medium">
              {candidate.isShortlisted ? "Shortlisted" : "Shortlist"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
