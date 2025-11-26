// pages/EmailCampaignsPage.tsx
import { useState } from 'react';
import Layout from '../components/Layout';
import AnalyticsCards from '../components/email/AnalyticsCards';
import CampaignsTable from '../components/email/CampaignsTable';
import { mockEmailCampaigns } from '../data/mockEmailCampaigns';
import type { EmailCampaign } from '../types/emailCampaign';
import { useNavigate } from 'react-router-dom';

const EmailCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(mockEmailCampaigns);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'email_sequences'>('email_sequences');
  const navigate = useNavigate();

    const handleCreateNewCampaign = () => {
    navigate('/campaign-builder');
  };


  // Calculate overall stats
  const overallStats = {
    deliveryRate: Math.round(campaigns.reduce((sum, camp) => sum + camp.deliveryRate, 0) / campaigns.length),
    openRate: Math.round(campaigns.reduce((sum, camp) => sum + camp.openRate, 0) / campaigns.length),
    replyRate: Math.round(campaigns.reduce((sum, camp) => sum + camp.replyRate, 0) / campaigns.length),
    totalCampaigns: campaigns.length
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    activeTab === 'linkedin' 
      ? campaign.type === 'linkedin'
      : campaign.type === 'email_sequence'
  );

  const handleEditCampaign = (campaign: EmailCampaign) => {
    console.log('Edit campaign:', campaign);
    // Navigate to campaign editor
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(prev => prev.filter(camp => camp.id !== campaignId));
    }
  };

  const handleToggleStatus = (campaignId: string, newStatus: 'active' | 'paused') => {
    setCampaigns(prev => prev.map(camp => 
      camp.id === campaignId 
        ? { ...camp, status: newStatus }
        : camp
    ));
  };

  const handleViewAnalytics = (campaign: EmailCampaign) => {
    console.log('View analytics for:', campaign);
    // Show detailed analytics modal
  };

  return (
    <Layout 
      title="Email Campaigns - SARAL AI" 
      description="Create and manage email campaigns for candidate outreach"
    >
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
              <p className="text-gray-600 mt-2">
                Create and manage your candidate outreach campaigns
              </p>
            </div>
            <button
              onClick={handleCreateNewCampaign}
              className="mt-4 lg:mt-0 bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg font-medium"
            >
              + Create New Campaign
            </button>
          </div>

          {/* Analytics Cards */}
          <AnalyticsCards stats={overallStats} />

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('email_sequences')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'email_sequences'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Email Sequences
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {campaigns.filter(c => c.type === 'email_sequence').length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('linkedin')}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'linkedin'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  LinkedIn Campaigns
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {campaigns.filter(c => c.type === 'linkedin').length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Campaigns Table */}
            <div className="p-6">
              {filteredCampaigns.length > 0 ? (
                <CampaignsTable
                  campaigns={filteredCampaigns}
                  onEdit={handleEditCampaign}
                  onDelete={handleDeleteCampaign}
                  onToggleStatus={handleToggleStatus}
                  onViewAnalytics={handleViewAnalytics}
                />
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📧</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No {activeTab === 'linkedin' ? 'LinkedIn' : 'Email'} Campaigns
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your first {activeTab === 'linkedin' ? 'LinkedIn' : 'email'} campaign to start reaching out to candidates.
                  </p>
                  <button
                    onClick={handleCreateNewCampaign}
                    className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium"
                  >
                    Create Your First Campaign
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Campaign Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Campaigns</span>
                  <span className="font-semibold">
                    {campaigns.filter(c => c.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Sent</span>
                  <span className="font-semibold">
                    {campaigns.reduce((sum, camp) => sum + camp.sentCount, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Replies</span>
                  <span className="font-semibold">
                    {campaigns.reduce((sum, camp) => sum + camp.repliedCount, 0)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Engagement Rates</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Average Open Rate</span>
                    <span className="font-semibold">{overallStats.openRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${overallStats.openRate}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Average Reply Rate</span>
                    <span className="font-semibold">{overallStats.replyRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${overallStats.replyRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h4>
              <div className="space-y-3">
                {campaigns
                  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                  .slice(0, 3)
                  .map(campaign => (
                    <div key={campaign.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{campaign.name}</p>
                        <p className="text-gray-500 text-xs">
                          Updated {new Date(campaign.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailCampaignsPage;