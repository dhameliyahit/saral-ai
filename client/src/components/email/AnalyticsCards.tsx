// components/email/AnalyticsCards.tsx
import React from 'react';
import { FiSend, FiMail, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';

interface AnalyticsCardsProps {
  stats: {
    deliveryRate: number;
    openRate: number;
    replyRate: number;
    totalCampaigns: number;
  };
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Delivery Rate',
      value: `${stats.deliveryRate}%`,
      icon: FiSend,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: '+2.5%'
    },
    {
      title: 'Open Rate',
      value: `${stats.openRate}%`,
      icon: FiMail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+1.8%'
    },
    {
      title: 'Reply Rate',
      value: `${stats.replyRate}%`,
      icon: FiMessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: '+3.2%'
    },
    {
      title: 'Total Campaigns',
      value: stats.totalCampaigns.toString(),
      icon: FiTrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      trend: '+5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{card.value}</p>
              <p className="text-sm text-green-600 font-medium mt-1">{card.trend}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.bgColor}`}>
              <card.icon className={`text-2xl ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsCards;