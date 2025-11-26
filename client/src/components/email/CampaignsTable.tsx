// components/email/CampaignsTable.tsx
import React from 'react';
import { FiPlay, FiPause, FiEdit, FiTrash2, FiBarChart2 } from 'react-icons/fi';
import type { EmailCampaign } from '../../types/emailCampaign';

interface CampaignsTableProps {
  campaigns: EmailCampaign[];
  onEdit: (campaign: EmailCampaign) => void;
  onDelete: (campaignId: string) => void;
  onToggleStatus: (campaignId: string, newStatus: 'active' | 'paused') => void;
  onViewAnalytics: (campaign: EmailCampaign) => void;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaigns,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewAnalytics
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', label: 'Draft' },
      active: { color: 'bg-green-100 text-green-800', label: 'Active' },
      paused: { color: 'bg-yellow-100 text-yellow-800', label: 'Paused' },
      completed: { color: 'bg-blue-100 text-blue-800', label: 'Completed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'linkedin' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-purple-100 text-purple-800'
      }`}>
        {type === 'linkedin' ? 'LinkedIn' : 'Email Sequence'}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent/Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Replies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.subject}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getTypeBadge(campaign.type)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(campaign.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {campaign.sentCount}/{campaign.totalRecipients}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(campaign.sentCount / campaign.totalRecipients) * 100}%` }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{campaign.repliedCount}</div>
                  <div className="text-sm text-gray-500">{campaign.replyRate}% rate</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewAnalytics(campaign)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="View Analytics"
                    >
                      <FiBarChart2 className="text-lg" />
                    </button>
                    
                    {campaign.status === 'active' ? (
                      <button
                        onClick={() => onToggleStatus(campaign.id, 'paused')}
                        className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                        title="Pause Campaign"
                      >
                        <FiPause className="text-lg" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onToggleStatus(campaign.id, 'active')}
                        className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                        title="Start Campaign"
                      >
                        <FiPlay className="text-lg" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => onEdit(campaign)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                      title="Edit Campaign"
                    >
                      <FiEdit className="text-lg" />
                    </button>
                    
                    <button
                      onClick={() => onDelete(campaign.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete Campaign"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;