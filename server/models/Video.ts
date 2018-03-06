import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, getRepository } from "typeorm";
import { Program } from './Program';
import { Tag, TagName } from "./Tag";
import { Response } from "./Response";

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  url: string;

  @Column({nullable: true})
  description: string;

  @ManyToMany(type => Tag, tags => tags.videos)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(type => Program, program => program.videos)
  programs: Program[];

  @OneToMany(type => Response, responses => responses.video)
  responses: Response[];

  public static async saveNewAsync(videoOptions: NewVideoOptions): Promise<Video> {
    let videoRepo = await getRepository(Video);
    let tags: Tag[] = [];
    if (videoOptions.tags) {
      await Promise.all(videoOptions.tags.map(async (tagName) => {
        let tag = await Tag.findByNameAsync(tagName);
        tags.push(tag);
        return;
      }));
    }
    let newVideo = new Video();
      newVideo.url = videoOptions.url;
      newVideo.description = videoOptions.description;
      newVideo.tags = tags;
    return videoRepo.save(newVideo);
  }
}

export interface NewVideoOptions {
  url: string,
  description: string,
  tags?: TagName[],
}
