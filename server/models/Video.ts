import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, getRepository } from "typeorm";
import { Tag } from "./Tag";
import { Playlist } from "./Playlist";
import { Response } from "./Response";



@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  video_ref: string;

  @Column({nullable: true})
  description: string;

  @ManyToMany(type => Tag, tags => tags.videos)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(type => Playlist, playlists => playlists.videos)
  playlists: Playlist[];

  @OneToMany(type => Response, responses => responses.video)
  responses: Response[];

  public static async createVideo() {
    let videoRepo = getRepository(Video);
    let video = new Video();
    await videoRepo.save(video);
    return video.id;
  }

  public static async upload(url, videoId) {
    let videoRepo = getRepository(Video);
    let video = await videoRepo.findOneById(videoId);
    video.video_ref = url;
    await videoRepo.save(video);
    return video;
  }
}
