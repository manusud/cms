import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { WindRefService } from 'src/app/wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {

  document: Document;
  id: number;
  nativeWindow : any
  
  constructor(private documentService: DocumentService,
    private windRefService: WindRefService , 
    private route: ActivatedRoute,
    private router: Router) 
    {
      this.nativeWindow = windRefService.getNativeWindow();
}

onView() {
  if (this.document.url) {
    this.nativeWindow.open(this.document.url);
  }
}

ngOnInit() {
  this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.document = this.documentService.getDocument(String(this.id));
      }
    );
}

onDelete() {
this.documentService.deleteDocument(this.document);
this.router.navigate(['/documents'], {relativeTo: this.route});
}

}