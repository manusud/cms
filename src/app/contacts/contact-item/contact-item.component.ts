import { Contact } from '../contact.model';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})

export class ContactItemComponent implements OnInit {

  @Input() contact: Contact;
  @Input() id: number;
   
  ngOnInit() {
  }
 

}
