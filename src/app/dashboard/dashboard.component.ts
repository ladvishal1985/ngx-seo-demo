import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from '../services/meta.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService, private title: Title, private metaService: MetaService) { }

  ngOnInit() {
    this.title.setTitle('Dashboard');
    this.metaService.setMeta('title','Dashboard');
    this.metaService.setMeta('description','Dashboard: Tours of Heroes');
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
