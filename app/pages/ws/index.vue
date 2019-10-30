<template>
  <p>{{ message }}</p>
</template>

<script>
import io from 'socket.io-client'

export default {
  data() {
    return {
      socket: '',
      message: ''
    }
  },
  mounted() {
    this.socket = io()

    this.socket.on('message', (message) => {
      this.message = message
    })
  }
}
</script>
