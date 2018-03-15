import { Component, OnInit } from '@angular/core';
import { FeedService } from './../feed.service';
import { VideoService } from './../../videos/video.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'program-design',
  templateUrl: './program-design.component.html',
  styleUrls: ['./program-design.component.scss']
})
export class ProgramDesignComponent implements OnInit {
  public request: Observable<any>;
  public videos: Observable<any>;
  private programVideos: string[] = new Array<string>();
  public requestId: string;

  constructor(
    private service: FeedService,
    private videoService: VideoService,
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.requestId = params['id'];
      this.request = this.service.getRequestDetails(this.requestId);
    });
    this.videos = this.videoService.getAllVideos();
  }

  public addToProgram(videoId) {
    this.programVideos.push(videoId);
  }

  public checkIfAdded(videoId) {
    let notAdded = true;
    this.programVideos.forEach(function(id) {
      if(id === videoId) {
        notAdded = false;
      }
    });
    return notAdded;
  }

  public async createProgram() {
    this.request.subscribe((data) => {
      let program = {
        videos: this.programVideos,
        client: data.request.client,
        expiration: data.request.unixExpiration,
        description: null
      }
      this.service.makeProgram(program, this.requestId).subscribe((result) => {
        this.router.navigateByUrl('/');
      })
    });
  }

}
