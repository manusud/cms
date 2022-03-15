import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [

    new Message('1','Msg Test 1','Message test 1','Luiz'),
    new Message('2','Msg Test 2','Message test 2','Geane'),
    new Message('3','Msg Test 3','Message test 3','Manoel'),
    new Message('4','Msg Test 4','Message test 4','Bia'),
    new Message('5','Msg Test 5','Message test 5','Gui'),
  ];


  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
