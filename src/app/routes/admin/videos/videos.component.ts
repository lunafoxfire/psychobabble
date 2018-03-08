import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  @ViewChild('myVideo') myVideo: any;
  played: boolean;
  constructor() { }

  ngOnInit() {
  }
  public playPause() {
    if(!this.played) {
      this.played = true;
      let video = this.myVideo.nativeElement;
      video.play();
    }
  }
}
