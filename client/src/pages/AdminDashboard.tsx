// pages/AdminDashboard.tsx
import { useState } from 'react';
import Layout from '../components/Layout';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'campaigns' | 'settings'>('overview');

  const stats = {
    totalUsers: 1247,
    activeCampaigns: 89,
    totalSearches: 3456,
    successRate: 76.8
  };

  return (
    <Layout title="Admin Dashboard - SARAL AI">
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your SARAL AI platform</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <span className="text-2xl">👥</span>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">+12% from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <span className="text-2xl">📧</span>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">+8% from last week</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Searches</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSearches}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <span className="text-2xl">🔍</span>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">+23% from last month</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.successRate}%</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <p className="text-sm text-green-600 mt-2">+5% from last month</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                {[
                  { key: 'overview', label: 'Overview' },
                  { key: 'users', label: 'User Management' },
                  { key: 'campaigns', label: 'Campaign Analytics' },
                  { key: 'settings', label: 'Platform Settings' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as 'overview' | 'users' | 'campaigns' | 'settings')}
                    className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Overview</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                      {/* Activity list will go here */}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">System Health</h4>
                      {/* System metrics will go here */}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                  <p className="text-gray-600">User management interface will be implemented here.</p>
                </div>
              )}

              {activeTab === 'campaigns' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Analytics</h3>
                  <p className="text-gray-600">Detailed campaign analytics will be shown here.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Settings</h3>
                  <p className="text-gray-600">Platform configuration settings will be available here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;