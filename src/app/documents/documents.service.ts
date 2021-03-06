import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  startedEditing = new Subject<number>();

  documents: Document[] = [];

  constructor(private http: HttpClient) { 
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    this.http.get('https://cms-luiz-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents
        this.maxDocumentId = this.getMaxId();
        this.documents.sort();
        this.documentListChangedEvent.next(this.documents.slice());
      }, 
     // (error: any) => {
     //   console.log(error.message);
     // }
    )

    return this.documents.slice();
  }

  storeDocuments() {
    const json = JSON.stringify(this.documents);
    this.http.put(
      'https://cms-luiz-default-rtdb.firebaseio.com/documents.json', 
      json, 
      {
        headers: new HttpHeaders({'Content-Type':'application/json'})
      }
    ). subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
    })
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }

 getMaxId(): number {
  let maxId: number = 0;

  for (let document of this.documents) {
    let currentId = +document.id;
    if (currentId > maxId) {
      maxId = currentId;
    }
  }

  return maxId
 }

 addDocument(newDocument: Document) {
  if (!newDocument) {
    return;
  }
  this.maxDocumentId++;
  newDocument.id = this.maxDocumentId.toString();
  this.documents.push(newDocument);
  // this.documentListChangedEvent.next(this.documents.slice());
  this.storeDocuments();
}

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) {
      return;
    }

  let pos = this.documents.indexOf(originalDocument);
  if (pos < 0) {
    return;
  }

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  // this.documentListChangedEvent.next(this.documents.slice());
  this.storeDocuments();
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
  // this.documentListChangedEvent.next(this.documents.slice());
  this.storeDocuments();
}


}