import { WebSocket, WebSocketServer } from 'ws'
import { logger } from '../../utils'

interface ConnectionMessage {
  platform: string,
}

let server: WebSocketServer | null = null

export function startWS(port: number) {
  if (server) return

  server = new WebSocketServer({ port })

  server.on('listening', () => logger.info(`Hot reloading websocket running at ws://localhost:${port}`))

  server.on('connection', (ws) => {
    ws.on('message', (data) => {
      try {
        const message: ConnectionMessage = JSON.parse(data.toString())
        if (message.platform) logger.info(`${message.platform} connected to the hot reloading websocket.`)
      } catch {}
    })
  })
}

export function reloadConnectedDevices() {
  server?.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send('reload')
    }
  })
}
