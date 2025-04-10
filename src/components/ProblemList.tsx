import React from 'react';
import { Problem } from '../types/problem';
import { CircleCheck, Circle, Lock } from 'lucide-react';

type ProblemListProps = {
  problems: Problem[];
  selectedProblemId: string | null;
  onSelectProblem: (id: string) => void;
  solvedProblems: string[];
  unlockedProblems: string[];
};

export const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  selectedProblemId,
  onSelectProblem,
  solvedProblems,
  unlockedProblems,
}) => {
  const isProblemSolved = (id: string) => solvedProblems.includes(id);
  const isProblemUnlocked = (id: string) => unlockedProblems.includes(id);

  return (
    <div className="py-4">
      <h2 className="px-4 mb-4 text-lg font-semibold">Problems</h2>
      <ul className="space-y-1">
        {problems.map((problem) => {
          const isLocked = !isProblemUnlocked(problem.id);
          const isSolved = isProblemSolved(problem.id);
          
          return (
            <li key={problem.id}>
              <button
                onClick={() => !isLocked && onSelectProblem(problem.id)}
                disabled={isLocked}
                className={`w-full text-left px-4 py-2 flex items-center gap-3
                  ${isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  ${selectedProblemId === problem.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}
                `}
              >
                {isSolved ? (
                  <CircleCheck size={18} className="text-green-500" />
                ) : isLocked ? (
                  <Lock size={18} className="text-gray-400" />
                ) : (
                  <Circle size={18} className="text-gray-300" />
                )}
                <div>
                  <span className={`block ${isSolved ? 'text-green-600' : ''}`}>
                    {problem.title}
                  </span>
                  <span className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-600';
    case 'medium':
      return 'text-yellow-600';
    case 'hard':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}
