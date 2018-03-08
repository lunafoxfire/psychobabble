import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent implements OnInit {
  constructor(
    public auth: VideoService,
    public http: HttpClient,
    public router: Router
  ) { }

  ngOnInit() {

  }

  public sendVideo(file) {
    if(file) {
      this.auth.fileUpload().subscribe((result) => {
        if(!result["message"]) {
          const httpOptions = {
            headers: new HttpHeaders({
              "Key": result["key"],
              "ACL": result["acl"],
              "Bucket": result["bucket"],
              "Content-Type": result["contentType"],
            })
          };
          this.http.put(result["url"], file.files[0], httpOptions).subscribe((response) => {
            let reference = `https://s3.amazonaws.com/${result["reference"]}`
            this.auth.makeVideo(reference, result["videoId"]).subscribe((result) => {
              console.log(result);
              this.router.navigateByUrl('/');
            });
          }, (error) => {
            this.auth.deleteVideo(result["videoId"]).subscribe((data) => {
              console.log(data);
            })
            console.log("error");
            console.log(error);
          })
        } else {
          console.log(result["message"]);
        }
      });
    }
  }
}
