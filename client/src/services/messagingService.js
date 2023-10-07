import { io } from "socket.io-client";
import { reactive } from "vue";

import { apiURL, verifyAuth } from '../services/authService';

export const state = reactive({
  connected: false,
  messages: [], 
  tk: ''
});

export async function fetchMessages(token) {
  try {
  state.tk = token;
  const response = await fetch(apiURL + '/api', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      uses: 'api-msgs', 
      payload: {
        token: token
      }
    })
  })
    const result = await response.json();
    state.messages = result;
    console.log(state.messages)
  } catch (err) {
    console.log(err)
  }
}

const socket = io(apiURL, {
  autoConnect: false
});

socket.connect()

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on('event', async (message) => {
  const tk = state.tk;
  console.log(tk)
  if(message.type == 'event') {
    let res = await verifyAuth(tk); 
    if(res && res.code == 200) {
      if(res.data.username == message.data.target) {
        state.messages.push(message.data);
        console.log(event)
      }
    }
  }
})

export async function sendMessage(target, message) {
  socket.emit('send-message', {
    target, 
    message, 
    timestamp: Date.now()
  })
  console.log(target, message)
  return 'Sent'
}