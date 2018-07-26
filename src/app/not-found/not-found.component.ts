import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LinksConfigConst } from '../../configuration/link-configuration.const';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  linkConfigObj = LinksConfigConst;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    var element1 = <HTMLInputElement>document.getElementById("data1");
    element1.hidden = true;

    var element2 = <HTMLInputElement>document.getElementById("data2");
    element2.hidden = true;

  }

  backToHome() {
    window.location.href = '/dashboard';
  }



}
