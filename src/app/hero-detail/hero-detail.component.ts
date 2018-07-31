import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from '../services/meta.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private title: Title,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    // this.title.setTitle('SEO Demo Headless: Heroes Details');
    // this.metaService.setMeta('title', 'SEO Demo Headless: Heroes Details');
    // this.metaService.setMeta('description', 'This is a sample SEO application for Headless Angular application and this is Heroes Details page.');
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe((hero) => {
        this.hero = hero;
        this.title.setTitle(`SEO Demo Headless: Heroes Details: ${this.hero.name}`);
        this.metaService.setMeta('title', `SEO Demo Headless: Heroes Details: ${this.hero.name}`);
        this.metaService.setMeta('description', `This is a sample SEO application for Headless Angular application and this is Heroes Details page: ${this.hero.name}`);
  });
}

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
