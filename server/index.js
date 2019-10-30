const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port, host)

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  // websocket
  socketStart(server)
  consola.ready({
    message: 'Socket.IO start',
    badge: true
  })
}

function socketStart(server) {
  const io = require('socket.io').listen(server)

  // websocketサーバに接続された時
  io.on('connection', (socket) => {
    consola.log('[info] id:' + socket.id + 'is connected')
    // サーバからクライアントへ発信
    socket.emit('message', 'hello, world')
  })
}
start()
