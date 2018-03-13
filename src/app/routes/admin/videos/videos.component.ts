import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VideoService } from './video.service';

@Component({
  selector: 'videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  public videos: Observable<any>;

  @ViewChild('myVideo') myVideo: any;
  played: boolean;
  constructor(
    public service: VideoService
  ) { }

  ngOnInit() {
    this.videos = this.service.getAllVideos();
  }

  public playPause() {
    if(!this.played) {
      this.played = true;
      let video = this.myVideo.nativeElement;
      video.play();
    }
  }
}
