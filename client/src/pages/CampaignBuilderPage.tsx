import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import RichTextEditor from '../components/email/RichTextEditor';
import type { CampaignFormData } from '../types/campaignBuilder';

const CampaignBuilderPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'content' | 'recipients' | 'review'>('details');
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    type: 'email_sequence',
    subject: '',
    body: '',
    recipients: [],
    steps: []
  });

  const availableVariables = [
    '{candidate_name}',
    '{company_name}',
    '{job_title}',
    '{hiring_manager}',
    '{years_experience}',
    '{skills}',
    '{current_company}'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    const steps: ('details' | 'content' | 'recipients' | 'review')[] = ['details', 'content', 'recipients', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const steps: ('details' | 'content' | 'recipients' | 'review')[] = ['details', 'content', 'recipients', 'review'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', formData);
    // Save to local storage or API
    localStorage.setItem('campaignDraft', JSON.stringify(formData));
    alert('Campaign saved as draft!');
  };

  const handleLaunchCampaign = () => {
    console.log('Launching campaign:', formData);
    // API call to launch campaign
    alert('Campaign launched successfully!');
    navigate('/email-campaigns');
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'details', label: 'Campaign Details' },
      { key: 'content', label: 'Email Content' },
      { key: 'recipients', label: 'Recipients' },
      { key: 'review', label: 'Review & Launch' }
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-8">
          {steps.map((stepItem, index) => (
            <div key={stepItem.key} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                step === stepItem.key
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : steps.indexOf(steps.find(s => s.key === step)!) > index
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 text-gray-500'
              }`}>
                {steps.indexOf(steps.find(s => s.key === step)!) > index ? '✓' : index + 1}
              </div>
              <span className={`ml-2 font-medium ${
                step === stepItem.key ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {stepItem.label}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  steps.indexOf(steps.find(s => s.key === step)!) > index 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 'details':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., React Developers Outreach Q1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'email_sequence')}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    formData.type === 'email_sequence'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold text-gray-900">Email Sequence</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Multi-step email campaigns with automated follow-ups
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'linkedin')}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    formData.type === 'linkedin'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="font-semibold text-gray-900">LinkedIn Campaign</div>
                  <div className="text-sm text-gray-600 mt-1">
                    LinkedIn connection requests and messages
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Subject *
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="e.g., Exciting opportunity at {company_name}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Content *
              </label>
              <RichTextEditor
                value={formData.body}
                onChange={(value) => handleInputChange('body', value)}
                placeholder="Write your email content here. You can use variables like {candidate_name} to personalize the message."
                variables={availableVariables}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Available Variables</h4>
              <div className="flex flex-wrap gap-2">
                {availableVariables.map(variable => (
                  <span key={variable} className="px-2 py-1 bg-white text-blue-700 text-sm rounded border border-blue-200">
                    {variable}
                  </span>
                ))}
              </div>
              <p className="text-blue-800 text-sm mt-2">
                These variables will be automatically replaced with candidate-specific information.
              </p>
            </div>
          </div>
        );

      case 'recipients':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Recipients
              </label>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <p className="text-gray-600 text-sm">
                  Recipient selection will be integrated with your candidate search results.
                  For now, this is a preview of the feature.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-600">React Developers</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">23</div>
                <div className="text-sm text-gray-600">Senior Level</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">68</div>
                <div className="text-sm text-gray-600">Total Candidates</div>
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Campaign Name:</span>
                  <span className="font-semibold">{formData.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold capitalize">{formData.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-semibold">{formData.subject}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Estimated Recipients:</span>
                  <span className="font-semibold">68 candidates</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preview</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="font-semibold text-gray-900 mb-2">Subject: {formData.subject}</div>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {formData.body || 'No content yet...'}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout 
      title="Create Campaign - SARAL AI" 
      description="Build and launch your candidate outreach campaigns"
    >
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="text-gray-600 mt-2">
              Build your candidate outreach campaign step by step
            </p>
          </div>

          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <div>
              {step !== 'details' && (
                <button
                  onClick={handlePrevious}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  ← Previous
                </button>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Save Draft
              </button>

              {step !== 'review' ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={handleLaunchCampaign}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  🚀 Launch Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignBuilderPage;