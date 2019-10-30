<template>
  <p>ここにwebsocketの画面を設置する</p>
</template>

<script>
import io from 'socket.io-client'

export default {
  data() {
    return {
      socket: ''
    }
  },
  mounted() {
    this.socket = io()
  }
}
</script>
