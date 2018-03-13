import { Repository, getRepository } from 'typeorm';
import { Video } from './../models/Video';
import { Tag, TagType } from './../models/Tag';
import { TagService } from './tag.service';

export interface VideoServiceDependencies {
  videoRepo: Repository<Video>;
  tagService: TagService;
}

export class VideoService {
  private videoRepo: Repository<Video>;
  private tagService: TagService;

  constructor(dependencies: VideoServiceDependencies = null) {
    this.videoRepo = dependencies ? dependencies.videoRepo : getRepository(Video);
    this.tagService = dependencies ? dependencies.tagService : new TagService();
  }

  public async createEmptyVideo(): Promise<string> {
    let video = new Video();
    await this.videoRepo.save(video);
    return video.id;
  }

  /** Saves a new Video to the database. */
  public async uploadAsync(videoOptions: VideoUploadOptions): Promise<Video> {
    let tags: Tag[] = [];
    if (videoOptions.tags) {
      await Promise.all(videoOptions.tags.map(async (tagType) => {
        tags.push(await this.tagService.findByNameAsync(tagType));
        return;
      }));
    }
    let newVideo = new Video();
      newVideo.id = videoOptions.id
      newVideo.url = videoOptions.url;
      newVideo.description = videoOptions.description;
      newVideo.tags = tags;
    return this.videoRepo.save(newVideo);
  }

  public async deleteVideoId(videoId) {
    let videoToDelete = await this.videoRepo.findOneById(videoId);
    await this.videoRepo.remove(videoToDelete);
    let check = await this.videoRepo.findOneById(videoId);
    if(check) {
      console.log(videoId);
      return false;
    } else {
      console.log(videoId);
      return true;
    }
  }

  public async getAllVideos() {
    return await this.videoRepo.find();
  }
}

/** All options required to create a new Video. */
export interface VideoUploadOptions {
  /** The id where this video will be stored */
  id: string;
  /** The URL where this video is stored. */
  url: string;
  /** A description of this video. */
  description: string;
  /** All tags associated with this video. Optional. */
  tags?: TagType[];
}
