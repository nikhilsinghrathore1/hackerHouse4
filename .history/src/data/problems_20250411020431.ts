import { Problem } from '../types/problem';

export const problems: Problem[] = [
  {
    id: 'lua-handler-gen',
    title: '1. Frontend Handler for Lua Contract',
    difficulty: 'Easy',
    description: `
      <p>You are given a Lua smart contract handler written for the Arweave blockchain. Your task is to write a corresponding frontend function in JavaScript that interacts with this contract.</p>
      <p>The function should call the Lua contract with the appropriate inputs and parse the response.</p>
      <p><strong>Note:</strong> You may assume an API endpoint is available to send JSON requests to the Lua contract.</p>
    `,
    examples: [
      {
        input: `
Lua Contract:
function handle(state, action)
  if action.input.function == "greet" then
    return { result = "Hello " .. action.input.name }
  end
end`,
        output: `// JS Output
await sendToContract({ function: "greet", name: "Alice" }); // "Hello Alice"`
      }
    ],
    constraints: [
      'Use fetch or any other method to send a POST request to the contract endpoint.',
      'Your function should be asynchronous.',
      'Handle errors gracefully.'
    ],
    defaultCode: `/**
 * @param {string} name
 * @return {Promise<string>}
 */
async function greetUser(name) {
    // Your code here
};`
  },
  {
    id: 'lua-read-state',
    title: '2. Read State From Lua Contract',
    difficulty: 'Easy',
    description: `
      <p>You are given a Lua contract state with a simple counter. Your task is to create a frontend handler that queries the current counter value.</p>
    `,
    examples: [
      {
        input: `
Lua Contract:
function handle(state, action)
  if action.input.function == "getCount" then
    return { result = state.count }
  end
end

Initial state:
{ count = 42 }`,
        output: `// JS Output
await getCounterValue(); // 42`
      }
    ],
    constraints: [
      'Use POST with function "getCount".',
      'Assume the endpoint is /contract/query.',
      'Handle network failures.'
    ],
    defaultCode: `/**
 * @return {Promise<number>}
 */
async function getCounterValue() {
    // Your code here
};`
  },
  {
    id: 'sqlite-insert',
    title: '3. Insert Into SQLite (Lua)',
    difficulty: 'Easy',
    description: `
      <p>You are using Lua with SQLite to store user data. Write the Lua function that takes <code>name</code> and <code>email</code> and inserts them into a <code>users</code> table.</p>
      <p>The table schema is: <code>CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)</code></p>
    `,
    examples: [
      {
        input: 'name = "Alice", email = "alice@example.com"',
        output: 'INSERT INTO users (name, email) VALUES ("Alice", "alice@example.com")'
      }
    ],
    constraints: [
      'Use Lua SQLite library (e.g., ls_sqlite3 or LuaSQL).',
      'Use prepared statements for security.',
      'Do not allow SQL injection.'
    ],
    defaultCode: `-- @param name string
-- @param email string
-- @return void
function insertUser(db, name, email)
    -- Your code here
end`
  },
  {
    id: 'sqlite-query',
    title: '4. Query From SQLite (Lua)',
    difficulty: 'Easy',
    description: `
      <p>Write a Lua function to fetch all users from the <code>users</code> table and return them as a list of name-email pairs.</p>
    `,
    examples: [
      {
        input: 'Table: users (2 records)',
        output: '[{ name = "Alice", email = "alice@example.com" }, { name = "Bob", email = "bob@example.com" }]'
      }
    ],
    constraints: [
      'You should use Lua SQLite API to run a SELECT query.',
      'Return an array/table of user records.'
    ],
    defaultCode: `-- @return table
function getAllUsers(db)
    -- Your code here
end`
  },
  {
    id: 'lua-write-state',
    title: '5. Update State in Lua Smart Contract',
    difficulty: 'Easy',
    description: `
      <p>You are modifying a Lua smart contract to update a counter. Write the handler function to increment the counter in the contract state by 1.</p>
    `,
    examples: [
      {
        input: `
Initial State:
{ count = 2 }

Action:
{ input = { function = "increment" } }`,
        output: `
Result:
{ state = { count = 3 } }`
      }
    ],
    constraints: [
      'Ensure idempotent logic.',
      'Mutate the state safely.',
      'Return the updated state.'
    ],
    defaultCode: `function handle(state, action)
  if action.input.function == "increment" then
    -- Your code here
  end
end`
  }
];
