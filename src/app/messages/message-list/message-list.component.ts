import { Message } from 'src/app/messages/message.model';
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}