import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../auth/auth.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class VideoService {

  constructor(
    private auth: AuthService
  ) { }

  public fileUpload(): Observable<any> {
    const result = this.auth.post('/api/videos/generate-video-url', {video: null});
    return result;
  }

  public makeVideo(url, videoId, description, title): Observable<any> {
    const result = this.auth.post('/api/videos/upload', {url: url, videoId: videoId, description: description, title: title});
    return result;
  }

  public deleteVideo(videoId): Observable<any> {
    const data = this.auth.post('api/videos/upload-fail', {videoId: videoId});
    return data;
  }

  public getAllVideos(page, resultCount, searchTerm = ''): Observable<any> {
    const params = new HttpParams().append("page", page).append("resultCount", resultCount).append("searchTerm", searchTerm);
    const result = this.auth.get('/api/videos/get-videos', params);
    return result;
  }
}
