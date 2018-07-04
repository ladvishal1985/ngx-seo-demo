import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Title } from '@angular/platform-browser';
import { MetaService } from '../services/meta.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hero-view',
  templateUrl: './hero-view.component.html',
  styleUrls: ['./hero-view.component.scss']
})
export class HeroViewComponent implements OnInit {
  heroes: Hero[];
  shownGroup: any;

  getarr = [];
  getarr1;
  data = [];

  @Input() heroImage: Hero;

  constructor(private heroService: HeroService, private router: Router, private route: ActivatedRoute) { }



  ngOnInit() {

    this.getHeroes();
    // this.getarr = this.heroService.getData();
    // this.getarr1 =  Array.from(new Set(this.getarr ));

    // this.heroService.setData(this.data);

  }

  ngOnChanges() {
    console.log(JSON.stringify(this.heroImage));

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
