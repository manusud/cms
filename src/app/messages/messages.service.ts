import {Injectable, EventEmitter, Input} from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messageChangedEvent  = new EventEmitter<Message[]>();
  messageSelectedEvent  = new EventEmitter<Message>();
  
  messages: Message[] = [];

  constructor() {
        this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
      return this.messages.slice();
  }

  getMessage(id: string) {

    for (let message of this.getMessages()) {
      if (message.id === id) {
        return message
      } 
    }

    return null
  } 

  addMessage(message: Message) {
    this.messages.push(message);
    //console.log(this.messages.slice());
    this.messageChangedEvent.emit(this.messages.slice());
  }

}