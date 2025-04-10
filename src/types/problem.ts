export type Example = {
  input: string;
  output: string;
  explanation?: string;
};

export type Problem = {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  examples: Example[];
  constraints: string[];
  defaultCode: string;
  codeLanguage?: string;
};
