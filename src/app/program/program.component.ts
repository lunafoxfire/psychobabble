import { Component, OnInit } from '@angular/core';
// import * as crypto from 'crypto';
@Component({
  selector: 'program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  public Host = "localhost:3000";
  constructor() { }

  ngOnInit() {
  }

  genUrl() {
    let fakeId = "1d1dd2dd3dff4f12f";
    console.log(this.Host + "/program/" + fakeId);
  }

}
