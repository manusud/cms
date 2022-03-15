import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  
  currentSender: string = "currentSender";
  @ViewChild('subject', {static: true}) subjectRef: ElementRef;
  @ViewChild('msgText', {static: true}) msgTextRef: ElementRef;
  @Output() addMessageEvent  = new EventEmitter<Message >();

  constructor() { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const getSubject = this.subjectRef.nativeElement.value;
    const getMsgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message('99',this.currentSender,getSubject, getMsgText);
    this.addMessageEvent .emit(newMessage);
  }

  onClear(){
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }

}
