import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],

})
export class HeroesComponent implements OnInit {
  expand: boolean;
  public selectedHeroImg: Hero;

  setCollapsed(isCollapsed) {
    this.expand = isCollapsed;
  }
  heroes: Hero[];

  constructor(private heroService: HeroService, private title: Title, private metaService: MetaService) { }

  ngOnInit() {
    this.title.setTitle('SEO Demo Headless: Heroes List');
    this.metaService.setMeta('title', 'SEO Demo Headless: Heroes List');
    this.metaService.setMeta('description', 'This is a sample SEO application for Headless Angular application and this is Heroes List page.');
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  public heroImgSelectedEvt(heroImg: Hero): void {
    this.selectedHeroImg = heroImg;
  }

}
