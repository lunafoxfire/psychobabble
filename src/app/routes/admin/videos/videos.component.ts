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
  public page: number = 0;
  public resultCount: number = 10;

  @ViewChild('myVideo') myVideo: any;
  played: boolean;
  constructor(
    public service: VideoService
  ) { }

  ngOnInit() {
    this.videos = this.service.getAllVideos(this.page, this.resultCount);
  }

  public searchVideos(searchTerm) {
    this.videos = this.service.getAllVideos(this.page, this.resultCount, searchTerm.value);
  }
}
