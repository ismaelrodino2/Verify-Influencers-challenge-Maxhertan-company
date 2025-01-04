
export default function Home() {
  return (
    <div className="min-h-screen bg-navy p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Influencer Trust Leaderboard
        </h1>
        <p className="text-gray-400 mb-8">
          Real-time rankings of health influencers based on scientific accuracy, credibility, and transparency. Updated daily using AI-powered analysis.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-navy-light rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1,234</div>
                <div className="text-gray-400 text-sm">Active Influencers</div>
              </div>
            </div>
          </div>

          <div className="bg-navy-light rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">25,431</div>
                <div className="text-gray-400 text-sm">Claims Verified</div>
              </div>
            </div>
          </div>

          <div className="bg-navy-light rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">85.7%</div>
                <div className="text-gray-400 text-sm">Average Trust Score</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6">
          <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
            All
          </button>
          <button className="text-gray-400 hover:bg-navy-light px-4 py-2 rounded-full text-sm">
            Nutrition
          </button>
          <button className="text-gray-400 hover:bg-navy-light px-4 py-2 rounded-full text-sm">
            Fitness
          </button>
          <button className="text-gray-400 hover:bg-navy-light px-4 py-2 rounded-full text-sm">
            Medicine
          </button>
          <button className="text-gray-400 hover:bg-navy-light px-4 py-2 rounded-full text-sm">
            Mental Health
          </button>
        </div>

        {/* Table */}
        <div className="bg-navy-light rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-gray-700">
                <th className="text-left p-4">RANK</th>
                <th className="text-left p-4">INFLUENCER</th>
                <th className="text-left p-4">CATEGORY</th>
                <th className="text-left p-4">TRUST SCORE</th>
                <th className="text-left p-4">TREND</th>
                <th className="text-left p-4">FOLLOWERS</th>
                <th className="text-left p-4">VERIFIED CLAIMS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700 hover:bg-navy/50">
                <td className="p-4 text-gray-400">#1</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <span className="text-white">Dr. Peter Attia</span>
                  </div>
                </td>
                <td className="p-4 text-gray-400">Medicine</td>
                <td className="p-4">
                  <span className="text-success">94%</span>
                </td>
                <td className="p-4 text-success">↗</td>
                <td className="p-4 text-gray-400">1.2M+</td>
                <td className="p-4 text-gray-400">203</td>
              </tr>
              {/* Adicione mais linhas seguindo o mesmo padrão */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
