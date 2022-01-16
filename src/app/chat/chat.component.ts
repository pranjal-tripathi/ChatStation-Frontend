import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessage } from '../models/ChatMessage';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.openWebSocket()
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket()
  }

  sendMessage(sendForm: NgForm) {
    const chatMessage = new ChatMessage(sendForm.value.user, sendForm.value.message)
    this.webSocketService.sendMessage(chatMessage)
    sendForm.controls?.['message'].reset()
  }

}
