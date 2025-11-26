const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Add feature cards here */}
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Candidate Search</h3>
            <p className="text-gray-600">Find perfect candidates with natural language search</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📧</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Campaigns</h3>
            <p className="text-gray-600">Automated outreach and follow-up sequences</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-gray-600">Track campaign performance and candidate engagement</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage