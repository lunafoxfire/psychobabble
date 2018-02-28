import {MigrationInterface, QueryRunner} from "typeorm";

export class Token1519781591079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "expiration" TIMESTAMP NOT NULL, PRIMARY KEY("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "tokenId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "fk_981be676ef509e9f129cbb03875" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "fk_981be676ef509e9f129cbb03875"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP "tokenId"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
