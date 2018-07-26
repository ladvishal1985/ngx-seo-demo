import { Component, OnInit } from '@angular/core';
import { LinksConfigConst } from '../../configuration/link-configuration.const';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  linkConfigObj = LinksConfigConst;
  constructor() { }

  ngOnInit() {
    
  }

}
