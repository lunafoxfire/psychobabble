import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1520299798688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "soft_skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "program_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "validation_tokens" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiration" bigint NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "normalized_username" character varying NOT NULL, "email" character varying, "normalized_email" character varying, "salt" character varying NOT NULL, "hash" character varying NOT NULL, "date_created" bigint NOT NULL, "validated" boolean NOT NULL, "roleId" integer, "validationTokenId" integer, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sound_ref" character varying NOT NULL, "text_version" character varying NOT NULL, "score" integer NOT NULL, "userId" uuid, "videoId" uuid, "programId" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ref_url" character varying NOT NULL, "description" character varying NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "programs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "expiration" bigint NOT NULL, "closed" boolean NOT NULL, "userId" uuid, "makerId" uuid, PRIMARY KEY("id"))`);
        await queryRunner.query(`CREATE TABLE "program_requests_soft_skills_soft_skills" ("programRequestsId" uuid NOT NULL, "softSkillsId" integer NOT NULL, PRIMARY KEY("programRequestsId", "softSkillsId"))`);
        await queryRunner.query(`CREATE TABLE "videos_tags_tags" ("videosId" uuid NOT NULL, "tagsId" integer NOT NULL, PRIMARY KEY("videosId", "tagsId"))`);
        await queryRunner.query(`ALTER TABLE "program_requests" ADD CONSTRAINT "fk_a73a825a4cb488ee859f5f1318d" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_f9e9996c571502d53a36c640453" FOREIGN KEY ("roleId") REFERENCES "roles"("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "fk_2c4298cbecdc68455316b90884e" FOREIGN KEY ("validationTokenId") REFERENCES "validation_tokens"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_e6d82a270be62c18bba2d7bd2ff" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_cda03d62fb95d7719a0d7b60f5c" FOREIGN KEY ("videoId") REFERENCES "videos"("id")`);
        await queryRunner.query(`ALTER TABLE "responses" ADD CONSTRAINT "fk_67a1e3d206759569cb61dd693b8" FOREIGN KEY ("programId") REFERENCES "programs"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_7551f51adf5fe418623e59c2619" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "programs" ADD CONSTRAINT "fk_cf92a521415744294417d01f7fe" FOREIGN KEY ("makerId") REFERENCES "users"("id")`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" ADD CONSTRAINT "fk_4bb155503d8167c30b79daf5aba" FOREIGN KEY ("programRequestsId") REFERENCES "program_requests"("id")`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" ADD CONSTRAINT "fk_f46acfda0955dd13dc46efb6f84" FOREIGN KEY ("softSkillsId") REFERENCES "soft_skills"("id")`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" ADD CONSTRAINT "fk_c86da89e9ab448ffa9c379a7599" FOREIGN KEY ("videosId") REFERENCES "videos"("id")`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" ADD CONSTRAINT "fk_242370ef5caa53ede0235736ce3" FOREIGN KEY ("tagsId") REFERENCES "tags"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" DROP CONSTRAINT "fk_242370ef5caa53ede0235736ce3"`);
        await queryRunner.query(`ALTER TABLE "videos_tags_tags" DROP CONSTRAINT "fk_c86da89e9ab448ffa9c379a7599"`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" DROP CONSTRAINT "fk_f46acfda0955dd13dc46efb6f84"`);
        await queryRunner.query(`ALTER TABLE "program_requests_soft_skills_soft_skills" DROP CONSTRAINT "fk_4bb155503d8167c30b79daf5aba"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_cf92a521415744294417d01f7fe"`);
        await queryRunner.query(`ALTER TABLE "programs" DROP CONSTRAINT "fk_7551f51adf5fe418623e59c2619"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_67a1e3d206759569cb61dd693b8"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_cda03d62fb95d7719a0d7b60f5c"`);
        await queryRunner.query(`ALTER TABLE "responses" DROP CONSTRAINT "fk_e6d82a270be62c18bba2d7bd2ff"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_2c4298cbecdc68455316b90884e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "fk_f9e9996c571502d53a36c640453"`);
        await queryRunner.query(`ALTER TABLE "program_requests" DROP CONSTRAINT "fk_a73a825a4cb488ee859f5f1318d"`);
        await queryRunner.query(`DROP TABLE "videos_tags_tags"`);
        await queryRunner.query(`DROP TABLE "program_requests_soft_skills_soft_skills"`);
        await queryRunner.query(`DROP TABLE "programs"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "responses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "validation_tokens"`);
        await queryRunner.query(`DROP TABLE "program_requests"`);
        await queryRunner.query(`DROP TABLE "soft_skills"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
