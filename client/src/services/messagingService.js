import { io } from "socket.io-client";
import { reactive } from "vue";
import { apiURL } from '../services/authService';

export const state = reactive({
  connected: false,
  messages: []
});

const socket = io(apiURL, {
  autoConnect: false
});
socket.connect()

socket.on("connect", () => {
  state.connected = true;
  alert('Connected!');
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on('event', (message) => {
  status.messages.push(message);
})

export async function sendMessage(target, message) {
  socket.emit('send-message', {
    target, 
    message, 
    timestamp: Date.now()
  })
  return 'Sent'
}