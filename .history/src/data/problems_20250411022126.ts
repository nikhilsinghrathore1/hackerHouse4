import { Problem } from '../types/problem';

export const problems: Problem[] = [
  {
    id: 'lua-register-player-handler',
    title: '1. Frontend Handler for Registering a Player',
    difficulty: 'Easy',
    description: `
      <p>You are given a Lua smart contract handler that registers a player in a leaderboard on the Arweave blockchain.</p>
      <p>Your task is to write a JavaScript frontend function that uses the <code>message</code> function to send a properly formatted registration request to the Lua handler.</p>
      <p><strong>Note:</strong> The function should use the <code>createDataItemSigner</code> from <code>window.arweaveWallet</code> and send appropriate tags to the contract process.</p>
    `,
    examples: [
      {
        input: `
  Lua Handler:
  Handlers.add(
    "Register-Player",
    "Register-Player",
    function(msg)
      local results = admin:select('SELECT id FROM leaderboard WHERE id = ?;', { msg.From })
      if #results > 0 then
        msg.reply({ Data = "You are already registered." })
        return
      end
  
      table.insert(Members, msg.From)
  
      local isCreator = false
      local result = admin:exec('SELECT COUNT(*) as count FROM leaderboard;')
      if result[1].count == 0 then
        isCreator = true
      end
  
      admin:apply(
        'INSERT INTO leaderboard (id, name, score, isCreator) VALUES (?, ?, ?, ?);',
        { msg.From, msg.Tags.DisplayName, 0, isCreator }
      )
  
      msg.reply({ Data = "Successfully registered to game." })
    end
  )`,
        output: `/**
   * @param {{ name: string }} currentPlayer
   * @return {Promise<string>}
   */
  async function registerPlayer(currentPlayer) {
    try {
      const res = await message({
        process: gameProcess,
        signer: createDataItemSigner(window.arweaveWallet),
        tags: [
          {
            name: "Action",
            value: "Register-Player",
          },
          {
            name: "DisplayName",
            value: currentPlayer.name,
          },
        ],
      });
  
      return res.Data;
    } catch (err) {
      return "Registration failed. Please try again.";
    }
  }`
      }
    ],
    constraints: [
      'Use the <code>message</code> function with <code>process</code>, <code>signer</code>, and <code>tags</code>.',
      'Add a tag with name "Action" and value "Register-Player".',
      'Add a tag with name "DisplayName" and value equal to the player name.',
      'Return the "Data" field from the response.',
      'Handle errors gracefully and return a helpful error message if registration fails.'
    ],
    defaultCode: `/**
   * @param {{ name: string }} currentPlayer
   * @return {Promise<string>}
   */
  async function registerPlayer(currentPlayer) {
    // Your code here
  }`
  }
  
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
