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

  private sendVideo(file) {
    if(file) {
      let _auth = this.auth;
      let aReader = new FileReader();
      console.log(file.files[0]);
      aReader.readAsDataURL(file.files[0]);
      aReader.onloadend = function (e) {
        _auth.canUpload(aReader.result).subscribe(() => {});
      }
    }
  }
}
