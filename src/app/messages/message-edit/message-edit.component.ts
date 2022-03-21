import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Message } from '../message.model';
import { MessageService } from '../messages.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {  
  currentSender: string = "7";
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;

  constructor(private slMessage: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const getSubject = this.subjectRef.nativeElement.value;
    const getMsgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('99',getSubject, getMsgText,this.currentSender);   
    this.slMessage.addMessage(newMessage);
  }

  onClear(){
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
