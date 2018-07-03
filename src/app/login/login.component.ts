import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LinksConfigConst } from '../../configuration/link-configuration.const';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  abc = LinksConfigConst;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
