let apiURL = 'https://notgonnalie.libyzxy0.repl.co/api';
export async function makeAuth(username) {
  const response = await fetch(`${apiURL}/make-auth`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      username, 
      timestamp: Date.now()
    })
  })
  const result = await response.json();
  return result
}
export async function verifyAuth(token) {
  const response = await fetch(`${apiURL}/verify-auth`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      token, 
      timestamp: Date.now()
    })
  })
  const result = await response.json();
  return result
}