import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Tag } from "./Tag";
import { Playlist } from "./Playlist";
import { Response } from "./Response";

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  video_ref: string;

  @Column()
  description: string;

  @ManyToMany(type => Tag, tags => tags.videos)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(type => Playlist, playlists => playlists.videos)
  playlists: Playlist[];

  @OneToMany(type => Response, responses => responses.video)
  responses: Response[];
}
