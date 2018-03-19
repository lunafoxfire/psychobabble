import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1521486126622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "soft_skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "program_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobTitle" character varying NOT NULL, "text" character varying, "dateCreated" bigint NOT NULL, "expiration" bigint, "closed" boolean NOT NULL, "clientId" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "audio_url" character varying NOT NULL, "text_version" character varying, "score" integer, "reviewed" boolean NOT NULL, "subjectId" uuid, "videoId" uuid, "programId" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "url" character varying, "description" character varying, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jobTitle" character varying NOT NULL, "description" character varying, "expiration" bigint, "closed" boolean NOT NULL, "clientId" uuid, "authorId" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "validation_tokens" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiration" bigint NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "normalized_username" character varying NOT NULL, "email" character varying, "normalized_email" character varying, "salt" character varying NOT NULL, "hash" character varying NOT NULL, "date_created" bigint NOT NULL, "validated" boolean NOT NULL, "roleId" integer, "validationTokenId" integer, "passResetTokenId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "pass_reset_tokens" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiration" bigint NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "program_requests_soft_skills_soft_skills" ("programRequestsId" uuid NOT NULL, "softSkillsId" integer NOT NULL, PRIMARY KEY("programRequestsId", "softSkillsId"))`);
        await queryRunner.query(`CREATE TABLE "videos_tags_tags" ("videosId" uuid NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY("videosId", "tagsId"))`);
        await queryRunner.query(`CREATE TABLE "programs_videos_videos" ("programsId" uuid NOT NULL, "videosId" uuid NOT NULL, PRIMARY KEY("programsId", "videosId"))`);
        await queryRunner.query(`ALTER TABLE "program_requests" ADD CONSTRAINT "fk_2e9c8222049adc4e4e761679b42" FOREIGN KEY ("clientId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_e44e2fbc1a47bc7d4eaf920b02b" FOREIGN KEY ("subjectId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_cda03d62fb95d7719a0d7b60f5c" FOREIGN KEY ("videoId") REFERENCES "videos"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_67a1e3d206759569cb61dd693b8" FOREIGN KEY ("programId") REFERENCES "programs"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_8ee45ad3167e0dd0d6d3386c3f2" FOREIGN KEY ("clientId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_790a97f17dcfe4041f8b29d7f91" FOREIGN KEY ("authorId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_f9e9996c571502d53a36c640453" FOREIGN KEY ("roleId") REFERENCES "roles"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_2c4298cbecdc68455316b90884e" FOREIGN KEY ("validationTokenId") REFERENCES "validation_tokens"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_6e5b7ad6bd25c39839b017a23a2" FOREIGN KEY ("passResetTokenId") REFERENCES "pass_reset_tokens"("id")`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" ADD CONSTRAINT "fk_4bb155503d8167c30b79daf5aba" FOREIGN KEY ("programRequestsId") REFERENCES "program_requests"("id")`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" ADD CONSTRAINT "fk_f46acfda0955dd13dc46efb6f84" FOREIGN KEY ("softSkillsId") REFERENCES "soft_skills"("id")`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" ADD CONSTRAINT "fk_c86da89e9ab448ffa9c379a7599" FOREIGN KEY ("videosId") REFERENCES "videos"("id")`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" ADD CONSTRAINT "fk_242370ef5caa53ede0235736ce3" FOREIGN KEY ("tagsId") REFERENCES "tags"("id")`);
        await queryRunner.query(`ALTER TABLE "programs_videos_videos" ADD CONSTRAINT "fk_a02070db81e49db8cd26df9d19b" FOREIGN KEY ("programsId") REFERENCES "programs"("id")`);
        await queryRunner.query(`ALTER TABLE "programs_videos_videos" ADD CONSTRAINT "fk_9baf995a313f2d3f699f8221393" FOREIGN KEY ("videosId") REFERENCES "videos"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "programs_videos_videos" DROP CONSTRAINT "fk_9baf995a313f2d3f699f8221393"`);
        await queryRunner.query(`ALTER TABLE "programs_videos_videos" DROP CONSTRAINT "fk_a02070db81e49db8cd26df9d19b"`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" DROP CONSTRAINT "fk_242370ef5caa53ede0235736ce3"`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" DROP CONSTRAINT "fk_c86da89e9ab448ffa9c379a7599"`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" DROP CONSTRAINT "fk_f46acfda0955dd13dc46efb6f84"`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" DROP CONSTRAINT "fk_4bb155503d8167c30b79daf5aba"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_6e5b7ad6bd25c39839b017a23a2"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_2c4298cbecdc68455316b90884e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_f9e9996c571502d53a36c640453"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_790a97f17dcfe4041f8b29d7f91"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_8ee45ad3167e0dd0d6d3386c3f2"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_67a1e3d206759569cb61dd693b8"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_cda03d62fb95d7719a0d7b60f5c"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_e44e2fbc1a47bc7d4eaf920b02b"`);
        await queryRunner.query(`ALTER TABLE "program_requests" DROP CONSTRAINT "fk_2e9c8222049adc4e4e761679b42"`);
        await queryRunner.query(`DROP TABLE "programs_videos_videos"`);
        await queryRunner.query(`DROP TABLE "videos_tags_tags"`);
        await queryRunner.query(`DROP TABLE "program_requests_soft_skills_soft_skills"`);
        await queryRunner.query(`DROP TABLE "pass_reset_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "validation_tokens"`);
        await queryRunner.query(`DROP TABLE "programs"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "program_requests"`);
        await queryRunner.query(`DROP TABLE "soft_skills"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
