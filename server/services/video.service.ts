import { Repository, getRepository } from 'typeorm';
import { Video } from './../models/Video';
import { SoftSkillService } from './soft-skill.service';
import { SoftSkill, SoftSkillType } from './../models/SoftSkill';

export interface VideoServiceDependencies {
  videoRepo: Repository<Video>;
  softSkillService: SoftSkillService;
}

export class VideoService {
  private videoRepo: Repository<Video>;
  private softSkillService: SoftSkillService;
  public repo: Repository<Video>;

  constructor(dependencies: VideoServiceDependencies = null) {
    this.videoRepo = dependencies ? dependencies.videoRepo : getRepository(Video);
    this.softSkillService = dependencies ? dependencies.softSkillService : new SoftSkillService();
    this.repo = this.videoRepo;
  }

  public async createEmptyVideo(): Promise<string> {
    let video = new Video();
    await this.videoRepo.save(video);
    return video.id;
  }

  /** Saves a new Video to the database. */
  public async uploadAsync(videoOptions: VideoUploadOptions): Promise<Video> {
    let softSkills: SoftSkill[] = [];
    if (videoOptions.softSkills) {
      await Promise.all(videoOptions.softSkills.map(async (softSkillType) => {
        softSkills.push(await this.softSkillService.findByNameAsync(softSkillType));
        return;
      }));
    }
    let newVideo = new Video();
      newVideo.id = videoOptions.id
      newVideo.url = videoOptions.url;
      newVideo.description = videoOptions.description;
      newVideo.title = videoOptions.title;
      newVideo.softSkills = softSkills;
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

  public async getAllVideos(page, resultCount, searchTerm) {
    return {
      videos: await this.videoRepo.createQueryBuilder("video")
        .where("UPPER(video.title) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
        .skip(page*resultCount)
        .take(resultCount)
        .getMany(),
      videoCount: await this.videoRepo.createQueryBuilder("video")
        .where("UPPER(video.title) LIKE :searchTerm", { searchTerm: '%'+searchTerm.toUpperCase()+'%' })
        .getCount()
    }
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
  /** Title of video */
  title: string;
  /** All soft skills associated with this video. Optional. */
  softSkills?: SoftSkillType[];
}
