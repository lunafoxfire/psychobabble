import {MigrationInterface, QueryRunner} from "typeorm";

export class PassResetTokens1520450831714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pass_reset_tokens" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiration" bigint NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "passResetTokenId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "fk_6e5b7ad6bd25c39839b017a23a2" FOREIGN KEY ("passResetTokenId") REFERENCES "pass_reset_tokens"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "fk_6e5b7ad6bd25c39839b017a23a2"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP "passResetTokenId"`);
        await queryRunner.query(`DROP TABLE "pass_reset_tokens"`);
    }

}
