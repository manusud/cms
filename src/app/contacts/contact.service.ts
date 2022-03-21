import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactSelectedEvent  = new EventEmitter<Contact>();
  
  contacts: Contact[] = [];

  constructor() {
        this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
      return this.contacts.slice();
  }

  getContact(id: string) {

    for (let contact of this.getContacts()) {
      if (contact.id === id) {
        return contact
      } 
    }

    return null

    //return this.getContacts().filter(contact => contact.id === id)
  } 
}