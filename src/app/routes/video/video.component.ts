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

  public sendVideo(file) {
    if(file) {
      this.auth.fileUpload().subscribe((result) => {
        console.log(result["key"], result["acl"], result["bucket"], result["contentType"])
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
            console.log("response");
            console.log(response);
            let reference = `https://s3.amazonaws.com/${result["reference"]}`
            this.auth.makeVideo(result["reference"]).subscribe((result) => {
              console.log(result);
            });
          }, (error) => {
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
