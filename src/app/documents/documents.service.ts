import {Injectable, EventEmitter} from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  documentSelectedEvent  = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  documents: Document[] = [];

  constructor() {
        this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
      return this.documents.slice();
  }

  getDocument(index: string) {
    return this.documents[index];
  }


  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }
  
 
}