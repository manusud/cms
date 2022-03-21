import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})

export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  constructor(private slMessage: MessageService) { }


  ngOnInit() {
    this.messages = this.slMessage.getMessages();
    this.slMessage.messageChangedEvent
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
        }
      );
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
