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
    this.title.setTitle('About Us');
    this.meta.updateTag({ name: 'title', content: 'About Us' });
    this.meta.updateTag({ name: 'description', content: 'About-Us Page' });
  }

}
