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

  public sendVideo(file) {
    if(file) {
      this.auth.fileUpload().subscribe((result) => {
        console.log(result);
        if(!result["message"]) {
          let formData = new FormData();
          let key = result["userName"]+"/"+result["videoId"]+".mp4";
          let bucket = result["bucket"];
          formData.append('key', key);
          formData.append('file', file.files[0]);
          formData.append('acl', "public-read");
          formData.append('success_action_status', "200");
          this.http.post("http://"+bucket+".s3.amazonaws.com/", formData).subscribe((response) => {
            let url = "http://"+bucket+".s3.amazonaws.com/"+key;
            this.auth.makeVideo(url, result["videoId"]).subscribe((result) => {
              console.log(result);
            });
          }, (error) => {
            console.log("error:" + error)
          })
        } else {
          return null;
        }
      });
    }
  }
}
