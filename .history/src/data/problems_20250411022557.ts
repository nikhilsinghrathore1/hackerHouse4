export const questions = [
  {
    id: 'sqlite-register-user',
    title: '1. Register a New User',
    difficulty: 'Easy',
    description: `
      <p>You are given a backend Lua handler that registers a user into a SQLite database.</p>
      <p>Write a frontend function that sends the user's ID and name to the backend for registration.</p>
    `,
    examples: [
      {
        input: `
Lua Handler:
Handlers.add("Register-User", "Register-User", function(msg)
  local exists = admin:select('SELECT id FROM users WHERE id = ?;', { msg.From })
  if #exists > 0 then
    msg.reply({ Data = "User already exists." })
    return
  end

  admin:apply('INSERT INTO users (id, name) VALUES (?, ?);', { msg.From, msg.Tags.Name })
  msg.reply({ Data = "Registration successful." })
end)`,
        output: `/**
 * @param {{ id: string, name: string }} user
 * @return {Promise<string>}
 */
async function registerUser(user) {
  try {
    const res = await fetch('/api/sqlite/register', {
      method: 'POST',
      body: JSON.stringify({
        action: "Register-User",
        id: user.id,
        name: user.name
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.message;
  } catch {
    return "Registration failed.";
  }
}`
      }
    ],
    constraints: [
      'Send a POST request to <code>/api/sqlite/register</code>.',
      'Include "id" and "name" in the request body.',
      'Return the response message.',
      'Handle errors gracefully.'
    ],
    defaultCode: `/**
 * @param {{ id: string, name: string }} user
 * @return {Promise<string>}
 */
async function registerUser(user) {
  // Your code here
}`
  },

  {
    id: 'sqlite-update-score',
    title: '2. Update User Score',
    difficulty: 'Easy',
    description: `
      <p>The backend updates a user's score in a SQLite database.</p>
      <p>Write a function that sends the user's ID and updated score to the backend.</p>
    `,
    examples: [
      {
        input: `
Lua Handler:
Handlers.add("Update-Score", "Update-Score", function(msg)
  local newScore = tonumber(msg.Tags.Score)
  admin:apply('UPDATE users SET score = ? WHERE id = ?;', { newScore, msg.From })
  msg.reply({ Data = "Score updated." })
end)`,
        output: `/**
 * @param {{ id: string, score: number }} payload
 * @return {Promise<string>}
 */
async function updateScore(payload) {
  try {
    const res = await fetch('/api/sqlite/score', {
      method: 'POST',
      body: JSON.stringify({
        action: "Update-Score",
        id: payload.id,
        score: payload.score
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.message;
  } catch {
    return "Failed to update score.";
  }
}`
      }
    ],
    constraints: [
      'Use <code>/api/sqlite/score</code> as the endpoint.',
      'Send "id" and "score" in the body.',
      'Return success message.',
      'Handle errors gracefully.'
    ],
    defaultCode: `/**
 * @param {{ id: string, score: number }} payload
 * @return {Promise<string>}
 */
async function updateScore(payload) {
  // Your code here
}`
  },

  {
    id: 'sqlite-fetch-users',
    title: '3. Fetch All Users',
    difficulty: 'Medium',
    description: `
      <p>This SQLite handler returns all registered users with their scores.</p>
      <p>Create a frontend function that fetches and returns the list of users.</p>
    `,
    examples: [
      {
        input: `
Lua Handler:
Handlers.add("Get-All-Users", "Get-All-Users", function(msg)
  local users = admin:select('SELECT name, score FROM users ORDER BY score DESC;')
  msg.reply({ Data = users })
end)`,
        output: `/**
 * @return {Promise<Array<{ name: string, score: number }>>}
 */
async function fetchUsers() {
  try {
    const res = await fetch('/api/sqlite/users');
    const data = await res.json();
    return data.users;
  } catch {
    return [];
  }
}`
      }
    ],
    constraints: [
      'Fetch from <code>/api/sqlite/users</code>.',
      'Expect a response with a "users" array.',
      'Return that array.',
      'Handle errors by returning an empty array.'
    ],
    defaultCode: `/**
 * @return {Promise<Array<{ name: string, score: number }>>}
 */
async function fetchUsers() {
  // Your code here
}`
  },

  {
    id: 'sqlite-delete-user',
    title: '4. Delete a User by ID',
    difficulty: 'Medium',
    description: `
      <p>The backend deletes a user from the SQLite database by their ID.</p>
      <p>Write a function that sends the delete request.</p>
    `,
    examples: [
      {
        input: `
Lua Handler:
Handlers.add("Delete-User", "Delete-User", function(msg)
  admin:apply('DELETE FROM users WHERE id = ?;', { msg.From })
  msg.reply({ Data = "User deleted." })
end)`,
        output: `/**
 * @param {string} userId
 * @return {Promise<string>}
 */
async function deleteUser(userId) {
  try {
    const res = await fetch('/api/sqlite/delete', {
      method: 'POST',
      body: JSON.stringify({
        action: "Delete-User",
        id: userId
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    return data.message;
  } catch {
    return "Error deleting user.";
  }
}`
      }
    ],
    constraints: [
      'Send user ID in request body.',
      'Use <code>/api/sqlite/delete</code> endpoint.',
      'Return confirmation message.',
      'Handle failure scenarios.'
    ],
    defaultCode: `/**
 * @param {string} userId
 * @return {Promise<string>}
 */
async function deleteUser(userId) {
  // Your code here
}`
  }
];
