import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent  = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  
  maxId: number;
  currentId: number;
  maxContactId: number;

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

  } 

  deleteContact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
 }


  getMaxId(): number {
  this.maxId = 0;

    for (let contact of this.getContacts()) {
      this.currentId = parseInt(contact.id);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId
      }
    }
  return this.maxId
  } 

  addContact(newContact: Contact) {

    if (!newContact) {
        return
    }

    this.maxContactId++;
    newContact.id = String(this.maxContactId);
    this.contacts.push(newContact);
    const contactListClone = this.contacts.slice()
    this.contactListChangedEvent.next(contactListClone)
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0){
        return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

}