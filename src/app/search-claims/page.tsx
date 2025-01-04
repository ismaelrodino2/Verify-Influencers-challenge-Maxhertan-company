'use client';
import { useState } from 'react';

export default function SearchClaims() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('last-month');
  const [includeRevenue, setIncludeRevenue] = useState(true);
  const [verifyJournals, setVerifyJournals] = useState(true);

  return (
    <div className="min-h-screen bg-navy p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-8">
          <a href="/" className="text-primary hover:text-primary/90 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </a>
          <h1 className="text-3xl font-bold text-white">Research Tasks</h1>
        </div>

        {/* Main Content */}
        <div className="bg-navy-light rounded-lg p-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-xl font-semibold text-white">Research Configuration</h2>
            </div>

            {/* Research Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 border border-gray-700 rounded-lg bg-navy hover:bg-navy-light cursor-pointer">
                <h3 className="text-white font-medium mb-2">Specific Influencer</h3>
                <p className="text-gray-400 text-sm">Research a known health influencer by name</p>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg bg-navy hover:bg-navy-light cursor-pointer">
                <h3 className="text-white font-medium mb-2">Discover New</h3>
                <p className="text-gray-400 text-sm">Find and analyze new health influencers</p>
              </div>
            </div>

            {/* Time Range */}
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Time Range</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className={`p-2 rounded-lg border border-gray-700 text-sm ${selectedTimeRange === 'last-week' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-navy-light'}`}>
                  Last Week
                </button>
                <button className={`p-2 rounded-lg border border-gray-700 text-sm ${selectedTimeRange === 'last-month' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-navy-light'}`}>
                  Last Month
                </button>
                <button className={`p-2 rounded-lg border border-gray-700 text-sm ${selectedTimeRange === 'last-year' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-navy-light'}`}>
                  Last Year
                </button>
                <button className={`p-2 rounded-lg border border-gray-700 text-sm ${selectedTimeRange === 'all-time' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-navy-light'}`}>
                  All Time
                </button>
              </div>
            </div>

            {/* Influencer Name */}
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Influencer Name</label>
              <div className="relative">
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter influencer name"
                  className="w-full bg-navy border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Claims to Analyze */}
            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Claims to Analyze Per Influencer</label>
              <input
                type="number"
                defaultValue={50}
                className="w-full bg-navy border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-primary"
              />
              <p className="text-gray-400 text-sm mt-1">Recommended: 50-100 claims for comprehensive analysis</p>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Include Revenue Analysis</h4>
                  <p className="text-gray-400 text-sm">Analyze monetization methods and estimate earnings</p>
                </div>
                <button
                  onClick={() => setIncludeRevenue(!includeRevenue)}
                  className={`w-12 h-6 rounded-full transition-colors ${includeRevenue ? 'bg-primary' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${includeRevenue ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Verify with Scientific Journals</h4>
                  <p className="text-gray-400 text-sm">Cross-reference claims with scientific literature</p>
                </div>
                <button
                  onClick={() => setVerifyJournals(!verifyJournals)}
                  className={`w-12 h-6 rounded-full transition-colors ${verifyJournals ? 'bg-primary' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transform transition-transform ${verifyJournals ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Start Research Button */}
          <div className="flex justify-end">
            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Start Research
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 