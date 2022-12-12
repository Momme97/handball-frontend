import { Component, OnInit, Input } from '@angular/core';
import { QualifiedPerson } from 'src/app/data-models/qualified-person';

@Component({
  selector: 'app-contact-person-list',
  templateUrl: './contact-person-list.component.html',
  styleUrls: ['./contact-person-list.component.scss']
})
export class ContactPersonListComponent implements OnInit {
  @Input() qualifiedPersonList: QualifiedPerson[];

  constructor() { }

  ngOnInit(): void {
  }

}
