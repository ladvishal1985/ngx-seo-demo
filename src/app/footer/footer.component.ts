import { Component, OnInit } from '@angular/core';
import { LinksConfigConst } from '../../configuration/link-configuration.const';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  linkConfigObj = LinksConfigConst;
  constructor() { }

  ngOnInit() {
  }

}
