import React, { useState } from 'react';
import { Problem } from '../types/problem';
import { CircleCheck, CircleX, Clock, Play } from 'lucide-react';

type TestRunnerProps = {
  problem: Problem;
  userCode: string;
  onTestSuccess: () => void;
};

type TestResult = {
  passed: boolean;
  output?: string;
  expected?: string;
  error?: string;
  executionTime?: number;
};

export const TestRunner: React.FC<TestRunnerProps> = ({ problem, userCode, onTestSuccess }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    setShowResults(true);
    
    // Simulate test execution (in a real app, we'd actually evaluate the code)
    const mockResults: TestResult[] = [];
    
    for (const example of problem.examples) {
      // Artificial delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
      
      // For this MVP, we'll do a very simple evaluation
      // This is just for demonstration - real evaluation would be more complex
      try {
        // In a real app, we'd actually execute the code with the example input
        // Here we just do some simple checks to simulate code execution
        
        // Check if code contains basic patterns relevant to the problem
        const passed = simulateCodeExecution(userCode, problem.id,);
        
        mockResults.push({
          passed,
          output: passed ? example.output : "Wrong output",
          expected: example.output,
          executionTime: Math.floor(Math.random() * 50) + 10
        });
      } catch (error) {
        mockResults.push({
          passed: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          expected: example.output
        });
      }
    }
    
    setResults(mockResults);
    setIsRunning(false);
    
    // Check if all tests passed
    const allTestsPassed = mockResults.every(result => result.passed);
    if (allTestsPassed) {
      onTestSuccess();
    }
  };

  return (
    <div className="p-4 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold">Test Cases</h2>
        <button
          onClick={runTests}
          disabled={isRunning}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            isRunning 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-[#2cbb5d] hover:bg-[#28a754] text-white'
          }`}
        >
          <Play size={16} />
          Run Code
        </button>
      </div>
      
      {showResults && (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-50 p-3 font-medium border-b">
            Test Results
          </div>
          <div className="divide-y">
            {isRunning ? (
              <div className="p-4 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>Running tests...</span>
              </div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CircleCheck size={18} className="text-green-500" />
                    ) : (
                      <CircleX size={18} className="text-red-500" />
                    )}
                    <span className="font-medium">Test Case {index + 1}</span>
                    {result.executionTime && (
                      <span className="text-xs text-gray-500 ml-auto flex items-center gap-1">
                        <Clock size={12} />
                        {result.executionTime} ms
                      </span>
                    )}
                  </div>
                  
                  {result.error ? (
                    <div className="bg-red-50 text-red-800 p-2 rounded text-sm font-mono">
                      Error: {result.error}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Your Output:</div>
                        <div className="bg-gray-50 p-2 rounded font-mono">{result.output}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Expected:</div>
                        <div className="bg-gray-50 p-2 rounded font-mono">{result.expected}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// This is a very simple simulation for the MVP
function simulateCodeExecution(code: string, problemId: string,): boolean {
  const cleanCode = code.toLowerCase();
  
  // These are very simplified checks just for demonstration purposes
  switch (problemId) {
    case 'two-sum':
      return cleanCode.includes('return') && cleanCode.includes('for') && 
             cleanCode.includes('if') && cleanCode.includes('+');
             
    case 'palindrome':
      return cleanCode.includes('reverse') || 
             (cleanCode.includes('for') && cleanCode.includes('length'));
             
    case 'fizzbuzz':
      return cleanCode.includes('fizz') && cleanCode.includes('buzz') && 
             (cleanCode.includes('for') || cleanCode.includes('while'));
             
    case 'merge-sorted':
      return cleanCode.includes('while') && cleanCode.includes('push') && 
             cleanCode.includes('length');
             
    case 'reverse-string':
      return cleanCode.includes('reverse') || cleanCode.includes('join') || 
             (cleanCode.includes('for') && cleanCode.includes('length'));
             
    default:
      return Math.random() > 0.5; // Random result for any other problems
  }
}
