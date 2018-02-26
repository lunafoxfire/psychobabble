import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Users } from "./Users";
import { Videos } from "./Videos";
import { Programs } from "./Programs";

@Entity()
export class Playlists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Users, user => user.playlists)
  user: Users;

  @ManyToMany(type => Videos, videos => videos.playlists)
  @JoinTable()
  videos: Videos[];

  @OneToMany(type => Programs, programs => programs.playlist)
  programs: Programs[];
}
