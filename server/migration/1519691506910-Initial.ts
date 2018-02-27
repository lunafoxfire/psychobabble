import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1519691506910 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "soft_skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "program_requests" ("id" SERIAL NOT NULL, "userId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "video_ref" character varying NOT NULL, "description" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "responses" ("id" SERIAL NOT NULL, "sound_ref" character varying NOT NULL, "text_version" character varying NOT NULL, "score" integer NOT NULL, "userId" integer, "videoId" integer, "programId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "programs" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "expiration" date NOT NULL, "closed" boolean NOT NULL, "userId" integer, "makerId" integer, "playlistId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "salt" character varying NOT NULL, "hash" character varying NOT NULL, "roleId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "playlists" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "userId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "program_requests_soft_skills_soft_skills" ("programRequestsId" integer NOT NULL, "softSkillsId" integer NOT NULL, PRIMARY KEY("programRequestsId", "softSkillsId"))`);
        await queryRunner.query(`CREATE TABLE "videos_tags_tags" ("videosId" integer NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY("videosId", "tagsId"))`);
        await queryRunner.query(`CREATE TABLE "playlists_videos_videos" ("playlistsId" integer NOT NULL, "videosId" integer NOT NULL, PRIMARY KEY("playlistsId", "videosId"))`);
        await queryRunner.query(`ALTER TABLE "program_requests" ADD CONSTRAINT "fk_a73a825a4cb488ee859f5f1318d" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_e6d82a270be62c18bba2d7bd2ff" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_cda03d62fb95d7719a0d7b60f5c" FOREIGN KEY ("videoId") REFERENCES "videos"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_67a1e3d206759569cb61dd693b8" FOREIGN KEY ("programId") REFERENCES "programs"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_7551f51adf5fe418623e59c2619" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_cf92a521415744294417d01f7fe" FOREIGN KEY ("makerId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_2d8f36218e006cc6ecce2a22f04" FOREIGN KEY ("playlistId") REFERENCES "playlists"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_f9e9996c571502d53a36c640453" FOREIGN KEY ("roleId") REFERENCES "roles"("id")`);
        await queryRunner.query(`ALTER TABLE "playlists" ADD CONSTRAINT "fk_e787354d87502aeb0a52e86bc93" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" ADD CONSTRAINT "fk_4bb155503d8167c30b79daf5aba" FOREIGN KEY ("programRequestsId") REFERENCES "program_requests"("id")`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" ADD CONSTRAINT "fk_f46acfda0955dd13dc46efb6f84" FOREIGN KEY ("softSkillsId") REFERENCES "soft_skills"("id")`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" ADD CONSTRAINT "fk_c86da89e9ab448ffa9c379a7599" FOREIGN KEY ("videosId") REFERENCES "videos"("id")`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" ADD CONSTRAINT "fk_242370ef5caa53ede0235736ce3" FOREIGN KEY ("tagsId") REFERENCES "tags"("id")`);
        await queryRunner.query(`ALTER TABLE "playlists_videos_videos" ADD CONSTRAINT "fk_a871d01b9f02c15a27489696f4f" FOREIGN KEY ("playlistsId") REFERENCES "playlists"("id")`);
        await queryRunner.query(`ALTER TABLE "playlists_videos_videos" ADD CONSTRAINT "fk_a0fa18bb0204444a4519cdf4539" FOREIGN KEY ("videosId") REFERENCES "videos"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "playlists_videos_videos" DROP CONSTRAINT "fk_a0fa18bb0204444a4519cdf4539"`);
        await queryRunner.query(`ALTER TABLE "playlists_videos_videos" DROP CONSTRAINT "fk_a871d01b9f02c15a27489696f4f"`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" DROP CONSTRAINT "fk_242370ef5caa53ede0235736ce3"`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" DROP CONSTRAINT "fk_c86da89e9ab448ffa9c379a7599"`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" DROP CONSTRAINT "fk_f46acfda0955dd13dc46efb6f84"`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" DROP CONSTRAINT "fk_4bb155503d8167c30b79daf5aba"`);
        await queryRunner.query(`ALTER TABLE "playlists" DROP CONSTRAINT "fk_e787354d87502aeb0a52e86bc93"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_f9e9996c571502d53a36c640453"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_2d8f36218e006cc6ecce2a22f04"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_cf92a521415744294417d01f7fe"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_7551f51adf5fe418623e59c2619"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_67a1e3d206759569cb61dd693b8"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_cda03d62fb95d7719a0d7b60f5c"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_e6d82a270be62c18bba2d7bd2ff"`);
        await queryRunner.query(`ALTER TABLE "program_requests" DROP CONSTRAINT "fk_a73a825a4cb488ee859f5f1318d"`);
        await queryRunner.query(`DROP TABLE "playlists_videos_videos"`);
        await queryRunner.query(`DROP TABLE "videos_tags_tags"`);
        await queryRunner.query(`DROP TABLE "program_requests_soft_skills_soft_skills"`);
        await queryRunner.query(`DROP TABLE "playlists"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "programs"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "program_requests"`);
        await queryRunner.query(`DROP TABLE "soft_skills"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
