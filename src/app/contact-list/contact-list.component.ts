import { Component, OnInit } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'cm-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor() { }

  ngOnInit() {
    this.contacts = [
      {
        name: 'Victor',
        address: '123 main st.',
        age: 32,
        workRelated: true
      }
    ];
  }

}
