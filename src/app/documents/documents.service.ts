import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent  = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  
  maxId: number;
  currentId: number;
  maxDocumentId: number;

  documents: Document[] = [];

  constructor() {
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
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
    this.documentListChangedEvent.next(this.documents.slice());
  }
  
  getMaxId(): number {
  this.maxId = 0;

    for (let document of this.getDocuments()) {
      this.currentId = parseInt(document.id);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId
      }
    }
  return this.maxId
  } 
 

  addDocument(newDocument: Document) {

    if (!newDocument) {
        return
    }

    this.maxDocumentId++;
    newDocument.id = String(this.maxDocumentId);
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice()
    this.documentListChangedEvent.next(documentsListClone)
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
        return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
        return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }



}