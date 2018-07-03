import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LinksConfigConst } from '../../configuration/link-configuration.const';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  abc = LinksConfigConst;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
