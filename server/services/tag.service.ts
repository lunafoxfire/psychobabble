import { Repository, getRepository } from 'typeorm';
import { Tag, TagType } from './../models/Tag';

export class TagService {
  private tagRepo: Repository<Tag>;
  public repo = this.tagRepo;

  constructor(tagRepo: Repository<Tag> = null) {
    this.tagRepo = tagRepo || getRepository(Tag);
  }

  /** Saves all tags in the TagTypes enum to the database. */
  public async syncTagsToDbAsync() {
    let tagList = Object.values(TagType);
    await Promise.all(tagList.map(async (tagType) => {
      let tagFinder = await this.tagRepo.findOne({name: tagType});
      if (!tagFinder) {
        let newTag = new Tag();
        newTag.name = tagType;
        await this.tagRepo.save(newTag);
      }
      return;
    }));
  }

  /** Retrieves a Tag from the database by its TagType */
  public async findByNameAsync(tagType: TagType): Promise<Tag> {
    return this.tagRepo.findOne({name: tagType});
  }
}
