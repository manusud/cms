import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

@Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] =[
    new Document("1","Document 1","Document 1 Description","www.magalu.com",null),
    new Document("2","Document 2","Document 2 Description","www.magalu.com",null),
    new Document("3","Document 3","Document 3 Description","www.magalu.com",null),
    new Document("4","Document 4","Document 4 Description","www.magalu.com",null),
    new Document("5","Document 5","Document 5 Description","www.magalu.com",null),]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}