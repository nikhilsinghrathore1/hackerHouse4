import React, { useState } from 'react';
import { Problem } from '../types/problem';
import { BookOpen, ChevronDown, ChevronUp, Code, MessageSquare } from 'lucide-react';

type ProblemViewerProps = {
  problem: Problem;
};

export const ProblemViewer: React.FC<ProblemViewerProps> = ({ problem }) => {
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    examples: true,
    constraints: true,
  });
  const [activeTab, setActiveTab] = useState<'description' | 'solution' | 'discussion'>('description');

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm ${
            activeTab === 'description'
              ? 'text-[#2cbb5d] border-b-2 border-[#2cbb5d]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen size={16} />
          Description
        </button>
        <button
          onClick={() => setActiveTab('solution')}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm ${
            activeTab === 'solution'
              ? 'text-[#2cbb5d] border-b-2 border-[#2cbb5d]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Code size={16} />
          Solution
        </button>
        <button
          onClick={() => setActiveTab('discussion')}
          className={`flex items-center gap-2 px-4 py-3 font-medium text-sm ${
            activeTab === 'discussion'
              ? 'text-[#2cbb5d] border-b-2 border-[#2cbb5d]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare size={16} />
          Discussion
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'description' && (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold">{problem.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 text-xs rounded ${getDifficultyBadgeColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6 border rounded-md overflow-hidden">
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection('description')}
              >
                <h2 className="font-semibold">Description</h2>
                {expandedSections.description ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.description && (
                <div className="p-4">
                  <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: problem.description }}
                  />
                </div>
              )}
            </div>

            {/* Examples Section */}
            <div className="mb-6 border rounded-md overflow-hidden">
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection('examples')}
              >
                <h2 className="font-semibold">Examples</h2>
                {expandedSections.examples ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.examples && (
                <div className="p-4">
                  {problem.examples.map((example, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <p className="font-semibold mb-2">Example {index + 1}:</p>
                      <div className="bg-gray-50 p-3 rounded-md mb-2">
                        <div className="mb-1"><strong>Input:</strong> {example.input}</div>
                        <div className="mb-1"><strong>Output:</strong> {example.output}</div>
                        {example.explanation && (
                          <div><strong>Explanation:</strong> {example.explanation}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Constraints Section */}
            <div className="mb-6 border rounded-md overflow-hidden">
              <div 
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection('constraints')}
              >
                <h2 className="font-semibold">Constraints</h2>
                {expandedSections.constraints ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              
              {expandedSections.constraints && (
                <div className="p-4">
                  <ul className="list-disc pl-5 space-y-1">
                    {problem.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'solution' && (
          <div className="p-4">
            <p className="text-gray-500">Official solutions will be available after you solve the problem.</p>
          </div>
        )}

        {activeTab === 'discussion' && (
          <div className="p-4">
            <p className="text-gray-500">Community discussions will be available in the full version.</p>
          </div>
        )}
      </div>
    </div>
  );
};

function getDifficultyBadgeColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
