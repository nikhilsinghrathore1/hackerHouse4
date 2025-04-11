export const Problems = [
  {
    id: 'sqlite-select-basic',
    title: '1. Basic SELECT Query',
    difficulty: 'Easy',
    description: `
      <p>You are given a table <code>users</code>:</p>
      <pre>
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT,
  age INTEGER,
  city TEXT
);</pre>
      <p>Write a SQL query to fetch all columns for users who live in "Delhi".</p>
    `,
    examples: [
      {
        input: 'Table: users',
        output: `
SELECT * FROM users
WHERE city = 'Delhi';`
      }
    ],
    constraints: [
      'Use <code>SELECT</code> and <code>WHERE</code> clause.',
      'Only return users from Delhi.'
    ],
    defaultCode: `-- Your SQL query here`
  },

  {
    id: 'sqlite-select-columns',
    title: '2. Select Specific Columns',
    difficulty: 'Easy',
    description: `
      <p>You are given a table <code>employees</code>:</p>
      <pre>
CREATE TABLE employees (
  id TEXT,
  name TEXT,
  department TEXT,
  salary INTEGER
);</pre>
      <p>Write a SQL query to select only the <code>name</code> and <code>salary</code> of employees who work in the "Engineering" department.</p>
    `,
    examples: [
      {
        input: 'Table: employees',
        output: `
SELECT name, salary FROM employees
WHERE department = 'Engineering';`
      }
    ],
    constraints: [
      'Only select <code>name</code> and <code>salary</code>.',
      'Filter rows by <code>department = "Engineering"</code>.'
    ],
    defaultCode: `-- Your SQL query here`
  },

  {
    id: 'sqlite-order-by',
    title: '3. Order By Salary',
    difficulty: 'Medium',
    description: `
      <p>You are given a table <code>employees</code>:</p>
      <pre>
CREATE TABLE employees (
  id TEXT,
  name TEXT,
  department TEXT,
  salary INTEGER
);</pre>
      <p>Write a query to select all employees and order them by <code>salary</code> in descending order.</p>
    `,
    examples: [
      {
        input: 'Table: employees',
        output: `
SELECT * FROM employees
ORDER BY salary DESC;`
      }
    ],
    constraints: [
      'Use <code>ORDER BY</code> clause.',
      'Sort by <code>salary</code> in descending order.'
    ],
    defaultCode: `-- Your SQL query here`
  },

  {
    id: 'sqlite-count-group-by',
    title: '4. Group By and Count',
    difficulty: 'Medium',
    description: `
      <p>You are given a table <code>students</code>:</p>
      <pre>
CREATE TABLE students (
  id TEXT,
  name TEXT,
  department TEXT
);</pre>
      <p>Write a SQL query to count how many students are there in each department.</p>
    `,
    examples: [
      {
        input: 'Table: students',
        output: `
SELECT department, COUNT(*) AS total_students
FROM students
GROUP BY department;`
      }
    ],
    constraints: [
      'Use <code>GROUP BY</code> to group by department.',
      'Use <code>COUNT(*)</code> to get total students in each group.'
    ],
    defaultCode: `-- Your SQL query here`
  },

  {
    id: 'sqlite-join-query',
    title: '5. Join Two Tables',
    difficulty: 'Hard',
    description: `
      <p>You are given two tables:</p>
      <pre>
CREATE TABLE orders (
  id TEXT,
  user_id TEXT,
  amount INTEGER
);

CREATE TABLE users (
  id TEXT,
  name TEXT
);</pre>
      <p>Write a SQL query to return the user's <code>name</code> along with their <code>order amount</code>.</p>
    `,
    examples: [
      {
        input: 'Tables: orders, users',
        output: `
SELECT users.name, orders.amount
FROM orders
JOIN users ON orders.user_id = users.id;`
      }
    ],
    constraints: [
      'Use <code>JOIN</code> to combine data from both tables.',
      'Select user <code>name</code> and <code>order amount</code>.'
    ],
    defaultCode: `-- Your SQL query here`
  }
];
