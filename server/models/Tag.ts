import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, getRepository } from "typeorm";
import { Video } from "./Video";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => Video, videos => videos.tags)
  videos: Video[];

  // Saves all tags in tag enum to db
  public static async syncTagsToDbAsync() {
    let tagRepo = getRepository(Tag);
    let tagList = Object.values(TagName);
    tagList.forEach(async (tagName) => {
      let tagFinder = await tagRepo.findOne({name: tagName});
      if (!tagFinder) {
        let newTag = new Tag();
        newTag.name = tagName;
        await tagRepo.save(newTag);
      }
    });
  }

  // Gets tag object from db by name
  public static async findByNameAsync(tagName: TagName): Promise<Tag> {
    return getRepository(Tag).findOne({name: tagName});
  }
}

export enum TagName {
  Test1 = "test1",
  Test2 = "test2",
  Test3 = "test3",
  Test4 = "test4",
  Test5 = "test5",
}
