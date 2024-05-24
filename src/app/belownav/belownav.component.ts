import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-belownav',
  templateUrl: './belownav.component.html',
  styleUrl: './belownav.component.scss'
})
export class BelownavComponent implements OnInit {
  year: number;
  currentUserName: string;
  isBoolNav: boolean = false;
  token: string;

  constructor() {

  }
  ngOnInit(): void {
    const d = new Date();
    this.year = d.getFullYear();

  }
 

}