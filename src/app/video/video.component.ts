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

  private sendVideo(videoForm: NgForm) {
    this.auth.canUpload(videoForm).subscribe(() => {});
  }
}
