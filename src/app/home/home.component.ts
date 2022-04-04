import { Component, OnInit } from '@angular/core';
import { FbconnectionService } from '../fbconnection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginState=false;

  constructor(private firebase:FbconnectionService) { }

  ngOnInit(): void {
  }

}
