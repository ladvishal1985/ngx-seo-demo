import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) { }

  ngOnInit() {
    this.title.setTitle('SEO Demo Headless: About Us');
    this.meta.updateTag({ name: 'title', content: 'SEO Demo Headless: About Us' });
    this.meta.updateTag({ name: 'description', content: 'This is a sample SEO application for Headless Angular application and this is About Us page.' });
  }

}
