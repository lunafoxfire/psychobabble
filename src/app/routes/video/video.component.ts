import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public http: HttpClient
  ) { }

  ngOnInit() {

  }

  public sendVideo(form: NgForm, file) {
    let reader = new FileReader();
    let _http = this.http;
    reader.readAsArrayBuffer(file.files[0]);
    reader.onloadend = function(e) {
      let formData = new FormData();
      formData.append('key', file.files[0].name);
      formData.append('file', reader.result);
      formData.append('acl', "public-read");
      _http.post("http://epicodus-internship.s3.amazonaws.com/", formData).subscribe((res) => {
        console.log(res);
      })
    }
  }
}
