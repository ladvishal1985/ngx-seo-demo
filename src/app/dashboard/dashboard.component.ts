import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from '../services/meta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LinksConfigConst } from '../../configuration/link-configuration.const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  linkConfigObj = LinksConfigConst;
  constructor(private heroService: HeroService, private title: Title, private metaService: MetaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title.setTitle('Dashboard');
    this.metaService.setMeta('title', 'Dashboard');
    this.metaService.setMeta('description', 'Dashboard: Tours of Heroes');
    this.metaService.setMeta('theme-color', '#D4D4D4');
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
