import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket
  chatMessages: ChatMessage[] = []

  constructor() { }

  public openWebSocket() {
    let url = 'ws://localhost:8443/chat'
    this.webSocket = new WebSocket(url)
    
    this.webSocket.onopen = (event) => {
      console.log('open ', event)
    }

    this.webSocket.onmessage = (event) => {
      const chatMessage = JSON.parse(event.data)
      this.chatMessages.push(chatMessage)
      console.log('msg ', this.chatMessages)
    }

    this.webSocket.onclose = (event) => {
      console.log('close ', event)
    }
  }

  public sendMessage(chatMessage: ChatMessage) {
    this.webSocket.send(JSON.stringify(chatMessage))
  }

  public closeWebSocket() {
    this.webSocket.close()
  }
}
