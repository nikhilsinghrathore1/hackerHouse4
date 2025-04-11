import React, { useEffect, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import '../styles/prism.css';

type CodeEditorProps = {
  code: string;
  onChange: (code: string) => void;
  language: string;
};

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  code, 
  onChange,
  language = 'javascript'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Handle tab key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && editorRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        
        const textarea = document.querySelector('textarea');
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        onChange(code.substring(0, start) + '  ' + code.substring(end));
        
        // Set cursor position after the inserted tab
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }, 0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [code, onChange]);

  // Get the appropriate Prism language
  const getLanguage = () => {
    switch (language) {
      case 'python': return Prism.languages.python;
      case 'java': return Prism.languages.java;
      case 'c': return Prism.languages.c;
      case 'cpp': return Prism.languages.cpp;
      default: return Prism.languages.javascript;
    }
  };

  return (
    <div className="h-full flex flex-col" ref={editorRef}>
      <div className="bg-gray-100 p-2 border-b flex justify-between items-center">
        <span className="font-medium">Code</span>
        <select 
          className="px-2 py-1 border rounded bg-white text-sm"
          value={language}
          disabled // Disabled for MVP
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <div className="flex-1 overflow-auto bg-[#1e1e1e]">
        <Editor
          value={code}
          onValueChange={onChange}
          highlight={code => Prism.highlight(code, getLanguage(), language)}
          padding={16}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: '100%',
            color: '#d4d4d4',
            backgroundColor: '#1e1e1e'
          }}
          className="h-full"
        />
      </div>
    </div>
  );
};
