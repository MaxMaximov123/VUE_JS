<template>
  <div>
    <input v-model="message" type="text" placeholder="Enter a message...">
    <button @click="sendMessage">Send</button>
    {{ message1 }}

  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      socket: null,
      message1: '',
    }
  },

  mounted() {
    this.socket = new WebSocket('ws://localhost:8000/stocks');

    this.socket.onmessage = (event) => {
      this.message1 = event.data
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed!');
    };
  },

  methods: {
    sendMessage() {
      this.socket.send(this.message);
      this.message = '';
    }
  }
}
</script>
