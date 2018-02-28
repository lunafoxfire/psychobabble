import {MigrationInterface, QueryRunner} from "typeorm";

export class DatesToBigInt1519842134538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "public"."programs" DROP "expiration"`);
        await queryRunner.query(`ALTER TABLE "public"."programs" ADD "expiration" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" DROP "expiration"`);
        await queryRunner.query(`ALTER TABLE "public"."tokens" ADD "expiration" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

    }

}
