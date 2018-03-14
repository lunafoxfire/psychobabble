import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../auth.service';

@Injectable()
export class VideoService {

  constructor(
    private auth: AuthService
  ) { }

  public fileUpload(): Observable<any> {
    let result = this.auth.post('/api/videos/generate-video-url', {video: null});
    return result;
  }

  public makeVideo(url, videoId, description, title): Observable<any> {
    let result = this.auth.post('/api/videos/upload', {url: url, videoId: videoId, description: description, title: title});
    return result;
  }

  public deleteVideo(videoId): Observable<any> {
    let data = this.auth.post('api/videos/upload-fail', {videoId: videoId});
    return data;
  }

  public getAllVideos(): Observable<any> {
    let result = this.auth.get('/api/videos/get-videos');
    return result;
  }
}
