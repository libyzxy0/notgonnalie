import { io } from "socket.io-client";
import { reactive } from "vue";

const apiURL = 'https://notgonnalie.libyzxy0.repl.co';

export const state = reactive({
  connected: false,
  messages: []
});

const socket = io(apiURL, {
  autoConnect: true
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on('event', (message) => {
  status.messages.push(message);
})

export async function fetchMessages(token) {
  const response = await fetch(`${apiURL}/api/send-message`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ token })
  })
  const result = await response.json();
  return result
}

export async function sendMessage(target, message) {
  socket.emit('send-message', {
    target, 
    message, 
    timestamp: Date.now()
  })
}