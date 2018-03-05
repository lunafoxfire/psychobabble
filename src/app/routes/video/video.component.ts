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
    private auth: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {

  }

  private sendVideo(file) {
    let formData = new FormData();
    formData.append('key', "user1/"+file.files[0].name);
    formData.append('file', file.files[0]);
    formData.append('acl', "public-read");
    formData.append('success_action_status', "200");
    this.http.post("http://epicodus-internship.s3.amazonaws.com/", formData).subscribe((response) => {
      console.log("response:" + response);
    }, (error) => {
      console.log("error:" + error)
    })
  }
}
