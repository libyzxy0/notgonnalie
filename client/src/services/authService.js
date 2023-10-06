export const apiURL = 'https://srv-ngl-l3.vercel.app';
export async function makeAuth(username) {
  try {
  const response = await fetch(apiURL + '/api', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      uses: 'auth-create', 
      payload: {
        username: username
      }
    })
  })
  const result = await response.json();
  return result
  } catch (err) {
    console.log(err)
    return null
  }
}
export async function verifyAuth(token) {
  try {
  const response = await fetch(apiURL + '/api', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      uses: 'auth-verify', 
      payload: {
        token
      }
    })
  })
  const result = await response.json();
  return result
  } catch (err) {
    console.log(err)
    return null
  }
}