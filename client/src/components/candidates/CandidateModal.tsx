// components/candidates/CandidateModal.tsx
import React from 'react';
import { FiX, FiMail, FiPhone, FiBriefcase, FiLock, FiStar, FiShare2 } from 'react-icons/fi';
import type { CandidateDetail } from '../../types/candidate';

interface CandidateModalProps {
  candidate: CandidateDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onUnlockContact: (candidateId: string) => void;
}

const CandidateModal: React.FC<CandidateModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onUnlockContact
}) => {
  if (!isOpen || !candidate) return null;

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={candidate.photoUrl} 
                  alt={candidate.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                  <p className="text-gray-600">{candidate.jobTitle}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`px-4 py-2 rounded-full border-2 font-bold text-lg ${getMatchColor(candidate.matchPercentage)}`}>
                  {candidate.matchPercentage}% Match
                </div>
                <button
                  onClick={onClose}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <FiX className="text-2xl text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* AI Verdict Banner */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-y border-blue-200 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900">AI Verdict</h4>
                <p className="text-blue-800 text-sm">
                  {candidate.aiVerdict || 'AI verdict not provided for this profile yet.'}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Strengths & Areas to Probe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                  <FiStar className="text-green-600" />
                  <span>Strengths</span>
                </h3>
                {candidate.strengths && candidate.strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {candidate.strengths.map((strength, index) => (
                      <li key={index} className="flex items-center space-x-2 text-green-800">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-800 text-sm">No strengths shared yet.</p>
                )}
              </div>

              <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
                  <FiBriefcase className="text-yellow-600" />
                  <span>Areas to Probe</span>
                </h3>
                {candidate.areasToProbe && candidate.areasToProbe.length > 0 ? (
                  <ul className="space-y-2">
                    {candidate.areasToProbe.map((area, index) => (
                      <li key={index} className="flex items-center space-x-2 text-yellow-800">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-yellow-800 text-sm">No probe areas suggested.</p>
                )}
              </div>
            </div>

            {/* Career Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Timeline</h3>
              {candidate.careerTimeline && candidate.careerTimeline.length > 0 ? (
                <div className="space-y-4">
                  {candidate.careerTimeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2" />
                      <div className="grow">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900">{item.role}</h4>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-gray-600">{item.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Career timeline data will appear once available.</p>
              )}
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h3>
              {candidate.workExperience && candidate.workExperience.length > 0 ? (
                <div className="space-y-6">
                  {candidate.workExperience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
                      <p className="text-gray-600">{exp.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Add experience notes to enrich this profile.</p>
              )}
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed">
                {candidate.about || 'A detailed summary will appear after the AI generates insights.'}
              </p>
            </div>

            {/* Contact Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              {candidate.isContactUnlocked ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FiMail className="text-gray-600" />
                    <span className="text-gray-900">{candidate.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FiPhone className="text-gray-600" />
                    <span className="text-gray-900">{candidate.phone}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-linear-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                  <FiLock className="text-4xl text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Unlock Contact Information
                  </h4>
                  <p className="text-gray-600 mb-4 max-w-md mx-auto">
                    Use 1 credit to unlock this candidate's contact details and reach out directly.
                  </p>
                  <button
                    onClick={() => onUnlockContact(candidate.id)}
                    className="bg-linear-to-r cursor-pointer from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg font-medium"
                  >
                    Unlock Contact - 1 Credit
                  </button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="flex cursor-pointer items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <FiShare2 />
                  <span>Share Profile</span>
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button className="px-6 cursor-pointer py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Download CV
                </button>
                <button className="px-6 cursor-pointer py-2 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium">
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;