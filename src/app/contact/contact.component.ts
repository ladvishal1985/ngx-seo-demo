import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('SEO Demo Headless: Contact Us');
    this.meta.updateTag({ name: 'title', content: 'SEO Demo Headless: Contact Us' });
    this.meta.updateTag({ name: 'description', content: 'This is a sample SEO application for Headless Angular application and this is Contact Us page.' });
  }

}
