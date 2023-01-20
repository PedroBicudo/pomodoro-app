import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  currentTab!: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.location.onUrlChange((url, _) => {
      this.currentTab = url[1].toUpperCase()+url.substring(2);
    });
  }

}
