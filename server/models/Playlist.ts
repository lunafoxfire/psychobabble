import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Video } from "./Video";
import { Program } from "./Program";

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(type => User, user => user.playlists)
  user: User;

  @ManyToMany(type => Video, videos => videos.playlists)
  @JoinTable()
  videos: Video[];

  @OneToMany(type => Program, programs => programs.playlist)
  programs: Program[];
}
