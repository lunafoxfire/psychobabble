import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Tags } from "./Tags";
import { Playlists } from "./Playlists";
import { Responses } from "./Responses";

@Entity()
export class Videos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  video_ref: string;

  @Column()
  description: string;

  @ManyToMany(type => Tags, tags => tags.videos)
  @JoinTable()
  tags: Tags[];

  @ManyToMany(type => Playlists, playlists => playlists.videos)
  playlists: Playlists[];

  @OneToMany(type => Responses, responses => responses.video)
  responses: Responses[];
}
