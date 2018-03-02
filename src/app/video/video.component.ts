import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  private sendVideo(videoForm) {
    let video = videoForm.value;
    console.log(video);
    console.log(videoForm);
    this.auth.canUpload(video).subscribe(() => {});
  }
}
