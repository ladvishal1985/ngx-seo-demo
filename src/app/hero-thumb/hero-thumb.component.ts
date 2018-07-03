import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title, Meta } from '@angular/platform-browser';
import { MetaService } from '../services/meta.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-thumb',
  templateUrl: './hero-thumb.component.html',
  styleUrls: ['./hero-thumb.component.scss']
})
export class HeroThumbComponent implements OnInit {

  @Output() heroImgSelected = new EventEmitter();


  heroes: Hero[];

  constructor(private heroService: HeroService, private title: Title, private metaService: MetaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.title.setTitle('Heroes List');
    this.metaService.setMeta('title', 'Heroes List');
    this.metaService.setMeta('description', 'Heroes List: Tours of Heroes');
    this.getHeroes();
  }

  public heroImgSelectedEvent(heroImage: Hero): void {
    // this.heroService.setData(i);
    this.heroImgSelected.emit(heroImage);
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


}
