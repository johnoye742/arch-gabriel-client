
class Client {
  constructor(url, endpoint) {
    this.socket = new WebSocket("ws://"+url+"/chat")
    this.endpoint = endpoint
  }

  start(callback, id) {
    this.socket.addEventListener("open", () => {
      this.socket.send(JSON.stringify({ type: "join", id: id, roomId: this.endpoint }))
    })

    this.socket.onmessage = (ev) => callback(JSON.parse(ev.data))
  }

  send(message, userId) {
    this.socket.addEventListener("open", 
      () => this.socket.send(JSON.stringify({ type: "message", id: userId, roomId: this.endpoint, content: message }))) 
  }

}
